Template.cart.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('auctions');
		self.subscribe('auctionImages');
		self.subscribe('auctionReservation');
		self.subscribe('dealReservation');
		self.subscribe('deals');
		self.subscribe('dealImages');
		self.subscribe('transactions');
	});
	self.firstStep = new ReactiveVar(true);
	Session.set( "totalAmount", null );
	Session.set( "reservationIdPool", null );
});
Template.cart.helpers({
	cartItem: function() {
		var userId = Meteor.userId();
		var auctions = AuctionReservation.find({user: userId, paid: false}).count();
		var deals = DealReservation.find({user: userId, paid: false}).count();
		var total = (auctions + deals);
		if (total > 0){
			return true;
		}
	},
	isAuction: function() {
		var userId = Meteor.userId();
		return AuctionReservation.find({user: userId, paid: false});
	},
	isDeal: function() {
		var userId = Meteor.userId();
		return DealReservation.find({user: userId, paid: false});
	},
	auctionName: function(){
		var userId = Meteor.userId();
		var selfId = this._id;
		var auctionId = AuctionReservation.findOne({_id: selfId}).auction;
		return Auctions.findOne({_id: auctionId}).name;
	},
	auctionCurrencySymbol: function(){
		var selfId = this._id;
		var auctionId = AuctionReservation.findOne({_id: selfId}).auction;
		var currency = Auctions.findOne({_id: auctionId}).currency;
		var currencySymbol = Currency.findOne({currencyIso: currency}).currencySymbol;
		if (currencySymbol){
			return (currencySymbol);
		} else {
			return (currency);
		}
	},
	auctionImage: function(){
		var userId = Meteor.userId();
		var selfId = this._id;
		var auctionId = AuctionReservation.findOne({_id: selfId}).auction;
		return Auctions.findOne({_id: auctionId}).image;
	},
	minimumDiscount: function() {
		var userId = Meteor.userId();
		var selfId = this._id;
		var auctionId = AuctionReservation.findOne({_id: selfId}).auction;
		return Auctions.findOne({_id: auctionId}).StartRate;
	},
	reservedAmt: function() {
		var userId = Meteor.userId();
		var selfId = this._id;
		return AuctionReservation.findOne({_id: selfId}).purchaseVal;
	},
	balanceAuction: function() {
		var userId = Meteor.userId();
		var selfId = this._id;
		var reservedAmt = AuctionReservation.findOne({_id: selfId}).purchaseVal;
		var auctionId = AuctionReservation.findOne({_id: selfId}).auction;
		var fee = Auctions.findOne({_id: auctionId}).reservationFee;
		return parseInt(reservedAmt - (reservedAmt * (fee / 100)))
	},
	reservationFee: function() {
		var userId = Meteor.userId();
		var selfId = this._id;
		var reservedAmt = AuctionReservation.findOne({_id: selfId}).purchaseVal;
		var auctionId = AuctionReservation.findOne({_id: selfId}).auction;
		var fee = Auctions.findOne({_id: auctionId}).reservationFee;
		return parseInt(reservedAmt * (fee / 100));
	},
	// reservationFee: function(){
	// 	var userId = Meteor.userId();
	// 	var selfId = this._id;
	// 	var auctionId = AuctionReservation.findOne({_id: selfId}).auction;
	// 	return Auctions.findOne({_id: auctionId}).reservationFee;
	// },
	dealName: function(){
		var userId = Meteor.userId();
		var selfId = this._id;
		var dealId = DealReservation.findOne({_id: selfId}).deal;
		return Deals.findOne({_id: dealId}).name;
	},
	dealCurrencySymbol: function(){
		var selfId = this._id;
		var dealId = DealReservation.findOne({_id: selfId}).deal;
		var currency = Deals.findOne({_id: dealId}).currency;
		var currencySymbol = Currency.findOne({currencyIso: currency}).currencySymbol;
		if (currencySymbol){
			return (currencySymbol);
		} else {
			return (currency);
		}
	},
	dealImage: function(){
		var userId = Meteor.userId();
		var selfId = this._id;
		var dealId = DealReservation.findOne({_id: selfId}).deal;
		return Deals.findOne({_id: dealId}).image;
	},
	dealDiscount: function(){
		var userId = Meteor.userId();
		var selfId = this._id;
		var dealId = DealReservation.findOne({_id: selfId}).deal;
		return Deals.findOne({_id: dealId}).Rate;
	},
	dealPrice: function(){
		var userId = Meteor.userId();
		var selfId = this._id;
		var dealId = DealReservation.findOne({_id: selfId}).deal;
		return DealReservation.findOne({_id: selfId}).discountedPrice;
	},
	// dealFee: function(){
	// 	var userId = Meteor.userId();
	// 	var selfId = this._id;
	// 	var dealId = DealReservation.findOne({_id: selfId}).deal;
	// 	var dealPrice = Deals.findOne({_id: dealId}).price;
	// 	var dealRate = Deals.findOne({_id: dealId}).Rate;
	// 	var fee = ((dealPrice * (100 - dealRate) / 100) / 10);
	// 	return parseInt(fee);
	// },
	dealFee: function(){
		var userId = Meteor.userId();
		var selfId = this._id;
		var dealId = DealReservation.findOne({_id: selfId}).deal;
		var discountedPrice = DealReservation.findOne({_id: selfId}).discountedPrice;
		var fee = Deals.findOne({_id: dealId}).reservationFee;
		return parseInt(discountedPrice * (fee / 100));
	},
	balanceDeal: function(){
		var userId = Meteor.userId();
		var selfId = this._id;
		var dealId = DealReservation.findOne({_id: selfId}).deal;
		var discountedPrice = DealReservation.findOne({_id: selfId}).discountedPrice;
		var fee = Deals.findOne({_id: dealId}).reservationFee;
		return parseInt(discountedPrice - (discountedPrice * (fee / 100)));
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
	isFirstStep: function(){
		return Template.instance().firstStep.get();
	},
});



Template.cart.events({
	'click .reserve-checkout': function(event, template){
		//let's get total-cash
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
		var parseTotal = parseInt(total);
		if(parseTotal !== 0){
			Session.set( "totalAmount", parseTotal );
		}

		//let's now get pool of IDs of all reservations being checked out
		var auctions = AuctionReservation.find({user: userId, paid: false}).count();
		console.log(auctions);
		var deals = DealReservation.find({user: userId, paid: false}).count();
		console.log(deals);
		if( auctions > 0 ){
			var auctionIds = AuctionReservation.find({user: userId, paid: false}).map(function(auction){
				return auction._id;
			});
			console.log(auctionIds)
		}
		if( deals > 0 ){
			var dealIds = DealReservation.find({user: userId, paid: false}).map(function(deal){
				return deal._id;
			});
			console.log(dealIds);
		}

		if (auctions > 0 && deals > 0){
			var pool = auctionIds.concat(dealIds);
		} else if(auctions == 0 && deals > 0){
			var pool = dealIds;
		} else if(auctions > 0 && deals == 0){
			var pool = auctionIds;
		} else {
			var pool = null
		}
		console.log(pool);

		if (pool !== null){
			template.firstStep.set(!template.firstStep.get());
			Session.set( "reservationIdPool", pool );
		}
    },
	'click .remove-auction': function(){
		var id = this._id;
		Meteor.call('removeFromAuctionReservation', id);
	},
	'click .remove-deal': function(){
		var id = this._id;
		Meteor.call('removeFromDealReservation', id);
	}
});
