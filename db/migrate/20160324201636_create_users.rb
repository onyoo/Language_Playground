class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name

      t.string :provider#, null: false
      t.string :uid#, null: false

# twitter
      t.string :url
      t.string :location
      t.string :image_url
# google+
      t.string :oauth_token #used to perform certain actions on behalf of user
      t.datetime :oauth_expires_at

      t.timestamps null: false
    end
  end
end
