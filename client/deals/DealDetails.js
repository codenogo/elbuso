Template.DealDetails.onRendered(function() {
  	GoogleMaps.load({key: 'AIzaSyC-o3gWc4wXZvMamAo5xBhtimaON8ASq78', libraries: 'geometry,places'});
});

Template.DealDetails.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleDeal', id);
		self.subscribe('dealFavourites', id);
		self.subscribe('dealImages');
		self.subscribe('dealAttachments');
		self.subscribe('dealReservation');
		self.subscribe('countryList');
		self.subscribe('thisLocations');
		var userId = Deals.findOne({_id: id}).author;
		self.subscribe('myLocations', userId);
	});
	self.editMode = new ReactiveVar(false);
	GoogleMaps.ready('deaLocation', function(map) {
		// Add a marker to the map once it's ready
		var marker = new google.maps.Marker({
			position: map.options.center,
			map: map.instance
		});
	});
});

//helper to show the data of auctions in a list view
Template.DealDetails.helpers({
	deal: ()=> {
		var id = FlowRouter.getParam('id');
		return Deals.findOne({_id: id});
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
		return Favourites.find({deal: id}).count();
	},
	FavouritesThis: function() {
		var id = FlowRouter.getParam('id');
		var doeslike = Favourites.findOne({user:Meteor.userId(),deal:id});
		if (doeslike) {
			return 'liked twit-animated';
		}
	},
	daysLeft: function(){
		var id = FlowRouter.getParam('id');
		var date = Deals.findOne({_id: id}).closingDate;
		return moment(date).fromNow();
	},
	discounted: function () {
		var id = FlowRouter.getParam('id');
		var price = Deals.findOne({_id: id}).price;
		var Rate = Deals.findOne({_id: id}).Rate;
		return parseInt(price * (100 - Rate) / 100 );
	},
	reservationFee: function () {
		var id = FlowRouter.getParam('id');
		var price = Deals.findOne({_id: id}).price;
		var Rate = Deals.findOne({_id: id}).Rate;
		var fee = Deals.findOne({_id: id}).reservationFee;
		var discount = (price * (100 - Rate) / 100 );
		return parseInt(discount * (fee / 100));
	},
	payableBal: function () {
		var id = FlowRouter.getParam('id');
		var price = Deals.findOne({_id: id}).price;
		var Rate = Deals.findOne({_id: id}).Rate;
		var discount = (price * (100 - Rate) / 100 );
		var reservationFee = Deals.findOne({_id: id}).reservationFee;
		return parseInt(discount - (discount * (reservationFee / 100)));
	},
	savedAmount: function () {
		var id = FlowRouter.getParam('id');
		var price = Deals.findOne({_id: id}).price;
		var Rate = Deals.findOne({_id: id}).Rate;
		var discount = (price * (100 - Rate) / 100 );
		return parseInt(price - discount);
	},
	authorName: function() {
		var id = FlowRouter.getParam('id');
		var userId = Deals.findOne({_id: id}).author;
        return Meteor.users.findOne({_id: userId}).profile.company.companyName;
	},
	authorImage: function() {
		var id = FlowRouter.getParam('id');
		var userId = Deals.findOne({_id: id}).author;
        return Meteor.users.findOne({_id: userId}).image;
	},
	authorLetter: function() {
		var id = FlowRouter.getParam('id');
		var userId = Deals.findOne({_id: id}).author;
        var firstName = Meteor.users.findOne({_id: userId}).profile.company.companyName;
		return _.str.truncate(firstName, 1, ' ');
	},
	authorLocation: function() {
		var id = FlowRouter.getParam('id');
		var userId = Deals.findOne({_id: id}).author;
        var location = Meteor.users.findOne({_id: userId}).profile.country.name.formattedAddress;
        return location;
	},
	// authorCountry: function() {
	// 	var id = FlowRouter.getParam('id');
	// 	var userId = Deals.findOne({_id: id}).author;
 //        var countryId = Meteor.users.findOne({_id: userId}).profile.country.name;
 //        return Countries.findOne({_id: countryId}).name;
	// },
	userReserved : function() {
		var id = FlowRouter.getParam('id');
		var doeslike = DealReservation.findOne({ 
			user: Meteor.userId(), 
			deal: id
		});
		if (doeslike) {
			return true;
		}
	},
	seller: function() {
		var id = FlowRouter.getParam('id');
		var currentUser = Meteor.userId();
		var author = Deals.findOne({_id: id}).author;
		//check if the current user is the seller
		if(currentUser === author ){
		 	return true;
		}
	},
	editMode: function(){
		return Template.instance().editMode.get();
	},
	dealUpdateId: function() {
		var id = FlowRouter.getParam('id');
		return id;
	},
	publishedDeal: function(){
		var id = FlowRouter.getParam('id');
		var published = Deals.findOne({_id: id}).published;
		if (published == true){
			return true;
		}
	},
	dealIsOpen: function(){
		var id = FlowRouter.getParam('id');
		var open = Deals.findOne({_id: id}).isOpen;
		if (open == true){
			return true;
		}
	},
	reservationsExist: function(){
		var thisDeal = FlowRouter.getParam('id');
		var reservationsCount = DealReservation.find({deal: thisDeal}).count();
		if (reservationsCount > 0){
			return true;
		}
	},
	currencySymbol: function(){
		var thisDeal = FlowRouter.getParam('id');
		var currency = Deals.findOne({_id: thisDeal}).currency;
		var currencySymbol = Currency.findOne({currencyIso: currency}).currencySymbol;
		if (currencySymbol){
			return (currencySymbol);
		} else {
			return (currency);
		}
	},
	showDealMap: function() {
		var thisDeal = FlowRouter.getParam('id');
		var lat = Deals.findOne({_id: thisDeal}).location.lat;
		var lng = Deals.findOne({_id: thisDeal}).location.lng;
	    // Make sure the maps API has loaded
	    // console.log(location);
	    if (GoogleMaps.loaded()) {
			// Map initialization options
			return {
				center: new google.maps.LatLng(lat, lng),
				zoom: 13
			};
	    }
	},
	thisDealMap: function() {
		var selfId = this;
		var thisMap = selfId.valueOf();
		var lat = Locations.findOne({_id: thisMap}).location.lat;
		var lng = Locations.findOne({_id: thisMap}).location.lng;
	    // Make sure the maps API has loaded
	    if (GoogleMaps.loaded()) {
			// Map initialization options
			return {
				center: new google.maps.LatLng(lat, lng),
				zoom: 13
			};
	    }
	},
	locationName: function() {
		var selfId = this;
		var thisMap = selfId.valueOf();
		return Locations.findOne({_id: thisMap}).Name;
	},
	noReservationFee: function(){
		var thisDeal = FlowRouter.getParam('id');
		var val = Deals.findOne({_id: thisDeal}).reservationFee;
		if (val == 1){
			return true;
		}
	},
	isUnits: function(){
		var thisDeal = FlowRouter.getParam('id');
		var val = Deals.findOne({_id: thisDeal}).unitType;
		if (val == 'single'){
			return true;
		}
	},

	//
	//
	//
	//
	//EDITING FIELDS
	dateNow: function(){
		return (new Date());
	},
	closeDate: function(){
		return AutoForm.getFieldValue('closingDate', 'dealUpdateId');
	},
	min: function(){
		return 1;
	},
	priceVal: function(){
		var val = AutoForm.getFieldValue('price', 'dealUpdateId');
		return parseInt(val);
	},
	maxPriceVal: function(){
		var price = AutoForm.getFieldValue('price', 'dealUpdateId');
		var rate = AutoForm.getFieldValue('Rate', 'dealUpdateId');
		var reservations = AutoForm.getFieldValue('maximumTotalUnits', 'dealUpdateId');
		return parseInt(price * ((100 - rate)/100) * reservations);
	},
});


