Transactions = new Mongo.Collection('transactions');
Transactions.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});
Meteor.methods({
	removeFromTransactions: function(id){
		check(id, String);
		AuctionReservation.remove(id);
	}
});
