Meteor.subscribe("RFIDdataPublication");

Template.RFIDlayout.created = function() {
  // Default to all users view
  Session.set('ViewUsers', 0);
};

Template.RFIDlayout.helpers({
  RFIDlayout: function () {
    // Used for testing and direct access to second page
    // Session.set('ViewUsers', TimeSeries.findOne({bike: 1})._id);
    // Return all bikes in system
    if (Session.get('ViewUsers') === 0) {
      return TimeSeries.find().fetch();
    } else {
      // Return only the clicked bike:
      var bikeData = TimeSeries.findOne({_id: Session.get('ViewUsers')}).positions;
      return _.sortBy(bikeData, "timestamp").reverse();
    }
  }
});