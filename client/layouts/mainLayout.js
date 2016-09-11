Template.mainLayout.helpers({
    userIsDeactivated: function(){
        var currentUserId = Meteor.userId();
        var activeState = Meteor.users.findOne({_id: currentUserId}).active;
        if (activeState === false){
            return true;
        }
    }
});
Template.mainLayout.onRendered(function(){
    //adding the i18n functionality
    getUserLanguage = function () {
        // Put here the logic for determining the user language
        // if (!Meteor.userId()){
        //     return "en";
        // } else {
        //     return "no";
        // }
        return "no";
    };

    Session.set("userLanguage", getUserLanguage);
    TAPi18n.setLanguage(getUserLanguage())

})
