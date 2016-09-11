Template.profile.rendered = function(){
    var element = $(".btn-success");
    var eLlement = $(".btn-primary");
    if(element.hasClass("submit-for-verification")){
        eLlement.addClass("dim-alittle"); 
    }

    // var elementTwo = $(".btn-default");
    // var eLlementTwo = $(".btn-primary");
    // if(elementTwo.hasClass("youve-submitted")){
    //     eLlementTwo.addClass("dim-alittle"); 
    // }
}
Template.profile.helpers({
	user: function() {
		var id = Meteor.userId();
		return Meteor.users.findOne({_id: id});
	},
	parentUser: function() {
		var id = Meteor.userId();
		var parentId = Meteor.users.findOne({_id: id}).profile.parentUser;
		return Meteor.users.findOne({_id: parentId});
	},
	firstLetter: function() {
		var id = Meteor.userId();
		return _.str.truncate(Meteor.users.findOne({_id: id}).username, 1, ' ');
	},
	isSeller: function(){
		var id = Meteor.userId();
		var isSeller = Meteor.users.findOne({_id: id, 'roles.__global_roles__': 'seller'});
		if (isSeller){
			return true;
		}
	},
	hasCompletedProfile: function(){
		var id = Meteor.userId();
		var user = Meteor.users.findOne({'_id': id});
		var companyProfile = Meteor.users.findOne({'_id': id, 'profile.company.companyName': { $exists: true}, 'profile.company.companyPhone': { $exists: true}, 'profile.country.name.formattedAddress': { $exists: true}, 'profile.personalPhone.phoneVerification': true });
		if (companyProfile && user.emails[0].verified){
			return true;
		}
	},
	birthday: function(){
		var id = Meteor.userId();
		var birthday = Meteor.users.findOne({_id: id}).profile.birthday;
		return moment(birthday).format("dddd, MMMM Do YYYY");
	},
	isBuyer: function(){
		var id = Meteor.userId();
		var isBuyer = Meteor.users.findOne({_id: id, 'roles.__global_roles__': 'buyer'});
		if (isBuyer){
			return true;
		}
	},
	isAdmin: function(){
		var id = Meteor.userId();
		var isAdmin = Meteor.users.findOne({_id: id, 'roles.__global_roles__': 'admin'});
		if (isAdmin){
			return true;
		}
	},
	isVerifiedSeller: function(){
		var id = Meteor.userId();
		var isVerified = Meteor.users.findOne({_id: id, 'roles.__global_roles__': 'seller', 'verification': true});
		if (isVerified){
			return true;
		}
	},
	hasNotSubmitted: function(){
		var id = Meteor.userId();
		var submission = Meteor.users.findOne({_id: id, 'roles.__global_roles__': 'seller'}).submission;
		if (!submission === true){
			return true;
		}
	},
	country: function() {
		var id = Meteor.userId();
        var countryId = Meteor.users.findOne({_id: id}).profile.country.name;
        return Countries.findOne({_id: countryId}).name;
	},
	isActive: function(){
		var id = Meteor.userId();
		var isActive = Meteor.users.findOne({_id: id}).active;
		if (isActive === true){
			return true;
		}
	},
});

Template.profile.events({
	'click .submit-for-verification': function (){
		var id = Meteor.userId();
		var submission = Meteor.users.findOne({_id: id}).submission;
		Meteor.call('submissionToggle', id, ( error ) => {
            if ( error ) {
                Bert.alert( error.reason, 'danger' );
            } else {
                var content = ( companyName + ' ' + 'has been submitted for verification');
                Bert.alert( content, 'success' );
            } 
        });
		// if (submission === false){
  //           var data = {
  //           	name: name,
  //               companyName: companyName
  //           };
  //           var html = Blaze.toHTMLWithData(Template.verifySellerTemplate, data);
  //           Meteor.call('verifiedSellerEmail', email, html);
		// }
	}
});