import { Controller } from 'stimulus';
import Vue from 'vue';

export default class extends Controller {
  connect() {
    // Skip action if we are currently showing Turbolinks preview
    if (document.documentElement.hasAttribute('data-turbolinks-preview')) {
      return;
    }
    
    // We need a child element to mount container into it.
    // We cannot mount it into this.element,
    // 'cause this would trigger a `disconnect` callback
    // (as we need to cleanup the Vue component to avoid a memory leak)
    const container = document.createElement('div');
    this.element.appendChild(container);
    this.initializeComponent(container);
    this.cleanupChildren();
  }

  disconnect() {
    if (this.vue) {
      this.vue.$destroy();
    }
  }

  initializeComponent(container) {
    const {
      name,
      readonly,
      id,
      type,
      value,
      city,
      ...props
    } = this.buildProps();

    this.vue = new Vue(
      {
        el: container,
        data() {
          return {
            name,
            disabled: Boolean(readonly),
            id,
            type,
            value: Number(value),
            city,
            props
          };
        },
        template: `
          <div>
            <input
              type="number"
              hidden
              v-if="!disabled"
              :name="name"
              :value="value"
              :id="id"
              :type="type"
            />
            <b-rate
              v-bind="props"
              :value="value"
              :disabled="disabled"
              @change="success"
            />
          </div>
        `,
        methods: {
          success: function(newValue) {
            this.value = newValue;
          }
        }
      }
    );
  }

  buildProps() {
    const data = { ...this.defaultProps };

    // Get all the data-attributes from the controlled element
    for (let key in this.element.dataset) {
      if (key === 'controller') continue;
      data[key] = this.element.dataset[key];
    }

    // Get all the attributes from child input (e.g. to use Rails form)
    var innerInputElement = this.element.getElementsByTagName('input')[0];
    if (innerInputElement) {
      let childAttributes = {};
      [ ...innerInputElement.attributes ].forEach(attribute => {
        childAttributes[attribute.name] = attribute.value;
      });

      return { ...data, ...childAttributes };
    }

    return data;
  }

  get defaultProps() {
    return {
      readonly: false,
      value: 0,
    };
  }

  cleanupChildren() {
    // Remove everything except from Vue container
    while(this.element.firstChild != this.vue.$el){
      this.element.removeChild(this.element.firstChild);
    }
  }
}
