Meteor.subscribe("bikesData");
Meteor.subscribe("RandMechanicNamesData");

Template.bikesList.created = function() {
  // Default to all users view
  Session.set('BikeNumber', 1);
  Session.set('sortType', 'timestamp');
  Session.set('sortOrder', 'desc');
  Session.set('mechanic', '');
};

// Source: http://stackoverflow.com/questions/604167/how-can-we-access-the-value-of-a-radio-button-using-the-dom
function getRadioValue(theRadioGroup) {
    var elements = document.getElementsByName(theRadioGroup);
    for (var i = 0, l = elements.length; i < l; i++) {
        if (elements[i].checked) {
            console.log(elements[i].value);
            return elements[i].value;
        }
    }
}

Template.bikesList.helpers({
  sortType: [
    'timestamp',
    'status',
    'mechanicNotes',
    'partslist',
    'mechanic',
    'role',
    'lat',
    'lng',
  ]
});

Template.bikesList.events({
    'submit form': function(event){
    event.preventDefault();
    var BikeNumber = parseFloat(event.target.BikeNumber.value);
    Session.set('BikeNumber', BikeNumber);
    // console.log(_.isString(BikeNumber));
    // var sortOrder = event.target.sortOrder;
    Session.set('sortOrder', getRadioValue('sortOrder'));
    // console.log(getRadioValue('sortOrder'));
    Session.set('sortType', event.target.sortType.value);
    Session.set('mechanic', event.target.sortType.value);
    }
});

Template.bikesList.helpers({
  bikes: function () {
    if (Bikes.findOne({bike: Session.get('BikeNumber')})) {
      // this helper returns a cursor of all of the posts in the collection
      var bikeData = [];
      // if (!Session.get('mechanic')) {
        bikeData = Bikes.findOne({bike: Session.get('BikeNumber')}).updates;
      // } else {
      //   bikeData = Bikes.findOne({bike: Session.get('BikeNumber'), mechanic: Session.get('mechanic')}).updates;
      // }
      // console.log(bikeData);

      if (Session.get('sortOrder') === 'desc') {
        return _.sortBy(bikeData, Session.get('sortType')).reverse();
      } else {
        return _.sortBy(bikeData, Session.get('sortType'));
      }
    }
  }
});

Template.bikesList.helpers({
  mechanicName: function () {
    if (RandMechanicNames.findOne()) {
      // this helper returns a cursor of all of the posts in the collection
      var mechanics = RandMechanicNames.findOne().staff;
      // console.log(_.sortBy(mechanics, 'name'));
      return _.sortBy(mechanics, 'name');
    }
  }
});