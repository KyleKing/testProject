Meteor.subscribe("TestUsersData");
Meteor.call('eachBike');

Template.admin3layout.created = function() {
  // Default to all users view
  Session.set('ViewUsers', 0);
};

// Use UI.registerHelper..
UI.registerHelper("formatDate", function(datetime, format) {
  var DateFormats = {
         short: "YYYY, MM, DD",
         // short: "DD MMMM - YYYY",
         long: "dddd DD.MM.YYYY HH:mm"
  };
  if (moment) {
    // can use other formats like 'lll' too
    format = DateFormats[format] || format;
    return moment(datetime).format(format);
  }
  else {
    return datetime;
  }
});

Template.admin3layout.helpers({
  admin3layout: function () {
    // Used for testing and direct access to second page
    // Session.set('ViewUsers', TimeSeries.findOne({bike: 1})._id);
    // Return all bikes in system
    if (Session.get('ViewUsers') === 0) {
      return TimeSeries.find().fetch();
    } else {
      // Return only the clicked bike:
      return TimeSeries.findOne({_id: Session.get('ViewUsers')}).positions;
      // .sort({'timestamp': 1});
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