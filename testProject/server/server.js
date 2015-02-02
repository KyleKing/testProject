Meteor.publish("bikesData", function() {
  return Bikes.find();
});

Meteor.publish("timeseriesData", function() {
  return TimeSeries.find();
});