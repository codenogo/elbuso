Template.dealsFilter.onCreated(function(){
    Session.setDefault("dealSlider", [0, 100000]);
});
Template.dealsFilter.helpers({
    category: function(){
        var usedCategories = Deals.find().map(function(categories){
            return categories.category;
        });
        return Categories.find({_id:{$in: usedCategories}});
    },
    count: function(){
        var count = Deals.find({category: this._id}).count();
        var childrenId = Categories.find({parentCategory: this._id}).map(function(subCategory){
            return subCategory._id;
        });
        var childCount = Deals.find({category: {$in: childrenId}}).count();
        var childrenSubId = Categories.find({parentCategory: {$in: childrenId}}).map(function(subSubCategory){
            return subSubCategory._id;
        });
        var childSubCount = Deals.find({category: {$in: childrenSubId}}).count();

        if (count > 0){
            return count;
        } else if(childCount > 0){
            return childCount;
        } else if(childSubCount > 0){
            return childSubCount;
        } else {
            return 0;
        }
    },
    countExists: function(){
        var count = Deals.find({category: this._id}).count();
        var childrenId = Categories.find({parentCategory: this._id}).map(function(subCategory){
            return subCategory._id;
        });
        var childCount = Deals.find({category: {$in: childrenId}}).count();
        var childrenSubId = Categories.find({parentCategory: {$in: childrenId}}).map(function(subSubCategory){
            return subSubCategory._id;
        });
        var childSubCount = Deals.find({category: {$in: childrenSubId}}).count();

        if (count > 0){
            return true;
        } else if(childCount > 0){
            return true;
        } else if(childSubCount > 0){
            return true;
        } else {
            return false;
        }
    },
    slider: function () {
      return Session.get("dealSlider");
    },
    thisId: function(){
        return this._id;
    },
    rootCategory: function(){
        return Categories.find({parentCategory: '0'});
    },
    hasSubCat: function(){
        var catChildren = Categories.find({parentCategory: this._id}).count();
        if (catChildren > 0){
            return true;
        }
    },
});
Template.dealsFilter.events({
    'click .has-children': function(event, template){
		event.preventDefault();
		var thisId = event.currentTarget.id;
        //toggle the hidden class of the submenu
		var theIdClass = ('.clickable-list#' + thisId);
	    $(theIdClass).toggleClass('hidden');
        //toggle the arrow classes
        var theArrow = ('.has-children#' + thisId);
	    $(theArrow).toggleClass('arrow-down');
        $(theArrow).toggleClass('arrow-right');
	},
});
Template.dealsFilter.onRendered(function(){
    this.$("#slider").noUiSlider({
        start: Session.get("dealSlider"),
        connect: true,
        step: 10,
        margin: 1000,
        behaviour: 'tap-drag',
        range: {
            'min': 0,
            'max': 100000
        },
        pips: {
            mode: 'range',
            density: 3
        },
        }).on('slide', function (ev, val) {
            // set real values on 'slide' event
            Session.set('dealSlider', val);
        }).on('change', function (ev, val) {
            // round off values on 'change' event
            Session.set('dealSlider', [Math.round(val[0]), Math.round(val[1])]);
        });
});



///
//
//
//
//
//
//
//
//

Template.dealSubCat.helpers({
    subCategory: function(){
        var thisParent = Template.instance().data;
        return Categories.find({parentCategory: thisParent});
    },
    hasSubCat: function(){
        var catChildren = Categories.find({parentCategory: this._id}).count();
        if (catChildren > 0){
            return true;
        }
    },
    count: function(){
        var count = Deals.find({category: this._id}).count();
        var childrenId = Categories.find({parentCategory: this._id}).map(function(subCategory){
            return subCategory._id;
        });
        var childCount = Deals.find({category: {$in: childrenId}}).count();

        if (count > 0){
            return count;
        } else if(childCount > 0){
            return childCount;
        } else {
            return 0;
        }
    },
    countExists: function(){
        var count = Deals.find({category: this._id}).count();
        var childrenId = Categories.find({parentCategory: this._id}).map(function(subCategory){
            return subCategory._id;
        });
        var childCount = Deals.find({category: {$in: childrenId}}).count();

        if (count > 0){
            return true;
        } else if(childCount > 0){
            return true;
        } else {
            return false;
        }
    },
    thisId: function(){
        return this._id;
    },
});

///
//
//
//
//
//
//
//
//

Template.dealSubSubCat.helpers({
    subCategory: function(){
        var thisParent = Template.instance().data;
        return Categories.find({parentCategory: thisParent});
    },
    hasSubCat: function(){
        var catChildren = Categories.find({parentCategory: this._id}).count();
        if (catChildren > 0){
            return true;
        }
    },
    count: function(){
        return Deals.find({category: this._id}).count();
    },
    countExists: function(){
        var count = Deals.find({category: this._id}).count();
        if (count > 0){
            return true;
        } else {
            return false;
        }
    },
    thisId: function(){
        return this._id;
    },
});
