Template.subCategories.helpers({
	subCategories: function(){
		var parentCat = Template.instance().data;
		return Categories.find({parentCategory: parentCat},{ sort: { order: 1 }});
	},
	parentName: function(){
		var parentCat = Template.instance().data;
		return Categories.findOne({_id: parentCat}).name;
	},
	isNull: function(){
		var parentCat = Template.instance().data;
		if (parentCat == null){
			return true;
		}
	},
	noChild: function(){
		var parentCat = Template.instance().data;
		var count = Categories.find({parentCategory: parentCat}).count();
		if (count == 0){
			return true;
		}
	},
	subCategoryOptions:function(){
		//fetch the data (which in this case is the ID of the selected category) and use that as the parent Category
		var parentCategory = Template.instance().data;
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
				//the ID of the category being moved
                var id = event.data._id;
				//the name of the category being moved
                var changedName = event.data.name;
				//Call the meteor method that changes the parent category of a category to that of the list it has been moved to
				Meteor.call('parentCatChange', id, parentCategory, function(error){
					var newParentName = Categories.findOne({_id: parentCategory}).name;
					if (error){
						Bert.alert(error.reason, 'danger');
					} else {
						var content = (changedName + ' ' + 'is now a subcategory of ' + newParentName);
		                Bert.alert(content, 'success');
					}
				});
				Meteor._reload.reload();
				Session.set( "CurrentSelection", parentCategory );
				Session.set( "CurrentSubSelection", null );
            }
		}
	}
});
