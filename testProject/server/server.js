Meteor.publish("bikesData", function() {
  return Bikes.find();
});

Meteor.publish("timeseriesData", function() {
  return TimeSeries.find();
});

Meteor.publish("currentData", function() {
  return Current.find();
});


Meteor.publish("BarChartData", function() {
  return BarChart.find();
});