Template.map.created = function() {
  return Meteor.subscribe("bikesData", function() {

    if (Meteor.isClient) {

      L.Icon.Default.imagePath = 'leaflet/images';

      var map = new L.Map('map', {
        center: new L.LatLng(38.987701, -76.940989),
        maxZoom: 20,
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


      var HERE_hybridDayMobile = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/hybrid.day.mobile/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
        attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
        subdomains: '1234',
        mapID: 'newest',
        app_id: 'JIX0epTdHneK1hQlqfkr',
        app_code: 'PchnUPPBcZ5VAuHmovac8g',
        base: 'aerial',
        minZoom: 0,
        maxZoom: 20
      }).addTo(map);

      // var OpenCycleMap = L.tileLayer("http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png", {
      //   attribution: "&copy; <a href=\"http://www.opencyclemap.org\">OpenCycleMap</a>, &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>"
      // }).addTo(map);

      var zoomControl = L.control.zoom({
        position: 'bottomleft'
      });

      map.addControl(zoomControl);

      // Use Leaflet cluster group plugin
      var markers = new L.MarkerClusterGroup();
      bikesData = Bikes.find().fetch();

      var bikeIconGR = L.icon({
          iconUrl: 'leaflet/bikes/marker-icon.png',
          shadowUrl: 'leaflet/bikes/marker-icon.png',

          iconSize:     [50, 50], // size of the icon
          shadowSize:   [0, 0], // size of the shadow
          iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [0, 0],  // the same for the shadow
          popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });

      var i = bikesData.length - 1;
      while (i >= 0) {
        if (bikesData[i].status === "Good") {
          markers.addLayer( new L.Marker(new L.LatLng(bikesData[i].latitude, bikesData[i].longitude), {icon: bikeIconGR} ) );
          // L.Marker([L.LatLng(bikesData[i].latitude, bikesData[i].longitude], {icon: greenIcon})
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