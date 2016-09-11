Template.editCompanyProfile.onCreated(function() {
	this.subscribe('countryList');
});
Template.editCompanyProfile.onRendered(function() {
	GoogleMaps.load({
  		key: 'AIzaSyC-o3gWc4wXZvMamAo5xBhtimaON8ASq78', 
  		libraries: 'geometry,places'
  	});
});
Template.editCompanyProfile.helpers ({
    currentUser: function () {
		return Meteor.user({_id: this.userId});
	},
	SellerCompleteProfile: function(){
		var me = Meteor.userId();
		var companyProfile = Meteor.users.findOne({'_id': me, 'profile.company.companyName': { $exists: true}, 'profile.company.companyPhone': { $exists: true}, 'profile.country.name': { $exists: true}, 'profile.country.city': { $exists: true} });
		if (!companyProfile){
			return true;
		}
	},
	isNotVerified: function () {
		var userId = Meteor.userId();
		var ver = Meteor.users.findOne({_id: userId}).verification;
		if (ver === false){
			return true;
		}
	},
	hasSubmitted: function () {
		var userId = Meteor.userId();
		var ver = Meteor.users.findOne({_id: userId}).submission;
		if (ver === true){
			return true;
		}
	},
	whyCompanyName: function(){
		return ('The company name is verified by Elbuso after a review. To change it you will have to make a request to do so with the Elbuso team')
	},
	whyCompanyReg: function(){
		return ('The company registration is verified by Elbuso after a review. This is the legal identifier for the company and may not be changed once verified')
	},
});


Template.editCompanyProfile.events ({
	'click .update-profile': function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	}
});


AutoForm.addHooks(['profileUpdateId'], {
	onSuccess: function(operation, result, template) {
		Bert.alert('your profile has been updated', 'success');
	}
});
AutoForm.addHooks(['profileUpdateId'], {
	onError: function(operation, result, template, error) {
		Bert.alert(error, 'danger');
	}
});