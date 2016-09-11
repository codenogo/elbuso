Template.categoryItem.onCreated(function(){
	this.editMode = new ReactiveVar(false);
});
//find the ID of the specific banner item and use it in the variable "updateBannerId"
Template.categoryItem.helpers({
	updateCategoryId: function() {
		return this._id;
	},
	editMode: function(){
		return Template.instance().editMode.get();
	},
	subCategories: function(){
		return Categories.find({parentCategory: this._id },{ sort: { order: 1 }});
	},
	isRoot: function(){
		var rootParent = Categories.findOne({_id: this._id}).parentCategory;
		if (rootParent == "0"){
			return true;
		}
	},
	thirdLevel: function(){
		var thisParent = Categories.findOne({_id: this._id}).parentCategory;
		var parentParent = Categories.findOne({_id: thisParent}).parentCategory;
		var oldeParent = Categories.findOne({_id: parentParent}).parentCategory;
		if (oldeParent == "0"){
			return true;
		}
	},
	categoryOptions: function(){
		return {
			sortField: 'order',
			group: {
                name: 'category0',
                pull: true,
                put: true,
            },
            sort: true,
            onSort: function(event, sortable) {
                var moved = ('(#%d) has moved from %d to %d',
                    event.data.order, event.oldIndex, event.newIndex
                );
                var changedId = event.data._id;
                var changedName = event.data.name;
                var data = changedName + ' ' + moved;
                Bert.alert(data, 'success');
				console.log(this.options.group.name);
            }
        };
	},
	hasSubs: function(){
		if (Categories.find({parentCategory: this._id }).count() > 0){
			return true;
		}
	},
	isNotFixed: function(){
		var fixedState = Categories.findOne({_id: this._id}).isFixed;
		if (fixedState == false){
			return true;
		}
	}
});
Template.categoryItem.events({
	'click .delete-btn': function() {
		Meteor.call('deleteCategory', this._id);
	},
	'click .edit-btn': function(event, template) {
		template.editMode.set(!template.editMode.get());
	}
});

//this onRendered code is here so that once the specific category items are loaded the script can be executed. This retains the selected .active class state of the selected items when the reload is complete. Neat
Template.categoryItem.onRendered(function() {
	var reloadData = Session.get('CurrentSelection');
	var reloadSubData = Session.get('CurrentSubSelection');
	if (reloadData !== null){
		var theClass = ('.' + reloadData);
		$(theClass).addClass('active');
	}
	if (reloadSubData !== null){
		var theClass = ('.' + reloadSubData);
		$(theClass).addClass('active');
	}
});