Template.DealDetails.events({
	'blur .my-units': function (event, template) {
		var id = FlowRouter.getParam('id');
		var units = $(".my-units").val();
		var maxUnits = Deals.findOne({_id: id}).maximumUserUnits;
		if (units <= maxUnits){
			$('.dynamic-value').removeClass('hidden');
			$('.static-value').addClass('hidden');
			$('.dynamic-reservation').removeClass('hidden');
			$('.static-reservation').addClass('hidden');
			$('.dynamic-payable').removeClass('hidden');
			$('.static-payable').addClass('hidden');
			$('.dynamic-saved').removeClass('hidden');
			$('.static-saved').addClass('hidden');

			//change the value dynamically for the discounted price preview
			var price = Deals.findOne({_id: id}).price;
			var Rate = Deals.findOne({_id: id}).Rate;
			var discounted = parseInt(price * (100 - Rate) / 100 );
			var calc = (units * discounted);
			$(".dynamic-discounted").empty();
			$(".dynamic-discounted").text(calc);

			//change the value dynamically for the original price preview
			var original = (units * price);
			$(".dynamic-original").empty();
			$(".dynamic-original").text(original);

			//change the value dynamically for the reservation fee preview
			var fee = Deals.findOne({_id: id}).reservationFee;
			var discount = (price * (100 - Rate) / 100 );
			var reservationFee = parseInt(discount * (fee / 100));
			var calcFee = (units * reservationFee);
			$(".dynamic-reservation-fee").empty();
			$(".dynamic-reservation-fee").text(calcFee);

			//change the value dynamically for the payable balance price preview
			var payable = parseInt(discount - (discount * (fee / 100)));
			var payeFee = (units * payable);
			$(".dynamic-payable").empty();
			$(".dynamic-payable").text(payeFee);

			//change the value dynamically for the saved-amount preview preview
			var saved = parseInt(price - discount);
			var savedAmt = (units * saved);
			$(".dynamic-saved-amt").empty();
			$(".dynamic-saved-amt").text(savedAmt);

			return false;
		} else if (units > maxUnits){
			var content = ('you cannot reserve more than' + ' ' + maxUnits);
			Bert.alert(content, 'danger');
		} else if (units < 1) {
			Bert.alert('please enter a valid number of items', 'danger');
		}
    },
	'click .heart': function(event, template){
		event.preventDefault();
		var id = FlowRouter.getParam('id');
		var like = Favourites.findOne({ user: Meteor.userId(), deal: id });
		if (!like) {
	  		Favourites.insert({ user: Meteor.userId(), deal: id });
		} else {
			var favorite = Favourites.findOne({user: Meteor.userId(), deal: id})._id;
			Meteor.call('unFavorite', favorite);
		}
		Session.set('updated', new Date());
	},
	'submit .deal-reservation': function(event, template){
		event.preventDefault();
		var id = FlowRouter.getParam('id');
		var name = Deals.findOne({_id: id}).name;
		var reserve = DealReservation.findOne({ 
			user: Meteor.userId(), 
			deal: id
		});
		//get the discounted price
		var price = Deals.findOne({_id: id}).price;
		var Rate = Deals.findOne({_id: id}).Rate;
		var maxUnits = Deals.findOne({_id: id}).maximumUserUnits;
		var units = $(".my-units").val();
		var unitPrice = parseInt(price * (100 - Rate) / 100);
		var discounted = parseInt(unitPrice * units);
		// get the date
		var date = new Date();
		if (units > maxUnits){
			var content = ('you cannot reserve more than' + ' ' + maxUnits);
			Bert.alert(content, 'danger');
		} else if (units < 1) {
			Bert.alert('please enter a valid number of items', 'danger');
		} else {
			if (!reserve) {
		  		DealReservation.insert({
		  			user: Meteor.userId(), 
					deal: id,
					paid: false,
					discountedPrice: discounted,
					units: units,
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
	'click .edit-deal': function(event, template) {
		template.editMode.set(!template.editMode.get());
	},
	'click .publish-deal': function(){
		var id = FlowRouter.getParam('id');
		var deal = Deals.findOne({_id: id});
		var dealName = Deals.findOne({_id: id}).name;
		var dealImage = Deals.findOne({_id: id}).image;
		var authorId = Deals.findOne({_id: id}).author;
		var name = Meteor.users.findOne({_id: authorId}).profile.firstname;
		var email = Meteor.users.findOne({_id: authorId}).emails[0].address;
		Meteor.call('togglePublishDeal', id, deal.published, ( error ) => {
            if (error){
            	// Bert.alert( error.reason, 'danger' );
            	// console.log( error );
            	var content = ( dealName + ' ' + 'has been updated!');
            	Bert.alert( content, 'success' );
            } else {
            	var content = ( dealName + ' ' + 'is now published!');
            	Bert.alert( content, 'success' );
            }
        });
        var state = Deals.findOne({_id: id}).published;
		if (state === true){
            var data = {
            	name: name,
                dealName: dealName,
                dealImage: dealImage,
                dealId: id
            };
            var html = Blaze.toHTMLWithData(Template.publishedDealTemplate, data);
            Meteor.call('publishedDealEmail', email, html, (error) => {
            	// if (error) {
            	// 	Bert.alert( error.reason, 'danger' );
            	// } else {
            	// 	Bert.alert( 'an email has been sent to the author', 'success' );
            	// }
            });
		}
	},
	'click .close-deal': function(){
		var id = FlowRouter.getParam('id');
		var deal = Deals.findOne({_id: id});
		Meteor.call('toggleOpenDeal', id, deal.isOpen);
	},
	'click .delete-deal': function(){
		var id = FlowRouter.getParam('id');
		var imageId = Deals.findOne({_id: id}).image;
		// var attachmentId = Deals.findOne({_id: id}).attachments.map(function(attachId){
		// 	return attachId;
		// });
		Meteor.call('deleteDeal', id, imageId);
	},


	// FORM EDITS
	
	
	
	'change input[name=goingLiveDate]': function () {
		// Disable any dates before the start date for the end date
		$('input[name=goingLiveDate]').data("DateTimePicker").setMinDate(new Date());
		//
		//
		var picked_date = $("input[name=goingLiveDate]").data("DateTimePicker").getDate();
		var dates = picked_date.add(1, 'd');
		$('input[name=closingDate]').data("DateTimePicker").setMinDate(new Date(dates.toString()));
		//
		//
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
		//
		//
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
		//
		//
    },
    'change input[name=finalCollectionDate]': function () {
		// Get the selected start date based on the input of closing date
		var picked_date = $("input[name=finalRedeemDate]").data("DateTimePicker").getDate();
		var dates = picked_date.add(2, 'd');
		// Disable any dates before the start date for the end date
		$('input[name=finalCollectionDate]').data("DateTimePicker").setMinDate(new Date(dates.toString()));
    }
});
AutoForm.addHooks(['dealUpdateId'], {
	onSuccess: function(operation, result, event, template) {
		var id = FlowRouter.getParam('id');
		var dealName = Deals.findOne({_id: id}).name;
		var content = ('This deal ' + ' "' +dealName + '" ' + 'has been updated.');
		Bert.alert(content, 'success');
		template.editMode.set(!template.editMode.get());
	}
});