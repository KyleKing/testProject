Meteor.subscribe("bikesData");

Template.bikesList.created = function() {
  // Default to all users view
  Session.set('BikeNumber', 1);
};

Template.bikesList.events({
    'submit form': function(event){
    event.preventDefault();
    var BikeNumber = event.target.BikeNumber.value;
    Session.set('BikeNumber', BikeNumber);
    }
});

Template.bikesList.helpers({
  bikes: function () {
    if (Bikes.findOne({bike: 1})) {
      Session.set('sortBikesOption', 'timestamp');
      Session.set('sortBikesDirection', 'desc');
      // this helper returns a cursor of all of the posts in the collection
      var bikeData = Bikes.findOne({bike: Session.get('BikeNumber')}).updates;
      if (Session.get('sortBikesDirection' === 'desc')) {
        return _.sortBy(bikeData, Session.get('sortBikesOption')).reverse();
      } else {
        return _.sortBy(bikeData, Session.get('sortBikesOption'));
        }
    }
  }
});