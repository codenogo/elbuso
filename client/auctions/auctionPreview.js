Template.auctionPreview.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('auctionReservation');
		self.subscribe('bidding');
		var userId = Meteor.userId();
		self.subscribe('favourites', userId);
	});
});
Template.auctionPreview.helpers({
	briefName: function() {
		return _.str.prune(this.name, 25);
	},
	bidder: function(){
		var selfId = this;
		var obj = selfId.valueOf();
		var bidderName = Meteor.users.findOne({_id: obj}).username;
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
        var bidderName = Meteor.users.findOne({_id: obj}).username;
		return _.str.truncate(bidderName, 1, ' ');
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
	bidderName: function() {
		var selfId = this;
		var obj = selfId.valueOf();
        return bidderName = Meteor.users.findOne({_id: obj}).profile.company.companyName;
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
	bidExists: function(){
		var thisAuction = this._id;
		var exists = Bidding.findOne({auction: thisAuction});
		if (exists){
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
	isAFavourite: function() {
		var thisAuction = this._id;
		var doeslike = Favourites.findOne({user:Meteor.userId(), auction:thisAuction});
		if (doeslike) {
			return true;
		}
	}
});