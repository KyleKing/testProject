Meteor.publish("bikesData", function() {
  return Bikes.find();
});

Meteor.publish("timeseriesData", function() {

  var pipeline = [
    {$match: {bike: 4}},
    {$group: {_id : "$position.timestamp"} }
  ];
  var TestResult = TimeSeries.aggregate(pipeline);
  // console.log("TestResult");
  // console.log(TestResult);

  // information needs to be the lowercase version from the collection, not the Meteor version
  this.added('information', Random.id(), {email: 'Kyle@email.com', userId: this.userId, data: TestResult[0]._id });
});

Meteor.publish("currentData", function() {
  return Current.find();
});


Meteor.publish("BarChartData", function() {
  return BarChart.find();
});
Meteor.publish("AdminBarChartData", function() {
  return AdminBarChart.find();
});
Meteor.publish("AdminAreaChartData", function() {
  return AdminAreaChart.find();
});