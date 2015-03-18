// Login Demo - Famous Dead People Package
Meteor.subscribe("users");

Template.registerHelper('userList', function(){
  return Meteor.users.find();
});