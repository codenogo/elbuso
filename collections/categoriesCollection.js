Categories = new Mongo.Collection('categories');
// Schemas = {};
Categories.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});


CategoriesSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'category name'
  },
  rate:{
    type: Number,
    label: "redeem rate for this category",
    min: 1,
    max: 99
  },
  order: {
    type: Number,
    optional: true,
    autoform: {
      type: "hidden"
    },
  },
  parentCategory: {
    type: String,
    optional: true,
    defaultValue: '0',
    autoform: {
      type: 'universe-select',
      afFieldInput: {
      },
      options: function () {
        var options = [];
        Categories.find({}, { sort: { order: 1 }}).forEach(function (category) {
          var categoryId = category._id;
          var categoryName = category.name;
          options.push({
            label: categoryName,
            value: categoryId
          })
        });
        return options;
      }
    }
  },
  isChild: {
    type: Boolean,
    defaultValue: false,
    autoform: {
      type: "hidden"
    },
  },
  isFixed: {
    type: Boolean,
    defaultValue: false,
    autoform: {
      type: "hidden"
    },
  },
  author: {
    type: String,
    label: "Author",
    autoValue: function() {
      if (this.isInsert) {
        return this.userId
      } else if (this.isUpsert) {
        return {$setOnInsert: this.userId};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
    autoform: {
      type: "hidden"
    },
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
    autoform: {
      type: "hidden"
    },
    optional: true,
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
});

Meteor.methods({
    deleteCategory: function(id){
        Categories.remove(id);
    },
    newCatRoot: function(id){
        check(id, String);
        Categories.update(id, {
            $set: {
                parentCategory: '0'
            }
        });
    },
    parentCatChange: function(id, parentCategory){
        check(id, String);
        check(parentCategory, String);
        Categories.update(id, {
            $set: {
                parentCategory: parentCategory
            }
        });
    }
});

Categories.attachSchema(CategoriesSchema);
