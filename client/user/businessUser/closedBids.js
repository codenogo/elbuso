Template.closedBids.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('auctions');
		self.subscribe('auctionImages');
		self.subscribe('auctionReservation');
	});
});
Template.closedBids.helpers({
	closedBids: function() {
		return Auctions.find({isOpen: false});
	},
	sellerClosedBids: function() {
		var userId = Meteor.userId();
		//find an auction where the user is one of the bidders
		return Auctions.find({isOpen: false}, {$elemMatch:{Bidders: userId}});
	},
});