// Upon loading the map template, runs this code:
Template.map.rendered = function() {

};

// Wait for subscription to plot bikes data
Meteor.subscribe("bikesData", function() { // Callback fired when data received
  if (Meteor.isClient) { // double check to make sure Meteor is sending data
      var bikesData = Bikes.find().fetch(); // Fetch collection data

    // Use Jquery to proper;y size the map for any browser
    // var w = window.innerWidth;
    // var h = window.innerHeight;
    // $('#map_container').css({width: w+'px', height: h+'px'});

    // Start Minimum working code:
      var map = L.map('map').setView([bikesData[0].latitude, bikesData[0].longitude], 14); // Center on Bike #1
      L.tileLayer('http://{s}.tiles.mapbox.com/v3/kyleking.icaokpd6/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 16,
          minZoom: 12
      }).addTo(map);
    // End Minimum working code:

    // Plot bikes as circles
    for (var i = (bikesData.length-1); i >= 0; i--) {

      if (bikesData[i].status == "Good") { // If good status, make green circle
        var circle = L.circle([bikesData[i].latitude, bikesData[i].longitude], 25, {
            color: 'green',
            fillColor: '#43ff6c',
            fillOpacity: 0.9
          }).addTo(map);
      } else { // If bad status, make red circle
        var circle = L.circle([bikesData[i].latitude, bikesData[i].longitude], 25, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.9
          }).addTo(map);
         };
      };
    } else {
    console.log('loading');
  };
});