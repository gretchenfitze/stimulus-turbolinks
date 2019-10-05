import { Controller } from 'stimulus';
import { DialogProgrammatic as Dialog } from 'buefy'

export default class extends Controller {
  static targets = [ 'name', 'removeLink' ];

  connect() {
    const element = document.getElementById('stimulus-times');
    let currentNumber = Number(element.innerText);
    element.innerHTML = currentNumber + 1;
  }

  get cityName() {
    return this.nameTarget.innerText || this.nameTarget.value;
  }

  askToRemove() {
    Dialog.confirm({
      title: 'Remove city',
      message: `Are you sure you want to remove <b>${this.cityName}</b>? This action cannot be undone.`,
      confirmText: 'Remove',
      type: 'is-danger',
      onConfirm: () => this.removeLinkTarget.click()
    });
  }
}
