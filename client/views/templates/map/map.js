Template.map.created = function() {
  return Meteor.subscribe("bikesData", function() {

    var OpenCycleMap, bikesData, circle, i, map, zoomControl;

    if (Meteor.isClient) {

      L.Icon.Default.imagePath = 'packages/mrt_leaflet/images';

      map = new L.Map('map', {
        center: new L.LatLng(38.987701, -76.940989),
        maxZoom: 50,
        zoom: 16,
        zoomControl: false
      });


      // var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
      //   denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
      //   aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
      //   golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
      // var cities = L.layerGroup([littleton, denver, aurora, golden]);

      // var markers = new L.MarkerClusterGroup();
      // markers.addLayer( new L.Marker(new L.LatLng(38.987701, -76.940969) ) );
      // map.addLayer(markers);

      // var markers = L.markerClusterGroup();
      // var points_rand = L.geoJson(points, {
      //     onEachFeature: function (feature, layer) //functionality on click on feature
      //         {
      //         layer.bindPopup("hi! I am one of thousands"); //just to show something in the popup. could be part of the geojson as well!
      //         }
      // });


      OpenCycleMap = L.tileLayer("http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"http://www.opencyclemap.org\">OpenCycleMap</a>, &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>"
      }).addTo(map);

      zoomControl = L.control.zoom({
        position: 'bottomleft'
      });

      map.addControl(zoomControl);

      // Use Leaflet cluster group plugin
      var markers = new L.MarkerClusterGroup();
      bikesData = Bikes.find().fetch();

      i = bikesData.length - 1;
      while (i >= 0) {
        if (bikesData[i].status === "Good") {
          markers.addLayer( new L.Marker(new L.LatLng(bikesData[i].latitude, bikesData[i].longitude) ) );
        } else {
          console.log("Bad Bike");
        }
        i--;
      }

      map.addLayer(markers);

    //   i = bikesData.length - 1;
    //   while (i >= 0) {
    //     if (bikesData[i].status === "Good") {
    //       circle = L.circle([bikesData[i].latitude, bikesData[i].longitude], 10, {
    //         color: "green",
    //         fillColor: "#43ff6c",
    //         fillOpacity: 0.9
    //       }).addTo(map);
    //     } else {
    //       circle = L.circle([bikesData[i].latitude, bikesData[i].longitude], 30, {
    //         color: "red",
    //         fillColor: "#f03",
    //         fillOpacity: 0.9
    //       }).addTo(map);
    //     }
    //     i--;
    //   }
    // } else {
    //   console.log("loading");
    // }

    map.locate({
      setView: true
    }).on("locationfound", function(e) {

    var marker;
      marker = L.marker([e.latitude, e.longitude]).addTo(map);
    });
  };
});
};


// Not working and not sure why?
// if (Meteor.isClient) {
//   Template.body.helpers({
//     loc: function () {
//       // return 0, 0 if the location isn't ready
//       return Geolocation.latLng() || { lat: 0, lng: 0 };
//     },
//     error: Geolocation.error
//   });
// }