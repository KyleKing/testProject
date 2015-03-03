Meteor.subscribe("bikesData");

Template.bikesList.helpers({
  bikes: function () {
    // this helper returns a cursor of
    // all of the posts in the collection
    return Bikes.find({bike: 1}).fetch().updates;
  }
});