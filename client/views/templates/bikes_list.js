Template.bikesList.helpers({
  bikes: function() {
    return Bikes.find();
  }
});