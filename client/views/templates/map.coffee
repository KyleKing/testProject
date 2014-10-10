# Upon loading the map template, runs this code:
Template.map.rendered = ->


  # Wait for subscription to plot bikes data
  Meteor.subscribe "bikesData", -> # Callback fired when data received
    if Meteor.isClient # double check to make sure Meteor is client
      L.Icon.Default.imagePath = 'packages/mrt_leaflet/images' # Added to help Meteor locate the marker icon
      # Start Minimum working code:

      map = new L.Map('map', {
          # layers: [openStreetMap]
          center: new L.LatLng(38.987701, -76.940989)
          zoom: 17
          zoomControl: false
      })
      # map = L.map("map").setView([ # Center on Mckeldin
      #   38.987701
      #   -76.940989
      # ], 14)
      # L.tileLayer('http://{s}.tiles.mapbox.com/v3/kyleking.icaokpd6/{z}/{x}/{y}.png', {
      #     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      #     maxZoom: 20,
      #     minZoom: 12
      # })
      # Cycle Map
      OpenCycleMap = L.tileLayer("http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        attribution: "&copy; <a href=\"http://www.opencyclemap.org\">OpenCycleMap</a>, &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>"
      ).addTo(map)


      # Add our zoom control manually where we want to
      zoomControl = L.control.zoom({ position: 'bottomleft' })
      map.addControl(zoomControl)

      # End Minimum working code:
      bikesData = Bikes.find().fetch() # Fetch collection data

      # Use Jquery to proper;y size the map for any browser
      # var w = window.innerWidth;
      # var h = window.innerHeight;
      # $('#map_container').css({width: w+'px', height: h+'px'});

      # Plot bikes as circles
      i = (bikesData.length - 1)

      while i >= 0
        if bikesData[i].status is "Good" # If good status, make green circle
          circle = L.circle([
            bikesData[i].latitude
            bikesData[i].longitude
          ], 10,
            color: "green"
            fillColor: "#43ff6c"
            fillOpacity: 0.9
          ).addTo(map)

        # console.log(bikesData[i].status); Should print out 11 "good's"
        else # If bad status, make red circle
          circle = L.circle([
            bikesData[i].latitude
            bikesData[i].longitude
          ], 30,
            color: "red"
            fillColor: "#f03"
            fillOpacity: 0.9
          ).addTo(map)
        i--
    else
      console.log "loading"
    map.locate(setView: true).on "locationfound", (e) ->
      marker = L.marker([
        e.latitude
        e.longitude
      ]).addTo(map)
      return

    return


  # var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
  # color: 'green',
  # fillColor: '#f03',
  # fillOpacity: 0.5
  # });
  # map.addLayer(circle);
  # })
  # .on('locationerror', function(e) {
  # map = L.map('map').setView([30.28, -97.73], 13);
  # });