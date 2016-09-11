Template.currencyEdit.onCreated(function() {
	var selfCurrency = this;

	selfCurrency.autorun(function() {
		var page = FlowRouter.getParam('page');
		var currentPage = parseInt(page) || 1;
		// var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;
		var skipCount = (currentPage - 1) * 15;
		selfCurrency.subscribe('countries', skipCount);
	});
});
Template.currencyEdit.helpers({
	country: function(){
		return Countries.find();
	},
	prevPage: function() {
		var page = FlowRouter.getParam('page');
		var currentPage = parseInt(page) || 1;
		var previousPage = currentPage === 1 ? 1 : currentPage - 1;
		var params = {page: previousPage};
		return FlowRouter.path("edit-currency", params);
	},
	nextPage: function() {
		var page = FlowRouter.getParam('page');
		var currentPage = parseInt(page) || 1;
		var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
		var params = {page: nextPage};
		return FlowRouter.path("edit-currency", params);
	}
});
Template.currencyEdit.events({
	'click .publish-country': function(){
		var id = this._id;
		var countryState = Countries.findOne({_id: id}).published;
		Meteor.call('toggleCountryPublish', id, countryState, ( error ) => {
            if ( error ) {
                Bert.alert( error.reason, 'danger' );
            }
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