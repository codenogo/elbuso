Template.subUserItem.helpers({
	firstLetter: function() {
		var selfId = this._id;
		return _.str.truncate(Meteor.users.findOne({_id: selfId}).username, 1, ' ');
	},
	isActive: function(){
		var id = this._id;
		var isActive = Meteor.users.findOne({_id: id}).active;
		if (isActive === true){
			return true;
		}
	},
});