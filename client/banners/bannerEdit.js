AutoForm.addHooks(['insertBannerForm'], {
	onSuccess: function(operation, result, template) {
		FlowRouter.go('banners');
		Bert.alert('the banner has been added', 'success');
	}
});