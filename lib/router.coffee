Router.configure
  layoutTemplate: "layout"
  waitOn: ->
    Meteor.subscribe "Bikes"

Router.map ->
  @route "map",
    path: "/"