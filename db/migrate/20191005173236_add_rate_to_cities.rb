class AddRateToCities < ActiveRecord::Migration[6.0]
  def change
    add_column :cities, :rating, :integer, :default => 0
  end
end
