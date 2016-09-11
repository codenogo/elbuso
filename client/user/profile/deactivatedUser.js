Template.deactivatedUser.helpers({
    isDeactivated: function(){
        var currentUserId = Meteor.userId();
        var activeState = Meteor.users.findOne({_id: currentUserId}).active;
        if (activeState === false){
            return true;
        }
    }
});