DealReservation = new Mongo.Collection('dealReservation');
DealReservation.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});
Meteor.methods({
	removeFromDealReservation: function(id){
		DealReservation.remove(id);
	}
});