//this fixes the issue of callbacks when redirecting either when logging in or logging out
if (Meteor.isClient){
	Accounts.onLogin(function(){
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			// FlowRouter.go('profile');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			// FlowRouter.go('edit-seller-profile');
		} else if (Roles.userIsInRole(userId, ['admin'])) {
			FlowRouter.go('admin');
		} else {
			// FlowRouter.go('registration-type');
		}
	});
	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});
}


//ALL THE OTHER ROUTES FALL HERE
FlowRouter.route('/', {
	name: 'home',
	action(){
		// GAnalytics.pageview();
		BlazeLayout.render('homeLayout', { homely: 'home' });
	}
});
FlowRouter.route('/auctions', {
	name: 'auctions',
	action(){
		// GAnalytics.pageview();
		BlazeLayout.render('mainLayout', { main: 'auctions' });
	}
});
FlowRouter.route('/auction/:id', {
	name: 'auction-details',
	action(){
		// GAnalytics.pageview();
		BlazeLayout.render('mainLayout', { main: 'AuctionDetails' });
	}
});
FlowRouter.route('/deals', {
	name: 'deals',
	action(){
		// GAnalytics.pageview();
		BlazeLayout.render('mainLayout', { main: 'deals' });
	}
});
FlowRouter.route('/deal/:id', {
	name: 'deal-details',
	action(){
		// GAnalytics.pageview();
		BlazeLayout.render('mainLayout', { main: 'DealDetails' });
	}
});
FlowRouter.route('/recover-password', {
	name: 'recover-password',
	action(){
		// GAnalytics.pageview();
		BlazeLayout.render('homeLayout', { main: 'recoverPassword' });
	}
});
FlowRouter.route('/reset-password/:token', {
	name: 'reset-password',
	action(){
		// GAnalytics.pageview();
		BlazeLayout.render('mainLayout', { main: 'resetPassword' });
	}
});
FlowRouter.route('/admin', {
	name: 'admin',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'admin' });
	}
});
FlowRouter.route('/admin/users', {
	name: 'users',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'users' });
	}
});

FlowRouter.route('/admin/users/unverified-sellers', {
	name: 'unverified-sellers',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'unverifiedSellers' });
	}
});
FlowRouter.route('/admin/users/verified-sellers', {
	name: 'verified-sellers',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'verifiedSellers' });
	}
});
FlowRouter.route('/admin/users/buyers', {
	name: 'buyers',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'buyers' });
	}
});
FlowRouter.route('/admin/users/:id', {
	name: 'users-details',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'userDetail' });
	}
});
FlowRouter.route('/activity', {
	name: 'activity',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'activity' });
	}
});

//CART FUNCTIONALITY
FlowRouter.route('/cart', {
	name: 'cart',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['admin'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'cart' });
	}
});
FlowRouter.route('/confirmation', {
	name: 'confirmation',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['admin'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		//prevent a user from accessing a page if there is no value in the reservation
		var checkSession = Session.get('totalAmount');
		if (checkSession == null){
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'confirmation' });
	}
});

FlowRouter.route('/favourites', {
	name: 'favourites',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'favourites' });
	}
});


//SUPPORT
FlowRouter.route('/support', {
	name: 'support',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'support' });
	}
});
FlowRouter.route('/support/open', {
	name: 'support-open',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'supportOpen' });
	}
});
FlowRouter.route('/support/closed', {
	name: 'support-closed',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'supportClosed' });
	}
});
FlowRouter.route('/new-support', {
	name: 'new-support',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'newSupport' });
	}
});
FlowRouter.route('/new-support/:id', {
	name: 'new-user-support',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'newSupport' });
	}
});
FlowRouter.route('/support/:id', {
	name: 'single-support',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'singleSupport' });
	}
});



