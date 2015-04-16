Template.signUp.events = {
  'submit form': function(event) {
    event.preventDefault();
    if (!$('form#signup').parsley().validate())
      return;

    $('#signup').hide();
    $('#waiting').show();

    var newUserAttr = {
      username: $('#username').val(),
      password: $('#password').val(),
      firstName: $('#firstname').val(),
      lastName: $('#lastname').val(),
      email: $('#email').val(),
    };

    Meteor.call('signupUser', newUserAttr, function (error) {
      $('#waiting').hide();
      $('#signup').show();
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
      $('#username').prop('disabled','disabled');
      $('#password').prop('disabled','disabled');
      $('#firstname').prop('disabled','disabled');
      $('#lastname').prop('disabled','disabled');
      $('#email').prop('disabled','disabled');
      $('#showpublic').prop('disabled','disabled');
    });
  }
};
