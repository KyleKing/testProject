Meteor.subscribe("TestUsersData");
Meteor.call('eachBike');
// Meteor.subscribe("TestUsersDataSorted");

Template.admin3layout.created = function() {
  // Default to all users view
  Session.set('ViewUsers', 0);
};

Template.admin3layout.helpers({
  admin3layout: function () {
    // Used for testing and direct access to second page
    // Session.set('ViewUsers', TimeSeries.findOne({bike: 1})._id);
    // Return all bikes in system
    if (Session.get('ViewUsers') === 0) {
      // var data = TimeSeries.find({day: 71}).fetch();
      var data = TimeSeries.find().fetch();
      return _.sortBy(data, "bike");
    } else {
      // Return only the clicked bike:
      var bikeData = TimeSeries.findOne({_id: Session.get('ViewUsers')}).positions;
      return _.sortBy(bikeData, "timestamp").reverse();
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
Template.admin3layout.events({
  'click .seeMore': function () {
    Session.set('ViewUsers', this._id);
  }
});
// Return to the main layout view
Template.admin3layout.events({
  'click .seeLess': function () {
    Session.set('ViewUsers', 0);
  }
});