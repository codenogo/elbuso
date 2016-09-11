Template.dealPreviewList.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var userId = Meteor.userId();
		self.subscribe('favourites', userId);
	});
});
Template.dealPreviewList.helpers({
	//prunes the description to about 100 characters
	shortName: function() {
		return _.str.truncate(this.name, 15);
	},
	discounted: function () {
		return (this.price * (100 - this.Rate) / 100 );
	},
	authorName: function() {
		var userId = this.author;
        return Meteor.users.findOne({_id: userId}).profile.company.companyName;
	},
	authorImage: function() {
		var userId = this.author;
        return Meteor.users.findOne({_id: userId}).image;
	},
	authorLetter: function() {
		var userId = this.author;
        var username = Meteor.users.findOne({_id: userId}).profile.company.companyName;
		return _.str.truncate(username, 1, ' ');
	},
	isAFavourite: function() {
		var thisDeal = this._id;
		var doeslike = Favourites.findOne({user:Meteor.userId(), deal:thisDeal});
		if (doeslike) {
			return true;
		}
	},
	isUnpublished: function(){
		var thisDeal = this._id;
		var publishedState = Deals.findOne({_id: thisDeal}).published;
		if (publishedState === false){
			return true;
		}
	},
	currencySymbol: function(){
		var thisDeal = this._id;
		var currency = Deals.findOne({_id: thisDeal}).currency;
		var currencySymbol = Currency.findOne({currencyIso: currency}).currencySymbol;
		if (currencySymbol){
			return (currencySymbol);
		} else {
			return (currency);
		}
	},
});