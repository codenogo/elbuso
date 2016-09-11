Template.auctionListItem.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('auctionReservation');
		self.subscribe('bidding');
		var userId = Meteor.userId();
		self.subscribe('favourites', userId);
	});
});
Template.auctionListItem.helpers({
	//prunes the description to about 100 characters
	shortDesc: function() {
		return _.str.prune(this.description, 150);
	},
	formattedDate: function(){
		// return moment(this.closingDate).format("ddd, hA");
		return moment(this.closingDate).fromNow();
	},
	briefName: function() {
		return _.str.prune(this.name, 25);
	},
	bidder: function(){
		var selfId = this;
		var obj = selfId.valueOf();
		var bidderName = Meteor.users.findOne({_id: obj}).profile.company.companyName;
		return bidderName;
	},
	bidderImage: function() {
		var selfId = this;
		var obj = selfId.valueOf();
        return Meteor.users.findOne({_id: obj}).image;
	},
	bidderLetter: function() {
		var selfId = this;
		var obj = selfId.valueOf();
        var bidderName = Meteor.users.findOne({_id: obj}).profile.company.companyName;
		return _.str.truncate(bidderName, 1, ' ');
	},
	bidderName: function() {
		var selfId = this;
		var obj = selfId.valueOf();
        return bidderName = Meteor.users.findOne({_id: obj}).profile.company.companyName;
	},
	reservationNo: function() {
		return AuctionReservation.find({auction: this._id}).count();
	},
	reservationPercentage: function() {
		var targetReservations = Auctions.findOne({_id: this._id}).targetted;
		var reservations = AuctionReservation.find({auction: this._id}).count();
		return parseInt((reservations / targetReservations) * 100);
	},
	ifBidding: function(){
		var thisAuction = this._id;
		var isBidding = Auctions.findOne({_id: thisAuction}).bidding;
		if (isBidding === true){
			return true;
		}
	},
	currencySymbol: function(){
		var thisAuction = this._id;
		var currency = Auctions.findOne({_id: thisAuction}).currency;
		var currencySymbol = Currency.findOne({currencyIso: currency}).currencySymbol;
		if (currencySymbol){
			return (currencySymbol);
		} else {
			return (currency);
		}
	},
	ifClosed: function(){
		var thisAuction = this._id;
		var isOpen = Auctions.findOne({_id: thisAuction}).isOpen;
		if (isOpen === true){
			return true;
		}
	},
	unPublished: function(){
		var id = this._id;
		var state = Auctions.findOne({_id: id}).isPublished;
		if (state === false) {
			return true;
		}
	},
	totalPurchaseValue: function() {
		var thisAuction = this._id;
		var auctionVal = AuctionReservation.find({auction: thisAuction, paid: false}).map(function(auction) {
		    return auction.purchaseVal;
		});
		var auctionSum = auctionVal.length ? auctionVal.reduce(function (a, b) {return a + b;}) : 0;
		return auctionSum;
	},
	newDiscounted: function () {
		var thisAuction = this._id;
		var bids = Bidding.find({auction: thisAuction}).map(function(bid) {
		    return bid.bidPlaced;
		});
		var bidPos = bids.sort(function(a, b){return b-a});
		//get the js position which starts fron "0"
		var price = Auctions.findOne({_id: thisAuction}).minimumPrice;
		var Rate = (bidPos[0]);
		return parseInt((Rate * price) / (100 - Rate));
	},
	bidExists: function(){
		var thisAuction = this._id;
		var exists = Bidding.findOne({auction: thisAuction});
		if (exists){
			return true;
		}
	},
	winningUser: function(){
		var selfId = this;
		var obj = selfId.valueOf();
        var myBid = Bidding.findOne({bidder: obj, auction: Template.parentData()._id}).bidPlaced;
		var bids = Bidding.find({auction: Template.parentData()._id}).map(function(bid) {
		    return bid.bidPlaced;
		});
		var bidPos = bids.sort(function(a, b){return b-a});
		//get the js position which starts fron "0"
		var jsPosition = ( jQuery.inArray(myBid, bidPos) );
		var position = (jsPosition + 1);
		if (position === 1){
			return true;
		}
	},
	winningBid: function(){
		var thisAuction = this._id;
		var bids = Bidding.find({auction: thisAuction}).map(function(bid) {
		    return bid.bidPlaced;
		});
		var bidPos = bids.sort(function(a, b){return b-a});
		//get the js position which starts fron "0"
		return (bidPos[0]);
	},
	isAFavourite: function() {
		var thisAuction = this._id;
		var doeslike = Favourites.findOne({user:Meteor.userId(), auction:thisAuction});
		if (doeslike) {
			return true;
		}
	}
});