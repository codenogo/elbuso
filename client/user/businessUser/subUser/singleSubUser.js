Template.singleSubUser.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleUser', id);
		self.subscribe('userImage');
		self.subscribe('countryList');
	});
});
Template.singleSubUser.helpers({
	user: ()=> {
		var id = FlowRouter.getParam('id');
		return Meteor.users.findOne({_id: id});
	},
	firstLetter: function() {
		var id = FlowRouter.getParam('id');
		return _.str.truncate(Meteor.users.findOne({_id: id}).username, 1, ' ');
	},
	isListing: function(){
		var id = FlowRouter.getParam('id');
		var isAdmin = Meteor.users.findOne({_id: id, 'roles.__global_roles__': 'listing'});
		if (isAdmin){
			return true;
		}
	},
	country: function() {
		var id = FlowRouter.getParam('id');
        var countryId = Meteor.users.findOne({_id: id}).profile.country.name;
        return Countries.findOne({_id: countryId}).name;
	},
	isActive: function(){
		var id = FlowRouter.getParam('id');
		var isActive = Meteor.users.findOne({_id: id}).active;
		if (isActive === true){
			return true;
		}
	},
	isMe: function(){
		var id = FlowRouter.getParam('id');
		var userId = Meteor.userId();
		if (id == userId){
			return true;
		}
	}
});

Template.singleSubUser.events({
	'click .deactivate-user': function(){
		var id = FlowRouter.getParam('id');
		var active = Meteor.users.findOne({_id: id}).active;
		var name = Meteor.users.findOne({_id: id}).profile.firstname;
        var email = Meteor.users.findOne({_id: id}).emails[0].address;
		Meteor.call('deactivate', id, active, ( error ) => {
            // if ( error ) {
            //     Bert.alert( error.reason, 'danger' );
            // } else 
            if (active === true) {
                var content = ( name + ' ' + 'has been deactivated!');
                Bert.alert( content, 'danger' );
            } else {
            	var contentI = ( name + ' ' + 'has been re-activated!');
                Bert.alert( contentI, 'success' );
            }
        });
		if (active === true){
            var data = {
            	name: name,
            };
            var html = Blaze.toHTMLWithData(Template.deactivateUserTemplate, data);
            Meteor.call('deactivateUserEmail', email, html);
		} else {
			var data = {
            	name: name,
            };
            var html = Blaze.toHTMLWithData(Template.activateUserTemplate, data);
            Meteor.call('activateUserEmail', email, html);
		}
	},
	'click .delete-user': function(){
		var id = FlowRouter.getParam('id');
		var imageId = Meteor.users.findOne({_id: id}).image;
		var file = UserImage.findOne({_id: imageId});
		Meteor.call('deleteUser', id, imageId);
	}
});