Template.favourites.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('auctions');
		self.subscribe('auctionImages');
		var userId = Meteor.userId();
		self.subscribe('favourites', userId);
		self.subscribe('deals');
		self.subscribe('dealImages');
	});
});
Template.favourites.helpers({
	favourites: function() {
		var userId = Meteor.userId();
		var total = Favourites.find({user: userId}).count();
		if (total > 0){
			return true;
		}
	},
	favDealExists: function() {
		var userId = Meteor.userId();
		var total = Favourites.find({user: userId, 'deal': { $exists: true}}).count();
		if (total > 0){
			return true;
		}
	},
	favAuctionExists: function() {
		var userId = Meteor.userId();
		var total = Favourites.find({user: userId, 'auction': { $exists: true}}).count();
		if (total > 0){
			return true;
		}
	},
	favouritedAuction: function() {
		var userId = Meteor.userId();
		return Favourites.find({user: userId}).map(function(auction){
			var itemId = auction.auction;
			return Auctions.findOne({_id: itemId});
		});
	},
	favouritedDeal: function() {
		var userId = Meteor.userId();
		return Favourites.find({user: userId}).map(function(deal){
			var itemId = deal.deal;
			return Deals.findOne({_id: itemId});
		});
	}
});
