Meteor.subscribe("TestUsersData");
Meteor.call('eachBike');

Template.admin2layout.created = function() {
  // Default to all users view
  Session.set('ViewUsers', 0);
};

Template.admin2layout.helpers({
  admin2layout: function () {
    // Return all users in system
    if (Session.get('ViewUsers') === 0) {
      return TestUsers.find().fetch();
    } else {
      // Return only the clicked user:
      // return TestUsers.find({bike: 7}).fetch()[0]; // (i.e. findOne)
      return TestUsers.findOne({_id: Session.get('ViewUsers')});
    }
  },
  // Determing which view to return (true = all, false = single user)
  ViewUsersFunc: function () {
    if (Session.get('ViewUsers') === 0) {
      // console.log('True: ' + Session.get('ViewUsers'));
      return false;
    } else {
      // console.log('False: ' + Session.get('ViewUsers'));
      return true;
    }
  }
});

// open the particular users history
Template.admin2layout.events({
  'click .seeMore': function () {
    Session.set('ViewUsers', this._id);
  }
});
// Return to the main layout view
Template.admin2layout.events({
  'click .seeLess': function () {
    Session.set('ViewUsers', 0);
  }
});