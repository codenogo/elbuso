Meteor.startup(function() {
  Meteor.setTimeout(function() {
    // if users database is empty, seed these values
    if(Meteor.users.find().count() < 1) {
      // users array
      var users = [
        { username: 'superadmin', firstname: 'superadmin', email: 'admin@elbuso.com', password: 'admin123', roles: ['admin'], verification: true, personalPhone: '712345678', countryCode: '47' }
      ];
      // user creation
      _.each(users, function(d) {
        // return id for use in roles assignment below
        var userId = Accounts.createUser({
          email: d.email,
          password: d.password,
          username: d.username,
          verification: d.verification,
          active: true,
          profile: {
            buyerType: 'individual',
            firstname: d.firstname,
            personalPhone: {
              countryCode: d.countryCode,
              phoneNumber: d.personalPhone,
              phoneVerification: true
            },
            company: {
              companyName: '0'
            },
            parentUser: '0'
          }
        });
        // verify user email
        Meteor.users.update({ _id: userId }, { $set: { 'emails.0.verified': true } });
        // add roles to user
        Roles.addUsersToRoles( userId, ['admin'], Roles.GLOBAL_GROUP);
      });
    }
  }, 60);
});