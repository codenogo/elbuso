Template.singleBanner.onCreated(function(){
	this.editMode = new ReactiveVar(false);
});
//find the ID of the specific banner item and use it in the variable "updateBannerId"
Template.singleBanner.helpers({
	updateBannerId: function() {
		return this._id;
	},
	editMode: function(){
		return Template.instance().editMode.get();
	}
});
Template.singleBanner.events({
	//toggle published state
	'click .toggle-menu': function(){
		Meteor.call('toggleShowing', this._id, this.isPublished);
	},
	'click .delete-btn': function() {
		var id = this._id;
		var imageId = Banners.findOne({_id: id}).image;
		Meteor.call('deleteBanner', id, imageId);
	},
	'click .edit-btn': function(event, template) {
		template.editMode.set(!template.editMode.get());
	}
});