Template.activity.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('auctions');
		self.subscribe('auctionImages');
		self.subscribe('auctionReservation');
		self.subscribe('dealReservation');
		self.subscribe('deals');
		self.subscribe('dealImages');
	});
});
Template.activity.helpers({
	cartItem: function() {
		var userId = Meteor.userId();
		var auctions = AuctionReservation.find({user: userId, paid: false}).count();
		var deals = DealReservation.find({user: userId, paid: false}).count();
		var total = (auctions + deals);
		if (total > 0){
			return true;
		}
	},
	activity: function() {
		var userId = Meteor.userId();
		var auctions = AuctionReservation.find({user: userId}).count();
		var deals = DealReservation.find({user: userId}).count();
		var total = (auctions + deals);
		if (total > 0){
			return true;
		}
	},
	uncollected: function() {
		var userId = Meteor.userId();
		var auctions = AuctionReservation.find({user: userId, collected: false}).count();
		var deals = DealReservation.find({user: userId, collected: false}).count();
		var total = (auctions + deals);
		if (total > 0){
			return true;
		}
	},
	collected: function() {
		var userId = Meteor.userId();
		var auctions = AuctionReservation.find({user: userId, collected: true, paid: true}).count();
		var deals = DealReservation.find({user: userId, collected: true, paid: true}).count();
		var total = (auctions + deals);
		if (total > 0){
			return true;
		}
	},
	//auction bar
	totalReservations: function() {
		var userId = Meteor.userId();
		var auctions = AuctionReservation.find({user: userId}).count();
		var deals = DealReservation.find({user: userId}).count();
		var total = (auctions + deals);
		return total;
	},
	cartValue: function() {
		var userId = Meteor.userId();

		var auctionVal = AuctionReservation.find({user: userId, paid: false}).map(function(auction) {
		    var auctionPurchase = auction.purchaseVal;
		    var auctionId = auction.auction;
		    var fee = Auctions.findOne({_id: auctionId}).reservationFee;
		    return (auctionPurchase * (fee / 100));
		});
		var dealVal = DealReservation.find({user: userId, paid: false}).map(function(deal) {
			var dealId = deal.deal;
			var fee = Deals.findOne({_id: dealId}).reservationFee;
			var discountedPrice = deal.discountedPrice;
		    return (discountedPrice * (fee / 100));
		});
		var auctionSum = auctionVal.length ? auctionVal.reduce(function (a, b) {return a + b;}) : 0

		var dealSum = dealVal.length ? dealVal.reduce(function (a, b) {return a + b;}) : 0
		var total = (+auctionSum + +dealSum);
		return parseInt(total);
	},
	pastPurchases: function() {
		var userId = Meteor.userId();
		var auctionVal = AuctionReservation.find({user: userId, paid: true}).map(function(auction) {
		    return auction.purchaseVal;
		});
		var dealVal = DealReservation.find({user: userId, paid: true}).map(function(deal) {
			var dealId = deal.deal;
			var dealPrice = Deals.findOne({_id: dealId}).price;
			var dealRate = Deals.findOne({_id: dealId}).Rate;
			var fee = (dealPrice * (100 - dealRate) / 100);
			return parseInt(fee);
		});
		var auctionSum = auctionVal.length ? auctionVal.reduce(function (a, b) {return a + b;}) : 0

		var dealSum = dealVal.length ? dealVal.reduce(function (a, b) {return a + b;}) : 0
		var total = (+auctionSum + +dealSum);
		return total;
	},
	moneySaved: function() {
		var userId = Meteor.userId();
		var auctionVal = AuctionReservation.find({user: userId, paid: true}).map(function(auction) {
		    var auctionPurchase = auction.purchaseVal;
		    var auctionId = auction.auction;
		    var rate = Auctions.findOne({_id: auctionId}).StartRate;
		    return (auctionPurchase * (rate / 100));
		});
		var dealVal = DealReservation.find({user: userId, paid: true}).map(function(deal) {
			var dealId = deal.deal;
			var dealPrice = Deals.findOne({_id: dealId}).price;
			var rate = Deals.findOne({_id: dealId}).Rate;
		    return (dealPrice * (rate / 100));
		});
		var auctionSum = auctionVal.length ? auctionVal.reduce(function (a, b) {return a + b;}) : 0
		var dealSum = dealVal.length ? dealVal.reduce(function (a, b) {return a + b;}) : 0
		var total = (+auctionSum + +dealSum);
		return parseInt(total);
	},
	//auction bar



	uncollectedAuction: function() {
		var userId = Meteor.userId();
		return AuctionReservation.find({user: userId, collected: false}).map(function(auction){
			var itemId = auction.auction;
			return Auctions.findOne({_id: itemId});
		});
	},
	uncollectedDeal: function() {
		var userId = Meteor.userId();
		return DealReservation.find({user: userId, collected: false}).map(function(deal){
			var itemId = deal.deal;
			return Deals.findOne({_id: itemId});
		});
	},
	collectedAuction: function() {
		var userId = Meteor.userId();
		return AuctionReservation.find({user: userId, collected: true, paid: true}).map(function(auction){
			var itemId = auction.auction;
			return Auctions.findOne({_id: itemId});
		});
	},
	collectedDeal: function() {
		var userId = Meteor.userId();
		return DealReservation.find({user: userId, collected: true, paid: true}).map(function(deal){
			var itemId = deal.deal;
			return Deals.findOne({_id: itemId});
		});
	}
});
