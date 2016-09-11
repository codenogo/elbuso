Template.ongoingBids.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('auctions');
		self.subscribe('auctionImages');
		self.subscribe('auctionReservation');
	});
});
Template.ongoingBids.helpers({
	ongoingBids: function() {
		return Auctions.find({bidding:true, isOpen: true});
	},
	sellerOngoingBids: function() {
		var userId = Meteor.userId();
		//find an auction where the user is one of the bidders
		return Auctions.find({bidding:true, isOpen: true}, {$elemMatch:{Bidders: userId}});
	}
});