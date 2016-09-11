Template.selectType.events({
	'click .register-buyer': function(event){
		event.preventDefault();
		var userId = Meteor.userId();
		Roles.addUsersToRoles( userId, ['buyer'], Roles.GLOBAL_GROUP);
		FlowRouter.go('profile');
		Bert.alert( 'you are now a buyer', 'success'); 
	},
	'click .register-seller': function(event){
		event.preventDefault();
		var userId = Meteor.userId();
		Roles.addUsersToRoles( userId, ['seller'], Roles.GLOBAL_GROUP);
		FlowRouter.go('company-profile');
		Bert.alert( 'you are now a seller', 'success'); 
	}
});