//COUNTRIES & CURRENCY
FlowRouter.route('/countries/:page?', {
	name: 'countries',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'countries' });
	}
});
FlowRouter.route('/currency-edit/:page?', {
	name: 'edit-currency',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'currencyEdit' });
	}
});
FlowRouter.route('/language', {
	name: 'language',
	action(){
		var userId = Meteor.userId();
		if(!Meteor.userId()){
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['admin'])) {
			FlowRouter.go('language');
		} else {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'language' });
	}
});
FlowRouter.route('/translation', {
	name: 'translation',
	action(){
		var userId = Meteor.userId();
		if(!Meteor.userId()){
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['admin'])) {
			FlowRouter.go('translation');
		} else {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'translation' });
	}
});
FlowRouter.route('/ongoing-bids', {
	name: 'ongoing-bids',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('profile');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'ongoingBids' });
	}
});
FlowRouter.route('/closed-bids', {
	name: 'closed-bids',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('profile');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'closedBids' });
	}
});
FlowRouter.route('/item-collection', {
	name: 'item-collection',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('profile');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'itemCollection' });
	}
});
FlowRouter.route('/registration-type', {
	name: 'registration-type',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['admin'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('mainLayout', { main: 'selectType' });
	}
});
FlowRouter.route('/edit-seller-profile', {
	name: 'edit-seller-profile',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('edit-profile');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'editCompanyProfile' });
	}
});
FlowRouter.route('/edit-profile', {
	name: 'edit-profile',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		//this makes sure that a user will have to be in a "role" to edit their profile details
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('edit-profile');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('edit-seller-profile');
		} else if (Roles.userIsInRole(userId, ['admin'])) {
			FlowRouter.go('edit-profile');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('edit-profile');
		} else {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'editProfile' });
	}
});

FlowRouter.route('/profile', {
	name: 'profile',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		//if the user hasnt verified their number they should be redirected back to number verification
		if(Meteor.users.findOne({_id: Meteor.userId()}).profile.personalPhone.phoneVerification === false){
			FlowRouter.go('verify-phone');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'profile' });
	}
});

FlowRouter.route('/locations', {
	name: 'locations',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'locations' });
	}
});

FlowRouter.route('/sub-user', {
	name: 'sub-user',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['admin'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'subUser' });
	}
});
FlowRouter.route('/sub-user/new', {
	name: 'new-sub-user',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['admin'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'newSubUser' });
	}
});
FlowRouter.route('/sub-user/invitations', {
	name: 'sub-user-invitations',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['admin'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'subUserInvitations' });
	}
});
FlowRouter.route('/sub-user/:id', {
	name: 'single-sub-user',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['admin'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'singleSubUser' });
	}
});
FlowRouter.route('/sub-user/register/:id', {
	name: 'sub-user-register',
	action(){
		if(Meteor.userId()){
			Meteor.logout();
		}
		// GAnalytics.pageview();
		BlazeLayout.render('mainLayout', { main: 'subUserRegister' });
	}
});


FlowRouter.route('/change-password', {
	name: 'change-password',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'changePassword' });
	}
});
FlowRouter.route('/change-phone', {
	name: 'change-phone',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'changePhone' });
	}
});
FlowRouter.route('/verify-phone', {
	name: 'verify-phone',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('mainLayout', { main: 'verifyPhone' });
	}
});
FlowRouter.route('/admin/new-auction', {
	name: 'new-auction',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'newAuction' });
	}
});
FlowRouter.route('/post-deal', {
	name: 'post-deal',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'newDeal' });
	}
});
FlowRouter.route('/admin/banners', {
	name: 'banner-edit',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'bannerManage' });
	}
});
FlowRouter.route('/admin/categories', {
	name: 'categories',
	action(){
		if(!Meteor.userId()){
			FlowRouter.go('home');
		}
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['buyer'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['seller'])) {
			FlowRouter.go('home');
		} else if (Roles.userIsInRole(userId, ['sub-user'])) {
			FlowRouter.go('home');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('userLayout', { main: 'categories' });
	}
});
FlowRouter.route('/search', {
	name: 'search',
	action(){
		// GAnalytics.pageview();
		BlazeLayout.render('mainLayout', { main: 'search' });
	}
});

FlowRouter.route('/register', {
	name: 'register',
	action(){
		if(Meteor.userId()){
			FlowRouter.go('profile');
		}
		// GAnalytics.pageview();
		BlazeLayout.render('mainLayout', { main: 'registrationOne' });
	}
});





//EMAILS
FlowRouter.route( '/verify-email/:token', {
	name: 'verify-email',
	action( params ) {
		Accounts.verifyEmail( params.token, ( error ) =>{
			if ( error ) {
				Bert.alert( error.reason, 'danger' );
			} else {
				FlowRouter.go( 'home' );
				Bert.alert( 'Email verified! Thanks!', 'success' );
			}
		});
	}
});
