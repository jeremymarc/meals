class CreateMeals < ActiveRecord::Migration
  def change
    create_table :meals do |t|
      t.integer :user_id
      t.text :description
      t.integer :calories
      t.datetime :eaten_at

      t.timestamps null: false
    end
  end
end
