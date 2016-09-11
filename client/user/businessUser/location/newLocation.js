AutoForm.addHooks(['insertLocationForm'], {
	onSuccess: function(operation, result, template) {
		Session.set('newLocation', false);
		Bert.alert('the new location has been added', 'success');
	}
});