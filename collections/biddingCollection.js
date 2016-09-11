Bidding = new Mongo.Collection('bidding');
Bidding.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});



Meteor.methods({
	clearBid: function(id){
		Bidding.remove(id);
	}
});