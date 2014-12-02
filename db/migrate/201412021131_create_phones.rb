class CreatePhones < ActiveRecord::Migration
  def change
    create_table :phones do |t|
      t.references :contact
      t.string :label
      t.string :number
 
      t.timestamps
    end
  end
end