Template.closedAuction.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('auctionReservation');
		self.subscribe('bidding');
	});
});
Template.closedAuction.helpers({
	formattedDate: function(){
		// return moment(this.closingDate).format("ddd, hA");
		return moment(this.closingDate).fromNow();
	},
	briefName: function() {
		return _.str.prune(this.name, 25);
	},
	daysLeft: function(){
		var thisAuction = this._id;
		var date = Auctions.findOne({_id: thisAuction}).closingDate;
		return moment(date).fromNow();
	},
	bidderName: function(){
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
	bidderIsMe: function(){
		var selfId = this;
		var obj = selfId.valueOf();
		var currentUser = Meteor.userId();
		//check if the current user is one of the bidders
		if(obj == currentUser){
		 	return true;
		}
	},
	reservationNo: function() {
		return AuctionReservation.find({auction: this._id}).count();
	},
	totalPurchaseValue: function() {
		var userId = Meteor.userId();
		var auctionVal = AuctionReservation.find({auction: this._id, paid: false}).map(function(auction) {
		    return auction.purchaseVal;
		});
		var auctionSum = auctionVal.length ? auctionVal.reduce(function (a, b) {return a + b;}) : 0;
		return auctionSum;
	},
	placedBid: function(){
		var thisAuction = this._id;
		var currentUser = Meteor.userId();
		return Bidding.findOne({bidder: currentUser, auction: thisAuction});
	},
	bidPlaced: function(){
		var thisAuction = this._id;
		var currentUser = Meteor.userId();
		return Bidding.findOne({bidder: currentUser, auction: thisAuction}).bidPlaced;
	},
	bidderPlacedBid: function(template) {
		var selfId = this;
		var obj = selfId.valueOf();
		var startRate = Auctions.findOne({_id: Template.parentData()._id}).StartRate;
        var myBid = Bidding.findOne({bidder: obj, auction: Template.parentData()._id}).bidPlaced;
        if (!myBid){
        	return startRate;
        } else {
        	return myBid;
        }
	},
	originalStartRate: function(template) {
        var startRate = Auctions.findOne({_id: Template.parentData()._id}).StartRate;
        return startRate;
	},
	position: function(template){
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
			return '1st';
		} else if (position === 2){
			return '2nd';
		} else if (position === 3){
			return '3rd';
		} else if (position > 3){
			return (position + 'th');
		}
	},
	myPosition: function(template){
		var thisAuction = this._id;
		var currentUser = Meteor.userId();
        var myBid = Bidding.findOne({bidder: currentUser, auction: thisAuction}).bidPlaced;
		var bids = Bidding.find({auction: thisAuction}).map(function(bid) {
		    return bid.bidPlaced;
		});
		var bidPos = bids.sort(function(a, b){return b-a});
		//get the js position which starts fron "0"
		var jsPosition = ( jQuery.inArray(myBid, bidPos) );
		var position = (jsPosition + 1);
		if (position === 1){
			return '1st';
		} else if (position === 2){
			return '2nd';
		} else if (position === 3){
			return '3rd';
		} else if (position > 3){
			return (position + 'th');
		}
	},
	winning: function(){
		var thisAuction = this._id;
		var currentUser = Meteor.userId();
        var myBid = Bidding.findOne({bidder: currentUser, auction: thisAuction}).bidPlaced;
		var bids = Bidding.find({auction: thisAuction}).map(function(bid) {
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
	Bidderss: function(){
		var thisAuction = this._id;
		var bidders = Auctions.findOne({_id: thisAuction}).Bidders;
		return bidders;
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
});




Template.closedAuction.events({
	'submit .myBidUpdate': function(event, template){
		event.preventDefault();
		var thisAuction = this._id;
		var name = Auctions.findOne({_id: thisAuction}).name;
		var myBidValue = event.target.myBid.value;
		var date = new Date();
		var placedBid = Bidding.findOne({ 
			bidder: Meteor.userId(), 
			auction: thisAuction, 
		});
		if (!placedBid) {
	  		Bidding.insert({
	  			bidder: Meteor.userId(), 
				auction: thisAuction, 
				bidPlaced: myBidValue,
				won: false,
				createdAt: date
	  		}, function(error){
			    if(error){
			    	Bert.alert( error.reason, 'danger'); 
			        console.log(error); 
			    } else {
			        Bert.alert( 'you are now bidding for' + ' ' + name, 'success'); 
			    }
			});
	  	} else {
	  		var thisAuction = this._id;
			var currentUser = Meteor.userId();
	  		var bidId = Bidding.findOne({bidder: currentUser, auction: thisAuction})._id;
	  		Bidding.update(bidId, {
			    $set: {
			      	bidPlaced: myBidValue,
					updatedAt: date
				}
		    }, function(error){
			    if(error){
			    	Bert.alert( error.reason, 'danger'); 
			        console.log(error); 
			    } else {
			        Bert.alert( 'your bid for' + ' ' + name + ' ' + 'has been updated', 'success'); 
			    }
			});
	  	}
	}
});