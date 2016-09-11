Template.categoryEdit.helpers({
	lastOne: function(){
		var parentCategory = AutoForm.getFieldValue('parentCategory', 'insertCategoriesForm');
		var count = Categories.find({parentCategory: parentCategory}).count();
		return (count + 1);
	},
	// lastOne: function(){
	// 	var count = Categories.find({}).count();
	// 	return (count + 1);
	// }
});
AutoForm.addHooks(['insertCategoriesForm'], {
	onSuccess: function(operation, result, template) {
		Session.set('newCategory', false);
		var categoryName = Categories.findOne({_id: result}).name;
		var content = ('The category ' + ' ' +categoryName + ' ' + 'has been added.');
		Bert.alert(content, 'success');
	}
});
