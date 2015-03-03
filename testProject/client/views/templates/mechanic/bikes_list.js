Meteor.subscribe("bikesData");

Template.bikesList.helpers({
  bikes: function () {
    if (Bikes.findOne({bike: 1})) {
      Session.set('BikeNumber', 1);
      // this helper returns a cursor of all of the posts in the collection
      var bikeData = Bikes.findOne({bike: Session.get('BikeNumber')}).updates;
      return _.sortBy(bikeData, "timestamp").reverse();
    }
  }
});