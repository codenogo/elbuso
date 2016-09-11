AuctionReservation = new Mongo.Collection('auctionReservation');
AuctionReservation.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});
Meteor.methods({
	removeFromAuctionReservation: function(id){
		check(id, String);
		AuctionReservation.remove(id);
	}
});