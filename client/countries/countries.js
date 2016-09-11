Template.countries.onCreated(function() {
	var selfCountry = this;

	selfCountry.autorun(function() {
		var page = FlowRouter.getParam('page');
		var currentPage = parseInt(page) || 1;
		// var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;
		var skipCount = (currentPage - 1) * 15;
		selfCountry.subscribe('countries', skipCount);
	});
});
Template.countries.helpers({
	country: function(){
		return Countries.find();
	},
	isPublished: function(){
		var countryId = this._id;
		var countryState = Countries.findOne({_id: countryId}).published;
		if (countryState === true){
			return true;
		}
	},
	smallIso: function (){
		var countryId = this._id;
		var iso = Countries.findOne({_id: countryId}).isoCode;
		return iso.toLowerCase();
	},
	prevPage: function() {
		var page = FlowRouter.getParam('page');
		var currentPage = parseInt(page) || 1;
		var previousPage = currentPage === 1 ? 1 : currentPage - 1;
		var params = {page: previousPage};
		return FlowRouter.path("countries", params);
	},
	nextPage: function() {
		var page = FlowRouter.getParam('page');
		var currentPage = parseInt(page) || 1;
		var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
		var params = {page: nextPage};
		return FlowRouter.path("countries", params);
	}
});
Template.countries.events({
	'click .publish-country': function(){
		var id = this._id;
		var countryName = Countries.findOne({_id: id}).name;
		var countryState = Countries.findOne({_id: id}).published;
		Meteor.call('toggleCountryPublish', id, countryState, ( error ) => {
            if ( error ) {
                console.log( error.reason);
            }
            var message = countryName + ' ' + 'has been updated';
            Bert.alert( message, 'success' );
        });
	}
})

var hasMorePages = function() {
	var page = FlowRouter.getParam('page');
	var currentPage = parseInt(page) || 1;
	var totalCountries = Counts.get('countryCount');
	// return currentPage * parseInt(Meteor.settings.public.recordsPerPage) < totalCountries;
	return currentPage * 15 < totalCountries;
}