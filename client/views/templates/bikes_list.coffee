Meteor.subscribe "bikesData"
Template.bikesList.helpers bikes: ->
  Bikes.find()