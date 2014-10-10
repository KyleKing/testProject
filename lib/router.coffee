Router.configure
  waitOn: ->
    Meteor.subscribe "Bikes"

# Data context from a collection
Router.map ->
  @route "map",
    path: "/",
    template: "map-layout",
    # When switching to home from /about, the map isn't loading - likely data issue
    # More help here: http://www.manuel-schoebel.com/blog/iron-router-tutorial
    # data: ->
    #   Bikes = status: status.find({}), latitude: latitude.find({}), longitude: longitude.find({})
    #   Bikes

Router.map ->
  @route "about",
    path: "/about",
    template: "about-layout"

# Router.map ->
#   @route "signup",
#     path: "/signup",
#     template: "layout"

Router.map ->
  @route "d3DEMO",
    path: "/d3ISfun",
    template: "layout"







# Router.route "/", ->
#   @render "map"

# Router.route "/about", ->
#   layoutTemplate: "about-layout"
#   @render "about"


# Router.route "/items/:_id", ->
#   item = Items.findOne(_id: @params._id)
#   @render "ShowItem",
#     data: item

#   return

# Router.route "/files/:filename", (->
#   @response.end "hi from the server\n"
#   return
# ),
#   where: "server"

# Router.route("/restful",
#   where: "server"
# ).get(->
#   @response.end "get request\n"
#   return
# ).post ->
#   @response.end "post request\n"
#   return

