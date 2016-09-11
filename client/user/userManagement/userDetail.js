Template.userDetail.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleUser', id);
		self.subscribe('userImage');
		self.subscribe('countryList');
	});
});
Template.userDetail.helpers({
	user: ()=> {
		var id = FlowRouter.getParam('id');
		return Meteor.users.findOne({_id: id});
	},
	firstLetter: function() {
		var id = FlowRouter.getParam('id');
		return _.str.truncate(Meteor.users.findOne({_id: id}).username, 1, ' ');
	},
	isSeller: function(){
		var id = FlowRouter.getParam('id');
		var isSeller = Meteor.users.findOne({_id: id, 'roles.__global_roles__': 'seller'});
		if (isSeller){
			return true;
		}
	},
	hasCompletedProfile: function(){
		var id = FlowRouter.getParam('id');
		var companyProfile = Meteor.users.findOne({'_id': id, 'profile.company.companyName': { $exists: true}, 'profile.company.companyPhone': { $exists: true}, 'profile.country.name.formattedAddress': { $exists: true}, 'profile.personalPhone.phoneVerification': true });
		if (companyProfile){
			return true;
		}
	},
	birthday: function(){
		var id = FlowRouter.getParam('id');
		var birthday = Meteor.users.findOne({_id: id}).profile.birthday;
		return moment(birthday).format("dddd, MMMM Do YYYY");
	},
	isBuyer: function(){
		var id = FlowRouter.getParam('id');
		var isBuyer = Meteor.users.findOne({_id: id, 'roles.__global_roles__': 'buyer'});
		if (isBuyer){
			return true;
		}
	},
	isAdmin: function(){
		var id = FlowRouter.getParam('id');
		var isAdmin = Meteor.users.findOne({_id: id, 'roles.__global_roles__': 'admin'});
		if (isAdmin){
			return true;
		}
	},
	isVerifiedSeller: function(){
		var id = FlowRouter.getParam('id');
		var isVerified = Meteor.users.findOne({_id: id, 'roles.__global_roles__': 'seller', 'verification': true});
		if (isVerified){
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
});

Template.userDetail.events({
	'click .verify-seller': function(){
		var id = FlowRouter.getParam('id');
		var verification = Meteor.users.findOne({_id: id}).verification;
		var name = Meteor.users.findOne({_id: id}).profile.firstname;
		var companyName = Meteor.users.findOne({_id: id}).profile.company.companyName;
        var email = Meteor.users.findOne({_id: id}).emails[0].address;
		Meteor.call('toggleVerification', id, verification, ( error ) => {
            // if ( error ) {
            //     Bert.alert( error.reason, 'danger' );
            // } else 
            if (verification === false) {
                var content = ( companyName + ' ' + 'is now Verified!');
                Bert.alert( content, 'success' );
            } else {
            	var contentI = ( companyName + ' ' + 'has been unverified!');
            	Bert.alert( contentI, 'danger' );
            }
        });
		if (verification === false){
            var data = {
            	name: name,
                companyName: companyName
            };
            var html = Blaze.toHTMLWithData(Template.verifySellerTemplate, data);
            Meteor.call('verifiedSellerEmail', email, html);
		}
	},
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