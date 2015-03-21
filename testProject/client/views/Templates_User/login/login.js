// Login Demo - Famous Dead People Package
Meteor.subscribe("users");

Template.registerHelper('userList', function(){
  return Meteor.users.find();
});

Template.login.rendered = function() {
    $('#sandbox-container .input-group.date').datepicker({
        todayHighlight: true,
        toggleActive: true
    });
}