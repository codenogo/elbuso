Template.dealStepOne.onCreated(function(){
    var self = this;
	this.rootCatId = new ReactiveVar(null);
	this.subCatId = new ReactiveVar(null);
    this.subSubCatId = new ReactiveVar(null);
    Session.set( "selectedCat", null );
});
Template.dealStepOne.helpers({
    rootCategory: function(){
        return Categories.find({parentCategory: '0'});
    },
    noRootSelected: function(){
        var selectState = Template.instance().rootCatId.get();
        if (selectState !== null){
            return true;
        }
    },
    rootCatId: function(){
        return Template.instance().rootCatId.get();
    },
    subCategory: function(){
        var rootCatId = Template.instance().rootCatId.get();
        return Categories.find({parentCategory: rootCatId});
    },
    subSelected: function(){
        var selectState = Template.instance().subCatId.get();
        if (selectState !== null){
            return true;
        }
    },
    subSubCategory: function(){
        var subCatId = Template.instance().subCatId.get();
        return Categories.find({parentCategory: subCatId});
    },
    currentSelection: function(){
        var selectedId = Session.get('selectedCat');
        return Categories.findOne({_id: selectedId}).name;
    },
    hasChildren: function(){
        var selectedId = Session.get('selectedCat');
		if (Categories.find({parentCategory: selectedId }).count() > 0){
			return true;
		} else if(selectedId == null){
            return true;
        } else {
            return false;
        }
	},
});

Template.dealStepOne.events({
    'click .single-cat': function(event, template){
        event.preventDefault();
		var thisId = event.currentTarget.id;
		var theIdClass = ('#' + thisId);
        var subCatId = Template.instance().subCatId.get();
        var rootCatId = Template.instance().rootCatId.get();
	    // assign the correct item id to the reactive-var attached to this template instance
		var catIsRoot = Categories.findOne({_id: thisId, parentCategory: '0'});
        var catIsSub =  Categories.findOne({_id: thisId, parentCategory: rootCatId});
        var catIsSubSub =  Categories.findOne({_id: thisId, parentCategory: subCatId});

		if (catIsSub){
			//if the selection is a sub category then they will only remove the class of 'active-select' from the sub-category template
			$('.sub-one.active-select').removeClass('active-select');
			$(theIdClass).addClass('active-select');
			template.subCatId.set(thisId);
            Session.set( "selectedCat", thisId );
		} else if(catIsSubSub){
            //if the selection is a sub-sub category then they will only remove the class of 'active-select' from the sub-category template
			$('.sub-two.active-select').removeClass('active-select');
			$(theIdClass).addClass('active-select');
			template.subSubCatId.set(thisId);
            Session.set( "selectedCat", thisId );
        } else if(catIsRoot) {
			//if the selection is a root category then the changes will affect all global selections
			$('.active-select').removeClass('active-select');
			$(theIdClass).addClass('active-select');
			template.rootCatId.set(thisId);
			template.subCatId.set(null);
            template.subSubCatId.set(null);
            Session.set( "selectedCat", thisId );
		}
    }
});
