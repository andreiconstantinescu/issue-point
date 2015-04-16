Meteor.methods ({
  singupUser: function (opts) {
    opts = _.pick(opts, 'username, password, firstName, lastName, email');
    var emailRegxp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegxp.test(opts.username))
      throw new Meteor.Error(403, 'Username must be 3-30 characters.');

    if (opts.password.length < 6 || opts.password.length > 32)
      throw new Meteor.Error(403, 'Password must be 3-32 characters.');

    if (opts.firstName.length < 6 || opts.firstName.length > 32)
      throw new Meteor.Error(403, 'First Name must be 3-32 characters.');

    if (opts.lastName.length < 6 || opts.lastName.length > 32)
      throw new Meteor.Error(403, 'Last Name must be 3-32 characters.');

    if (opts.email.length > 256)
      throw new Meteor.Error(403, 'Email must be lower than 256 characters.');

  var newUser = Accounts.createUser ({
    username: opts.username,
    password: opts.password,
    email: opts.email,
    profile: {
      firstName: opts.firstName,
      lastName: opts.lastName
    }
  });
  return true;
  }
});
