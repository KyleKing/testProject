Router.configure
  layoutTemplate: "map-layout"
  waitOn: ->
    Meteor.subscribe "Bikes"

Router.map ->
  @route "map",
    path: "/"

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

