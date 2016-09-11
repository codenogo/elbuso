Template.sideBar.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('auctions');
		self.subscribe('auctionImages');
		self.subscribe('auctionReservation');
		self.subscribe('dealReservation');
		self.subscribe('deals');
		self.subscribe('dealImages');
		var userId = Meteor.userId();
		self.subscribe('mySupportNotifications', userId);
	});

});
Template.sideBar.helpers({
	cartCount: function() {
		var userId = Meteor.userId();
		var auctions = AuctionReservation.find({user: userId, paid: false}).count();
		var deals = DealReservation.find({user: userId, paid: false}).count();
		var total = (auctions + deals);
		if (total === 0){
			return ('0');
		} else if (total <= 1) {
			return ('1 item');
		} else if(total > 1) {
			return (total + ' ' + 'items')
		}
	},
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
		// console.log(selfId)
		var auctionId = AuctionReservation.findOne({_id: selfId}).auction;
		return Auctions.findOne({_id: auctionId}).name;
	},
	auctionImage: function(){
		var userId = Meteor.userId();
		var selfId = this._id;
		var auctionId = AuctionReservation.findOne({_id: selfId}).auction;
		return Auctions.findOne({_id: auctionId}).image;
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
	reservationFee: function() {
		var userId = Meteor.userId();
		var selfId = this._id;
		var auctionId = AuctionReservation.findOne({_id: selfId}).auction;
		var reservedAmt = AuctionReservation.findOne({_id: selfId}).purchaseVal;
		var reservationFee = Auctions.findOne({_id: auctionId}).reservationFee;
		return parseInt(reservedAmt * (reservationFee / 100));
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
	dealImage: function(){
		var userId = Meteor.userId();
		var selfId = this._id;
		var dealId = DealReservation.findOne({_id: selfId}).deal;
		return Deals.findOne({_id: dealId}).image;
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
	dealFee: function(){
		var userId = Meteor.userId();
		var selfId = this._id;
		var dealId = DealReservation.findOne({_id: selfId}).deal;
		var dealPrice = DealReservation.findOne({_id: selfId}).discountedPrice;
		var reservationFee = Deals.findOne({_id: dealId}).reservationFee;
		var fee = (dealPrice * (reservationFee / 100));
		return parseInt(fee);
	},
	// dealFee: function(){
	// 	var userId = Meteor.userId();
	// 	var selfId = this._id;
	// 	var dealId = DealReservation.findOne({_id: selfId}).deal;
	// 	return Deals.findOne({_id: dealId}).reservationFee;
	// },
	hasNewMessage: function(){
		var userId = Meteor.userId();

		//if there is a new message and a I am not the creator and it is unread, then show it as 1
		var readStatus = Support.find().map(function(arr){
			var array = arr.message;
			var lastObj = array.slice(-1)[0];
			var readStatus = lastObj.read;
			var lastAuthor = lastObj.author;
			if (lastAuthor !== userId){
				if (readStatus == false){
					return 1;
				} else {
					return 0;
				}
			} else {
				return 0;
			}
		});
		//get the sum of all the "1" or "0" from above. If the result is greater than "0" then there is a notification.
		var sum = readStatus.reduce((a, b) => a + b, 0);
		if (sum >= 1){
			return true;
		}
	},
	newMessageCount: function(){
		var userId = Meteor.userId();

		//if there is a new message and a I am not the creator and it is unread, then show it as 1
		var readStatus = Support.find().map(function(arr){
			var array = arr.message;
			var lastObj = array.slice(-1)[0];
			var readStatus = lastObj.read;
			var lastAuthor = lastObj.author;
			if (lastAuthor !== userId){
				if (readStatus == false){
					return 1;
				} else {
					return 0;
				}
			} else {
				return 0;
			}
		});
		//get the sum of all the "1" or "0" from above. If the result is greater than "0" then there is a notification.
		var sum = readStatus.reduce((a, b) => a + b, 0);
		return sum;
	}
});

//logout functions
Template.sideBar.events({
    'click .logout': function(event, error){
        event.preventDefault();
        Meteor.logout();
    },
    'click .sidebar-link': function(event){	
    	var $lateral_menu_trigger = $('#menufy-menu-trigger'),
			$content_wrapper = $('.menufy-main-content'),
			$navigation = $('header');	
		$lateral_menu_trigger.toggleClass('is-clicked');
		$navigation.toggleClass('lateral-menu-is-open');
		$content_wrapper.toggleClass('lateral-menu-is-open');
		$('body').toggleClass('overflow-hidden');
		$('#menufy-lateral-nav').toggleClass('lateral-menu-is-open');
    }
});


