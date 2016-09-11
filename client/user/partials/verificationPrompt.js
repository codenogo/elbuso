Template.verificationPrompt.rendered = function(){
    var element = $(".menufy-main-content");
    if(!element.hasClass("alert-exists")){
        element.addClass("alert-exists"); 
    }
}
Template.verificationPrompt.helpers({
	SellerCompleteProfile: function(){
		var me = Meteor.userId();
		var companyProfile = Meteor.users.findOne({'_id': me, 'profile.company.companyName': { $exists: true}, 'profile.company.companyPhone': { $exists: true}, 'profile.country.name.formattedAddress': { $exists: true} });
		if (!companyProfile){
			return true;
		}
	},
	submitted: function(){
		var id = Meteor.userId();
		var submission = Meteor.users.findOne({_id: id}).submission;
		if (submission == true){
			return true;
		}
	},
	approved: function(){
		var id = Meteor.userId();
		var submission = Meteor.users.findOne({_id: id}).verification;
		if (submission == true){
			return true;
		}
	}
});