Router.configure
  layoutTemplate: "layout"
  loadingTemplate: "loading"
  waitOn: ->
    Meteor.subscribe "Bikes"

Router.map ->
  @route "map",
    path: "/"

Router.onBeforeAction "loading"