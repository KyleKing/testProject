// Return data for the html template
Template.timeseries.rendered = function() {
  return Meteor.subscribe("timeseriesData");
};

Template.timeseries.helpers({
  timeseries: function () {
    Session.set("currentBike", 4);
    return TimeSeries.findOne({Bike: Session.get("currentBike"), DD: 2});
  }
});