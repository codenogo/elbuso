//MAN THIS WAS A TOUGH SECTION!
Template.categories.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe( 'categories');
	});
	this.currentItemId = new ReactiveVar(null);
	this.currentSubItemId = new ReactiveVar(null);
});
Template.categories.helpers({
	categories: function(){
		return Categories.find({parentCategory: '0'},{ sort: { order: 1 }});
	},
	// subCategories: function(){
	// 	return Categories.find({parentCategory: {$ne:'0'}},{ sort: { order: 1 }});
	// },
	subCatData:function(){
		//check for the session if there was a reload after a list change of a category
		var reloadData = Session.get('CurrentSelection');
		// retrieve the reactive-var from the template instance...
	    var currentItemId = Template.instance().currentItemId.get();
		if (reloadData !== null){
			return (reloadData);
		} else {
			// ...to fetch the correct collection document from the reactive Variable
		    return (currentItemId);
		}
	},
	subSubCatData:function(){
		//check for the session if there was a reload after a list change of a category
		var reloadData = Session.get('CurrentSubSelection');
		// retrieve the reactive-var from the template instance...
	    var currentSubItemId = Template.instance().currentSubItemId.get();
		if (reloadData !== null){
			return (reloadData);
		} else {
			// ...to fetch the correct collection document from the reactive Variable
		    return (currentSubItemId);
		}
	},
	categoryOptions: function(){
		var currentItemId = Template.instance().currentItemId.get();
		var currentSubItemId = Template.instance().currentSubItemId.get();
		return {
			sortField: 'order',
			group: {
                name: "rootCategory",
                pull: true,
                put: true
            },
            sort: true,
			onSort: function(event) {
                var moved = ('(' + event.data.order + ') has moved from ' + event.oldIndex + ' to ' + event.newIndex);
                var changedId = event.data._id;
                var changedName = event.data.name;
                var data = changedName + ' ' + moved;
                // Bert.alert(data, 'success');
            },
			onAdd: function(event) {
                var id = event.data._id;
                var changedName = event.data.name;
				var newParentCat = event.data.parentCategory;
				var newParentName = Categories.findOne({_id: newParentCat}).name;
				var data = changedName + ' ' + 'is now a subcategory of ' + newParentName;
				Meteor.call('newCatRoot', id, function(error){
					if(error){
						Bert.alert(error.reason, 'danger');
					} else {
						Bert.alert(data, 'success');
					}
				});
				Meteor._reload.reload();
				Session.set( "CurrentSelection", currentItemId );
				Session.set( "CurrentSubSelection", currentSubItemId );
            }
        };
	}
});

//show and hide new category section
Template.categories.events({
	'click .new-banner-btn': ()=> {
		Session.set('newCategory', true);
	},
	'click .close-new': ()=> {
		Session.set('newCategory', false);
	},
	'click .has-children': function(event, template){
		event.preventDefault();
		var thisId = event.currentTarget.id;
		var theIdClass = ('.' + thisId);
	    // assign the correct item id to the reactive-var attached to this template instance
		var catIsntRoot = Categories.findOne({_id: thisId, parentCategory: {$ne:'0'}});
		if (catIsntRoot){
			//if the selection is a sub category then they will only remove the class of 'active' from the sub-category template
			$('.sub-one.active').removeClass('active');
			$(theIdClass).addClass('active');
			Session.set( "CurrentSubSelection", null );
			template.currentSubItemId.set(thisId);
		} else {
			//if teh selection is a root category then the changes will affect all global selections
			$('.active').removeClass('active');
			$(theIdClass).addClass('active');
			Session.set( "CurrentSelection", null );
			Session.set( "CurrentSubSelection", null );
			template.currentItemId.set(thisId);
			template.currentSubItemId.set(null);
		}

	},

});
