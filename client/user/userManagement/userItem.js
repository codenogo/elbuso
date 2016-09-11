Template.userItem.helpers({
	firstLetter: function() {
		var selfId = this._id;
		return _.str.truncate(Meteor.users.findOne({_id: selfId}).profile.firstname, 1, ' ');
	},
	isSeller: function(){
		var selfId = this._id;
		var isSeller = Meteor.users.findOne({_id: selfId, 'roles.__global_roles__': 'seller'});
		if (isSeller){
			return true;
		}
	},
	isVerifiedSeller: function(){
		var selfId = this._id;
		var isVerified = Meteor.users.findOne({_id: selfId, 'roles.__global_roles__': 'seller', 'verification': true});
		if (isVerified){
			return true;
		}
	},
	isActive: function(){
		var id = this._id;
		var isActive = Meteor.users.findOne({_id: id}).active;
		if (isActive === true){
			return true;
		}
	},
});