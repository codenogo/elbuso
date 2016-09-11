Template.newAuction.onCreated(function() {
	this.subscribe('countryList');
	this.subscribe('categories');
	//this will make sure that the first step is what is loaded
    this.stepOne = new ReactiveVar(true);
});
Template.newAuction.helpers({
	dateNow: function(){
		return (new Date());
	},
	closeDate: function(){
		return AutoForm.getFieldValue('closingDate', 'insertAuctionForm');
	},
	minValue: function(){
		return AutoForm.getFieldValue('maximumPrice', 'insertAuctionForm');
	},
	calcValue: function(){
		var price = AutoForm.getFieldValue('maximumPrice', 'insertAuctionForm');
		var targetted = AutoForm.getFieldValue('targetted', 'insertAuctionForm');
		return ((price * targetted) * 1 + 1 - 1);
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
Template.newAuction.events({
	'click .step-two-trigger': function(event, template){
        template.stepOne.set(!template.stepOne.get());
    },
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
		$('.closing-date').removeClass('hidden');
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



AutoForm.addHooks(['insertAuctionForm'], {
	onSuccess: function(operation, result, template) {
		FlowRouter.go('auctions');
		var auctionName = Auctions.findOne({_id: result}).name;
	    var content = ('The auction ' + ' ' +auctionName + ' ' + 'has been created.');
	    Bert.alert(content, 'success');
	}
});
