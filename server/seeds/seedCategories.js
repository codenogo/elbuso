// Meteor.startup(function() {
//   Meteor.setTimeout(function() {
//     // if categories database is empty, seed these values
//     if(Categories.find().count() < 1) {
//       // users array
//       var categories = [
//         { name: 'main', rate: 1, order: 0, parentCategory: '0', isChild: false, isFixed: true }
//       ];
//       // user creation
//       _.each(categories, function(cat) {
//         // return id for use in roles assignment below
//         Categories.insert({ 
//           name: cat.name,
//           rate: cat.rate,
//           order: cat.order,
//           parentCategory: cat.parentCategory,
//           isChild: cat.isChild,
//           isFixed: cat.isFixed
//         });
//       });
//     }
//   }, 60);
// });