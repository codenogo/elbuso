//this allows you to only rerrieve the data that the user needs for a single auction (performance enhancement)
Template.AuctionDetails.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleAuction', id);
		self.subscribe('auctionFavourites', id);
		self.subscribe('auctionImages');
		self.subscribe('auctionAttachments');
		self.subscribe('auctionReservation');
		self.subscribe('bidding');
		self.subscribe('countryList');
	});
	self.editMode = new ReactiveVar(false);
});
//helper to show the data of auctions in a list view
Template.AuctionDetails.helpers({
	auction: ()=> {
		var id = FlowRouter.getParam('id');
		return Auctions.findOne({_id: id});
	},
	isPublishedState: function(){
		var id = FlowRouter.getParam('id');
		var state = Auctions.findOne({_id: id}).isPublished;
		if (state === true) {
			return true;
		}
	},
	userVerifiedPhoneFailed: function (){
		var me = Meteor.userId();
		var personalPhone = Meteor.users.findOne({_id: me}).profile.personalPhone.phoneVerification;
		if (personalPhone === false) {
			return true;
		}
	},
	numLikes: function() {
		var id = FlowRouter.getParam('id');
		return Favourites.find({auction: id}).count();
	},
	FavouritesThis: function() {
		var id = FlowRouter.getParam('id');
		var doeslike = Favourites.findOne({user:Meteor.userId(),auction:id});
		if (doeslike) {
			return 'liked twit-animated';
		}
	},
	daysLeft: function(){
		var id = FlowRouter.getParam('id');
		var date = Auctions.findOne({_id: id}).closingDate;
		return moment(date).fromNow();
	},
	reservationFee: function () {
		var id = FlowRouter.getParam('id');
		var price = Auctions.findOne({_id: id}).minimumPrice;
		var fee = Auctions.findOne({_id: id}).reservationFee;
		return parseInt(price * (fee / 100));
	},
	discounted: function () {
		var id = FlowRouter.getParam('id');
		var price = Auctions.findOne({_id: id}).minimumPrice;
		var Rate = Auctions.findOne({_id: id}).StartRate;
		return parseInt((Rate * price) / (100 - Rate));
	},
	rowspan: function () {
		var id = FlowRouter.getParam('id');
		var bidders = Auctions.findOne({_id: id}).Bidders;
		var bidderNumber = bidders.length;
		return  bidderNumber + 1;
	},
	bidder: function(){
		//this is the single-item
		var selfId = this;
		//the "this" is a string and will be converted to an object
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
	reservationNo: function() {
		var id = FlowRouter.getParam('id');
		return AuctionReservation.find({auction: id}).count();
	},
	hasReservedMore: function(){
		var id = FlowRouter.getParam('id');
		var reservationsCount = AuctionReservation.find({auction: id}).count();
		if (reservationsCount > 1){
			return true;
		}
	},
	reservationPercentage: function() {
		var id = FlowRouter.getParam('id');
		var targetReservations = Auctions.findOne({_id: id}).targetted;
		var reservations = AuctionReservation.find({auction: id}).count();
		return parseInt((reservations / targetReservations) * 100);
	},
	userReserved : function() {
		var id = FlowRouter.getParam('id');
		var doeslike = AuctionReservation.findOne({ 
			user: Meteor.userId(), 
			auction: id
		});
		if (doeslike) {
			return true;
		}
	},
	myPurchaseValue: function(){
		var id = FlowRouter.getParam('id');
		var myPurchaseVal = AuctionReservation.findOne({ 
			user: Meteor.userId(), 
			auction: id
		}).purchaseVal;
		return myPurchaseVal;
	},
	shortlistedSeller: function() {
		var id = FlowRouter.getParam('id');
		var currentUser = Meteor.userId();
		var bidders = Auctions.findOne({_id: id}).Bidders;
		//check if the current user is one of the bidders
		if(bidders.indexOf( currentUser )>=0){
		 	return true;
		}
	},
	editMode: function(){
		return Template.instance().editMode.get();
	},
	auctionUpdateId: function() {
		var id = FlowRouter.getParam('id');
		return id;
	},
	auctionIsOpen: function(){
		var id = FlowRouter.getParam('id');
		var open = Auctions.findOne({_id: id}).isOpen;
		if (open == true){
			return true;
		}
	},
	biddingIsOpen: function(){
		var id = FlowRouter.getParam('id');
		var open = Auctions.findOne({_id: id, isOpen: true}).bidding;
		if (open == true){
			return true;
		}
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
		var thisAuction = FlowRouter.getParam('id');
		return AuctionReservation.find({auction: thisAuction}).count();
	},
	totalPurchaseValue: function() {
		var thisAuction = FlowRouter.getParam('id');
		var auctionVal = AuctionReservation.find({auction: thisAuction, paid: false}).map(function(auction) {
		    return auction.purchaseVal;
		});
		var auctionSum = auctionVal.length ? auctionVal.reduce(function (a, b) {return a + b;}) : 0;
		return auctionSum;
	},
	averagePurchase: function(){
		var thisAuction = FlowRouter.getParam('id');
		var userId = Meteor.userId();
		var auctionVal = AuctionReservation.find({auction: thisAuction, paid: false}).map(function(auction) {
		    return auction.purchaseVal;
		});
		var auctionSum = auctionVal.length ? auctionVal.reduce(function (a, b) {return a + b;}) : 0;
		var reservationNo = AuctionReservation.find({auction: thisAuction}).count();
		return parseInt(auctionSum / reservationNo);
	},
	placedBid: function(){
		var thisAuction = FlowRouter.getParam('id');
		var currentUser = Meteor.userId();
		return Bidding.findOne({bidder: currentUser, auction: thisAuction});
	},
	bidPlaced: function(){
		var thisAuction = FlowRouter.getParam('id');
		var currentUser = Meteor.userId();
		return Bidding.findOne({bidder: currentUser, auction: thisAuction}).bidPlaced;
	},
	bidExists: function(){
		var thisAuction = FlowRouter.getParam('id');
		var exists = Bidding.findOne({auction: thisAuction});
		if (exists){
			return true;
		}
	},
	bidderPlacedBid: function() {
		var thisAuction = FlowRouter.getParam('id');
		var selfId = this;
		var obj = selfId.valueOf();
		var startRate = Auctions.findOne({_id: thisAuction}).StartRate;
        var myBid = Bidding.findOne({bidder: obj, auction: thisAuction}).bidPlaced;
        if (!myBid){
        	return startRate;
        } else {
        	return myBid;
        }
	},
	originalStartRate: function() {
		var thisAuction = FlowRouter.getParam('id');
        var startRate = Auctions.findOne({_id: thisAuction}).StartRate;
        return startRate;
	},
	position: function(){
		var thisAuction = FlowRouter.getParam('id');
		var selfId = this;
		var obj = selfId.valueOf();
        var myBid = Bidding.findOne({bidder: obj, auction: thisAuction}).bidPlaced;
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
	myPosition: function(){
		var thisAuction = FlowRouter.getParam('id');
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
		var thisAuction = FlowRouter.getParam('id');
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
		var thisAuction = FlowRouter.getParam('id');
        var myBid = Bidding.findOne({bidder: obj, auction: thisAuction}).bidPlaced;
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
	winningBid: function(){
		var thisAuction = FlowRouter.getParam('id');
		var bids = Bidding.find({auction: thisAuction}).map(function(bid) {
		    return bid.bidPlaced;
		});
		var bidPos = bids.sort(function(a, b){return b-a});
		//get the js position which starts fron "0"
		return (bidPos[0]);
	},
	newDiscounted: function () {
		var thisAuction = FlowRouter.getParam('id');
		var bids = Bidding.find({auction: thisAuction}).map(function(bid) {
		    return bid.bidPlaced;
		});
		var bidPos = bids.sort(function(a, b){return b-a});
		//get the js position which starts fron "0"
		var price = Auctions.findOne({_id: thisAuction}).minimumPrice;
		var Rate = (bidPos[0]);
		return parseInt((Rate * price) / (100 - Rate));
	},
	myNewDiscounted: function () {
		var thisAuction = FlowRouter.getParam('id');
		var bids = Bidding.find({auction: thisAuction}).map(function(bid) {
		    return bid.bidPlaced;
		});
		var bidPos = bids.sort(function(a, b){return b-a});
		//get the js position which starts fron "0"
		var price = AuctionReservation.findOne({_id: selfId}).purchaseVal;
		var Rate = (bidPos[0]);
		return parseInt((Rate * price) / (100 - Rate));
	},
	Bidderss: function(){
		var thisAuction = FlowRouter.getParam('id');
		var bidders = Auctions.findOne({_id: thisAuction}).Bidders;
		return bidders;
	},
	reservationsExist: function(){
		var thisAuction = FlowRouter.getParam('id');
		var reservationsCount = AuctionReservation.find({auction: thisAuction}).count();
		if (reservationsCount > 0){
			return true;
		}
	},
	currencySymbol: function(){
		var thisAuction = FlowRouter.getParam('id');
		var currency = Auctions.findOne({_id: thisAuction}).currency;
		var currencySymbol = Currency.findOne({currencyIso: currency}).currencySymbol;
		if (currencySymbol){
			return (currencySymbol);
		} else {
			return (currency);
		}
	},
	//CLOSED
	auctionIsClosed: function(){
		var id = FlowRouter.getParam('id');
		var open = Auctions.findOne({_id: id}).isOpen;
		if (open === false){
			return true;
		}
	},
	//attachments
	isImage: function(){
		var type = AuctionAttachments.findOne({_id: this}).original.type;
		if (type === "image/jpeg"){
			return true;
		} else if (type === "image/png"){
			return true;
		} else if (type === "image/gif"){
			return true;
		} else if (type === "image/bmp"){
			return true;
		}
	},
	//
	//
	//
	//
	//
	dateNow: function(){
		return (new Date());
	},
	closeDate: function(){
		return AutoForm.getFieldValue('closingDate', 'auctionUpdateId');
	},
	minValue: function(){
		return AutoForm.getFieldValue('maximumPrice', 'auctionUpdateId');
	},
	calcValue: function(){
		var price = AutoForm.getFieldValue('maximumPrice', 'auctionUpdateId');
		var targetted = AutoForm.getFieldValue('targetted', 'auctionUpdateId');
		return ((price * targetted) * 1 + 1 - 1);
	}
});


Template.AuctionDetails.events({
	'change .my-purchase-val': function (event, template) {
		var id = FlowRouter.getParam('id');
		var myPurchaseVal = $(".my-purchase-val").val();
		var maxValue = Auctions.findOne({_id: id}).maximumPrice;
		var minValue = Auctions.findOne({_id: id}).minimumPrice;
		if (myPurchaseVal > maxValue){
			var content = ('you cannot reserve more than' + ' ' + maxValue);
			Bert.alert(content, 'danger');
		} else if (myPurchaseVal < minValue) {
			var content = ('you cannot reserve less than' + ' ' + minValue);
			Bert.alert(content, 'danger');
		} else if (myPurchaseVal <= maxValue){
			$('.dynamicc-discounted').removeClass('hidden');
			$('.staticc-discounted').addClass('hidden');
			$('.dynamicc-reservation').removeClass('hidden');
			$('.staticc-reservation').addClass('hidden');

			//change the value dynamically for the discounted price preview
			var Rate = Auctions.findOne({_id: id}).StartRate;
			var discounted = parseInt((Rate * myPurchaseVal) / (100 - Rate));
			$(".dynamicc-discounted-value").empty();
			$(".dynamicc-discounted-value").text(discounted);


			//change the value dynamically for the reservation fee preview
			var fee = Auctions.findOne({_id: id}).reservationFee;
			var calcFee = parseInt(myPurchaseVal * (fee / 100));
			$(".dynamicc-reservation-fee").empty();
			$(".dynamicc-reservation-fee").text(calcFee);
		}
    },
	'click .heart': function(event, template){
		event.preventDefault();
		var id = FlowRouter.getParam('id');
		var like = Favourites.findOne({ user: Meteor.userId(), auction: id });
		if (!like) {
	  		Favourites.insert({ user: Meteor.userId(), auction: id });
		} else {
			var favorite = Favourites.findOne({user: Meteor.userId(), auction: id})._id;
			Meteor.call('unFavorite', favorite);
		}
		Session.set('updated', new Date());
	},
	'submit .reservation': function(event, template){
		event.preventDefault();
		var id = FlowRouter.getParam('id');
		var name = Auctions.findOne({_id: id}).name;
		// check the max value one can redeem
		var maxValue = Auctions.findOne({_id: id}).maximumPrice;
		var minValue = Auctions.findOne({_id: id}).minimumPrice;
		//check the currency
		var currency = Auctions.findOne({_id: id}).currency;
		var currencySymbol = Currency.findOne({currencyIso: currency}).currencySymbol;
		if (currencySymbol){
			var curr = currencySymbol;
		} else {
			var curr = currency;
		}


		var amount = event.target.myPurchaseVal.value;
		var selected = template.findAll( "input[type=checkbox]:checked");
		var seller = _.map(selected, function(item) {
		    return item.defaultValue;
		});
		var date = new Date();
		var reserve = AuctionReservation.findOne({ 
			user: Meteor.userId(), 
			auction: id, 
			purchaseVal: amount,
			sellers: seller
		});
		if (amount > maxValue){
			var message = 'you cannot redeem more than' + ' ' + maxValue + curr + ' ' + 'for this auction';
			Bert.alert(message, 'danger');
		} else if (amount < minValue){
			var content = ('you cannot reserve less than' + ' ' + minValue + curr + ' ' + 'for this auction');
			Bert.alert(content, 'danger');
		} else if (amount <= maxValue) {
			if (!reserve) {
		  		AuctionReservation.insert({
		  			user: Meteor.userId(), 
					auction: id, 
					purchaseVal: amount,
					sellers: seller,
					paid: false,
					collected: false,
					createdAt: date
		  		}, function(error){
				    if(error){
				    	Bert.alert( error.reason, 'danger'); 
				        console.log(error); 
				    } else {
				        Bert.alert( name + ' ' + 'is now in your cart', 'success'); 
				    }
				});
		  	}
		}
		
	},
	'click .edit-auction': function(event, template) {
		template.editMode.set(!template.editMode.get());
	},
	'click .close-auction': function(){
		var id = FlowRouter.getParam('id');
		var auction = Auctions.findOne({_id: id});
		Meteor.call('toggleOpenAuction', id, auction.isOpen);
	},
	'click .bidding-auction': function(){
		var id = FlowRouter.getParam('id');
		var auction = Auctions.findOne({_id: id});
		Meteor.call('toggleBidding', id, auction.bidding);
	},
	'click .publish-auction': function(){
		var id = FlowRouter.getParam('id');
		var auction = Auctions.findOne({_id: id});
		var auctionName = Auctions.findOne({_id: id}).name;
		var auctionImage = Auctions.findOne({_id: id}).image;
		var auctionId = FlowRouter.getParam('id');
		Meteor.call('togglePublishAuction', id, auction.isPublished, ( error ) => {
            // if ( error ) {
            //     Bert.alert( error.reason, 'danger' );
            // } else 
            var content = ( auctionName + ' ' + 'is now Published!');
            Bert.alert( content, 'success' );
        });
        var bidders = Auctions.findOne({_id: id}).Bidders;
		var name = bidders.map(function(bid) {
		    var selfId = bid;
			var obj = selfId.valueOf();
	        var bidderName = Meteor.users.findOne({_id: obj}).profile.firstname;
	        return bidderName;
		});
		var companyName = bidders.map(function(bid) {
		    var selfId = bid;
			var obj = selfId.valueOf();
	        var companyName = Meteor.users.findOne({_id: obj}).profile.company.companyName;
	        return companyName;
		});
		var email = bidders.map(function(bid) {
		    var selfId = bid;
			var obj = selfId.valueOf();
	        var email = Meteor.users.findOne({_id: obj}).emails[0].address;
	        return email;
		});
        var state = Auctions.findOne({_id: id}).isPublished;
		if (state === true){
            var data = {
            	name: name,
                companyName: companyName,
                auctionName: auctionName,
                auctionImage: auctionImage,
                auctionId: auctionId
            };
            var html = Blaze.toHTMLWithData(Template.addToAuctionTemplate, data);
            Meteor.call('addToAuctionEmail', email, html);
		}
	},

	'click .delete-auction': function(){
		var id = FlowRouter.getParam('id');
		var imageId = Auctions.findOne({_id: id}).image;
		// var attachmentId = Auctions.findOne({_id: id}).attachments;
		Meteor.call('deleteAuction', id, imageId);
		// AuctionAttachments.remove({'_id':{'$in': attachmentId}});
	},
	'submit .myBidUpdate': function(event, template){
	 	event.preventDefault();
		var thisAuction = FlowRouter.getParam('id');
		var name = Auctions.findOne({_id: thisAuction}).name;
		var StartRate = Auctions.findOne({_id: thisAuction}).StartRate;
		var myBidValue = event.target.myBid.value;
		var date = new Date();
		var placedBid = Bidding.findOne({ 
			bidder: Meteor.userId(), 
			auction: thisAuction, 
		});
		if (myBidValue < StartRate) {
			Bert.alert('you cannot bid below the starting rate', 'danger');
		} else {
			if (myBidValue > 99){
				Bert.alert('you cannot bid that far', 'danger');
			} else {
				if (!placedBid) {
					if (myBidValue > (+StartRate + 10)){
	  					Bert.alert('you cannot bid more than 10% more at a time', 'info');
	  				} else {
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
				  	}
			  	} else {
			  		var thisAuction = FlowRouter.getParam('id');
					var currentUser = Meteor.userId();
			  		var bidId = Bidding.findOne({bidder: currentUser, auction: thisAuction})._id;
			  		var currentValue = Bidding.findOne({bidder: currentUser, auction: thisAuction}).bidPlaced;
			  		if (myBidValue == currentValue){
			  			Bert.alert("your bid hasn't changed", 'info');
			  		} else {
			  			if (myBidValue < currentValue){
			  				Bert.alert('you cannot lower than your previous bid', 'danger');
			  			} else {
			  				if (myBidValue > (+currentValue + 10)){
			  					Bert.alert('you cannot bid more than 10% more at a time', 'info');
			  				} else {
			  					Bidding.update(bidId, {
								    $set: {
								      	bidPlaced: myBidValue,
										updatedAt: date
									}
							    }, function(error){
								    if(error){
								    	Bert.alert( error.reason, 'danger'); 
								    } else {
								        Bert.alert( 'your bid for' + ' ' + name + ' ' + 'has been updated', 'success'); 
								    }
								});
			  				}
			  			}
			  		}
			  	}
			}
		}
	},
	//
	//
	//
	//
	//
	//
	'change input[name=goingLiveDate]': function () {
		// Disable any dates before the start date for the end date
		$('input[name=goingLiveDate]').data("DateTimePicker").setMinDate(new Date());
		//
		//
		var picked_date = $("input[name=goingLiveDate]").data("DateTimePicker").getDate();
		var dates = picked_date.add(1, 'd');
		$('input[name=closingDate]').data("DateTimePicker").setMinDate(new Date(dates.toString()));
    },
    'change input[name=closingDate]': function () {
		// Get the selected start date based on teh input of going live
		var picked_date = $("input[name=goingLiveDate]").data("DateTimePicker").getDate();
		var dates = picked_date.add(1, 'd');
		$('input[name=closingDate]').data("DateTimePicker").setMinDate(new Date(dates.toString()));
		//
		//
		var picked_datee = $("input[name=closingDate]").data("DateTimePicker").getDate();
		var datess = picked_datee.add(7, 'd');
		$('input[name=finalRedeemDate]').data("DateTimePicker").setMinDate(new Date(datess.toString()));
    },
    'change input[name=finalRedeemDate]': function () {
		// Get the selected start date based on the input of closing date
		var picked_date = $("input[name=closingDate]").data("DateTimePicker").getDate();
		var dates = picked_date.add(7, 'd');
		$('input[name=finalRedeemDate]').data("DateTimePicker").setMinDate(new Date(dates.toString()));
		//
		//
		var picked_datee = $("input[name=finalRedeemDate]").data("DateTimePicker").getDate();
		var datess = picked_datee.add(2, 'd');
		$('input[name=finalCollectionDate]').data("DateTimePicker").setMinDate(new Date(datess.toString()));
    },
    'change input[name=finalCollectionDate]': function () {
		// Get the selected start date based on the input of closing date
		var picked_date = $("input[name=finalRedeemDate]").data("DateTimePicker").getDate();
		var dates = picked_date.add(2, 'd');
		// Disable any dates before the start date for the end date
		$('input[name=finalCollectionDate]').data("DateTimePicker").setMinDate(new Date(dates.toString()));
    }
});