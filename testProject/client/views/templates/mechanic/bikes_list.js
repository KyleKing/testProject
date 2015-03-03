Meteor.subscribe("bikesData");

Template.bikesList.created = function() {
  // Default to all users view
  Session.set('BikeNumber', 1);
};

Template.bikesList.events({
    'submit form': function(event){
    event.preventDefault();
    var BikeNumber = parseInt(event.target.BikeNumber.value);
    Session.set('BikeNumber', BikeNumber);
    console.log(_.isString(BikeNumber));
    }
});

Template.bikesList.helpers({
  bikes: function () {
    if (Bikes.findOne({bike: 1})) {
      // this helper returns a cursor of all of the posts in the collection
      var bikeData = Bikes.findOne({bike: Session.get('BikeNumber')}).updates;
      return _.sortBy(bikeData, "timestamp").reverse();
    }
  }
});