Meteor.publish('bikesData', function() {
  return Bikes.find();
});