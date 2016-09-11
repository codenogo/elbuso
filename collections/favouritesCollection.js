Favourites = new Mongo.Collection('favourites');
Favourites.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

Meteor.methods({
	unFavorite: function(id){
		Favourites.remove(id);
	}
});