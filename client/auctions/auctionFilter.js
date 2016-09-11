Template.auctionFilter.onCreated(function(){
    Session.setDefault("slider", [0, 100000]);
});
Template.auctionFilter.helpers({
    category: function(){
        var usedCategories = Auctions.find().map(function(categories){
            return categories.category;
        });
        return Categories.find({_id:{$in: usedCategories}});
    },
    count: function(){
        var count = Auctions.find({category: this._id}).count();
        var childrenId = Categories.find({parentCategory: this._id}).map(function(subCategory){
            return subCategory._id;
        });
        var childCount = Auctions.find({category: {$in: childrenId}}).count();
        var childrenSubId = Categories.find({parentCategory: {$in: childrenId}}).map(function(subSubCategory){
            return subSubCategory._id;
        });
        var childSubCount = Auctions.find({category: {$in: childrenSubId}}).count();

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
        var count = Auctions.find({category: this._id}).count();
        var childrenId = Categories.find({parentCategory: this._id}).map(function(subCategory){
            return subCategory._id;
        });
        var childCount = Auctions.find({category: {$in: childrenId}}).count();
        var childrenSubId = Categories.find({parentCategory: {$in: childrenId}}).map(function(subSubCategory){
            return subSubCategory._id;
        });
        var childSubCount = Auctions.find({category: {$in: childrenSubId}}).count();

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
      return Session.get("slider");
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
Template.auctionFilter.events({
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
Template.auctionFilter.onRendered(function(){
    this.$("#slider").noUiSlider({
        start: Session.get("slider"),
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
            Session.set('slider', val);
        }).on('change', function (ev, val) {
            // round off values on 'change' event
            Session.set('slider', [Math.round(val[0]), Math.round(val[1])]);
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

Template.filterSubCat.helpers({
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
        var count = Auctions.find({category: this._id}).count();
        var childrenId = Categories.find({parentCategory: this._id}).map(function(subCategory){
            return subCategory._id;
        });
        var childCount = Auctions.find({category: {$in: childrenId}}).count();

        if (count > 0){
            return count;
        } else if(childCount > 0){
            return childCount;
        } else {
            return 0;
        }
    },
    countExists: function(){
        var count = Auctions.find({category: this._id}).count();
        var childrenId = Categories.find({parentCategory: this._id}).map(function(subCategory){
            return subCategory._id;
        });
        var childCount = Auctions.find({category: {$in: childrenId}}).count();

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

Template.filterSubSubCat.helpers({
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
        return Auctions.find({category: this._id}).count();
    },
    countExists: function(){
        var count = Auctions.find({category: this._id}).count();
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
