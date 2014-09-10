Meteor.publish "bikesData", ->
  Bikes.find()