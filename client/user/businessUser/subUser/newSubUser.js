Template.newSubUser.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('subUserInvitation');
	});
});
AutoForm.addHooks(['insertSubUser'], {
	onSuccess: function(operation, result, template, error) {
		var thisSubId = result;
		var createdInvite = SubUserInvitation.findOne({_id: thisSubId});
		var firstName = SubUserInvitation.findOne({_id: thisSubId}).firstname;
		var lastname = SubUserInvitation.findOne({_id: thisSubId}).lastname;
		var email = SubUserInvitation.findOne({_id: thisSubId}).email;
		var companyName = Meteor.users.findOne({_id: Meteor.userId()}).profile.company.companyName;
		var list = ('the invite to' + ' ' + firstName + ' ' + 'has been sent to the email:' + ' ' + email);
		var name = (firstName + " " + lastname);
		var data = {
        	name: name,
            companyName: companyName,
            inviteId: thisSubId
        };
        var html = Blaze.toHTMLWithData(Template.subUserTemplate, data);
        Meteor.call('subUserInviteEmail', email, html, companyName);
        Bert.alert(list, 'success');

		FlowRouter.go('sub-user-invitations');
	},
	onError: function(error){
		Bert.alert(error.reason, 'danger');
	}
});