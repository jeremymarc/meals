class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :daily_calorie
      t.timestamps null: false
    end
  end
end
