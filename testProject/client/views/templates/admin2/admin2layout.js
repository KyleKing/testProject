Meteor.subscribe("TestUsersData");
Meteor.call('eachBike');

Template.admin2layout.helpers({
  admin2layout: function () {
    return TestUsers.find().fetch(); // (i.e. findOne)
    // return TestUsers.findOne();
    // return TestUsers.find({bike: 8}).fetch()[0]; // (i.e. findOne)
  }
});