// Upon loading the map template, runs this code:
Template.map.rendered = function() {
};

// Wait for subscription to plot bikes data
Meteor.subscribe("bikesData", function() { // Callback fired when data received
  if (Meteor.isClient) { // double check to make sure Meteor is client
    // Start Minimum working code:
    var map = L.map('map').setView([38.987701, -76.940989], 14); // Center on Mckeldin
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/kyleking.icaokpd6/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 16,
        minZoom: 12
    }).addTo(map);
    // End Minimum working code:

      var bikesData = Bikes.find().fetch(); // Fetch collection data

    // Use Jquery to proper;y size the map for any browser
    // var w = window.innerWidth;
    // var h = window.innerHeight;
    // $('#map_container').css({width: w+'px', height: h+'px'});

    // Plot bikes as circles
    for (var i = (bikesData.length-1); i >= 0; i--) {

      if (bikesData[i].status == "Good") { // If good status, make green circle
        var circle = L.circle([bikesData[i].latitude, bikesData[i].longitude], 25, {
            color: 'green',
            fillColor: '#43ff6c',
            fillOpacity: 0.9
          }).addTo(map);
        // console.log(bikesData[i].status); Should print out 11 "good's"
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
    map.locate({setView: true})
     .on('locationfound', function(e) {
      var marker = L.marker([e.latitude, e.longitude]).addTo(map);
    });
     // var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
     // color: 'green',
     // fillColor: '#f03',
     // fillOpacity: 0.5
     // });
     // map.addLayer(circle);
     // })
     // .on('locationerror', function(e) {
     // map = L.map('map').setView([30.28, -97.73], 13);
     // });
});