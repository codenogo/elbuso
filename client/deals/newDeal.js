Template.newDeal.onRendered(function() {
  	GoogleMaps.load({key: 'AIzaSyC-o3gWc4wXZvMamAo5xBhtimaON8ASq78', libraries: 'geometry,places'});
});
Template.newDeal.onCreated(function() {
	this.subscribe('countryList');
	var self = this;
	self.autorun(function(){
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['sub-user'])){
			var userId = Meteor.users.findOne({_id: Meteor.userId()}).profile.parentUser;
		} else {
			var userId = Meteor.userId();
		}
		self.subscribe('myLocations', userId);
        self.subscribe('categories');
	});

    //this will make sure that the first step is what is loaded
    this.stepOne = new ReactiveVar(true);
});
Template.newDeal.helpers({
	locationsExist: function(){
		var locations = Locations.find().count();
		if (locations >= 1){
			return true;
		}
	},
	dateNow: function(){
		return (new Date());
	},
	closeDate: function(){
		return AutoForm.getFieldValue('closingDate', 'insertDealForm');
	},
	min: function(){
		return 1;
	},
	priceVal: function(){
		var val = AutoForm.getFieldValue('price', 'insertDealForm');
		return parseInt(val);
	},
	maxPriceVal: function(){
		var price = AutoForm.getFieldValue('price', 'insertDealForm');
		var rate = AutoForm.getFieldValue('Rate', 'insertDealForm');
		var reservations = AutoForm.getFieldValue('maximumTotalUnits', 'insertDealForm');
		return parseInt(price * ((100 - rate)/100) * reservations);
	},
	myCurr: function(){
		var myCountry = Meteor.users.findOne({_id: Meteor.userId()}).profile.country.name.country;
		var myCurrency = Countries.findOne({isoCode: myCountry}).currencyIso;
		return myCurrency;
	},
    stepOne: function(){
        return Template.instance().stepOne.get();
    },
    selectedCatId: function(){
        return Session.get('selectedCat');
    },
    categoryFee: function(){
        var selectedId = Session.get('selectedCat');
        return Categories.findOne({_id: selectedId}).rate;
    },
    rootParentId: function(){
        var selectedId = Session.get('selectedCat');
        var parent = Categories.findOne({_id: selectedId}).parentCategory;
        var rootParent = Categories.findOne({_id: parent}).parentCategory;
        if (parent !== '0'){
            return true
        }
    },
    rootParentName: function(){
        var selectedId = Session.get('selectedCat');
        var parent = Categories.findOne({_id: selectedId}).parentCategory;
        var rootParent = Categories.findOne({_id: parent}).parentCategory;
        return Categories.findOne({_id: rootParent}).name;
    },
    subParentId: function(){
        var selectedId = Session.get('selectedCat');
        var parent = Categories.findOne({_id: selectedId}).parentCategory;
        if (parent !== '0'){
            return true
        }
    },
    subParentName: function(){
        var selectedId = Session.get('selectedCat');
        var parent = Categories.findOne({_id: selectedId}).parentCategory;
        return Categories.findOne({_id: parent}).name;
    },
    categoryName: function(){
        var selectedId = Session.get('selectedCat');
        return Categories.findOne({_id: selectedId}).name;
    }
});

Template.newDeal.events({
    'click .step-two-trigger': function(event, template){
        template.stepOne.set(!template.stepOne.get());
    },
	'change input[name=goingLiveDate]': function () {
		// Disable any dates before the start date for the end date
		$('input[name=goingLiveDate]').data("DateTimePicker").setMinDate(new Date());
		$('.closing-date').removeClass('hidden');
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
		$('.redeem-date').removeClass('hidden');
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
		$('.collection-date').removeClass('hidden');
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


AutoForm.addHooks(['insertDealForm'], {
	onSuccess: function(operation, result, template) {
		FlowRouter.go('deals');
		var dealName = Deals.findOne({_id: result}).name;
		var content = ('Your deal ' + ' ' +dealName + ' ' + 'will be reviewed by the Elbuso team before Publishing.');
		Bert.alert(content, 'success');
	}
});
