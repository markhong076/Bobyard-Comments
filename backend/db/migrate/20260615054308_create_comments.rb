class CreateComments < ActiveRecord::Migration[8.1]
  def change
    create_table :comments do |t|
      t.string :author
      t.text :text
      t.datetime :date
      t.integer :likes
      t.string :image

      t.timestamps
    end
  end
end
