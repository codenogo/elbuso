//allow for indexing of the Deals collection
Deals._ensureIndex( { name: 1} );
//allow for indexing of the Auctions collection
Auctions._ensureIndex( { name: 1} );


// search
SearchSource.defineSource('auctions', function(searchText, options) {
    var userId = Meteor.userId();
    var userRole = Meteor.users.findOne({_id: userId}).roles.__global_roles__;

    var options = {sort: {isoScore: -1}, limit: 20};
    if(searchText) {
        var regExp = buildRegExp(searchText);
        var selector = {name: regExp};
        // return Auctions.find(selector, options).fetch();
        if (userRole == 'admin') {
            return Auctions.find(selector, options).fetch();
        } else if (userRole == 'seller') {
            return Auctions.find(selector, {isOpen: true, isPublished: true}, options).fetch();
        } else if (userRole == 'sub-user') {
            var parentUser = Meteor.users.findOne({_id: userId}).profile.parentUser;
            return Auctions.find(selector, {isOpen: true, isPublished: true}, options).fetch();
        } else if (userRole == 'buyer') {
            return Auctions.find(selector, {bidding:false, isOpen: true, isPublished: true}, options).fetch();
        } else if (!userId) {
            return Auctions.find(selector, {bidding:false, isOpen: true, isPublished: true}, options).fetch();
        } else {
            return Auctions.find(selector, {bidding:false, isOpen: true, isPublished: true}, options).fetch();
        }
    } else {
        // return Auctions.find({}, options).fetch();
        if (userRole == 'admin') {
            return Auctions.find({}, options).fetch();
        } else if (userRole == 'seller') {
            return Auctions.find({isOpen: true, isPublished: true}, options).fetch();
        } else if (userRole == 'sub-user') {
            var parentUser = Meteor.users.findOne({_id: userId}).profile.parentUser;
            return Auctions.find({isOpen: true, isPublished: true}, options).fetch();
        } else if (userRole == 'buyer') {
            return Auctions.find({bidding:false, isOpen: true, isPublished: true}, options).fetch();
        } else if (!userId) {
            return Auctions.find({bidding:false, isOpen: true, isPublished: true}, options).fetch();
        } else {
            return Auctions.find({bidding:false, isOpen: true, isPublished: true}, options).fetch();
        }
    }
});













SearchSource.defineSource('deals', function(searchText, options) {
    var userId = Meteor.userId();
    var userRole = Meteor.users.findOne({_id: userId}).roles.__global_roles__;

    var options = {sort: {isoScore: -1}, limit: 20};
    if(searchText) {
        var regExp = buildRegExp(searchText);
        var selector = {name: regExp};
        // return Deals.find(selector, options).fetch();
        // if (userRole == 'admin') {
            return Deals.find(selector, options).fetch();
        // } else if (userRole == 'seller') {
        //     return Deals.find(selector, options).fetch();
        // } else if (userRole == 'sub-user') {
        //     var parentUser = Meteor.users.findOne({_id: userId}).profile.parentUser;
        //     return Deals.find(selector, {published: true}, options).fetch();
        // } else if (userRole == 'buyer') {
        //     return Deals.find(selector, {published: true}, options).fetch();
        // } else if (!userId) {
        //     return Deals.find(selector, {published: true}, options).fetch();
        // } else {
        //     return Deals.find(selector, {published: true}, options).fetch();
        // }
    } else {
        // return Deals.find({}, options).fetch();
        // if (userRole == 'admin') {
            return Deals.find(options).fetch();
        // } else if (userRole == 'seller') {
        //     return Deals.find({}, options).fetch();
        // } else if (userRole == 'sub-user') {
        //     var parentUser = Meteor.users.findOne({_id: userId}).profile.parentUser;
        //     return Deals.find({published: true}, options).fetch();
        // } else if (userRole == 'buyer') {
        //     return Deals.find({published: true}, options).fetch();
        // } else if (!userId) {
        //     return Deals.find({published: true}, options).fetch();
        // } else {
        //     return Deals.find({published: true}, options).fetch();
        // }
    }
});








function buildRegExp(searchText) {
  var words = searchText.trim().split(/[ \-\:]+/);
  var exps = _.map(words, function(word) {
    return "(?=.*" + word + ")";
  });
  var fullExp = exps.join('') + ".+";
  return new RegExp(fullExp, "i");
}
