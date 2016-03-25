# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

doc_1 = Document.create(title: 'random words', body: 'a cat was walking down the street when a bird flew into a tree. The bird called down to the cat, "Hey!, why are you walking on the ground like that?"', author:"nobody")
doc_2 = Document.create(title: 'not so random words', body: 'woa this is an interesting app', author:"sombody")

user_1 = User.create(name: 'Tim')

UserDoc.create(user_id: user_1.id, document_id: doc_1.id)
UserDoc.create(user_id: user_1.id, document_id: doc_2.id)
