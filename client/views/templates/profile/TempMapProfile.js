// Template.TempMapProfile.created = function() {
Template.profile.created = function() {

  // var OpenCycleMap, map, zoomControl;

  // if (Meteor.isClient) {

  //   L.Icon.Default.imagePath = 'packages/mrt_leaflet/images';

  //   var baseLayer = L.tileLayer("http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png", {
  //     attribution: "&copy; <a href=\"http://www.opencyclemap.org\">OpenCycleMap</a>, &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>"
  //   });
  //   // OpenCycleMap = L.tileLayer("http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png", {
  //   //   attribution: "&copy; <a href=\"http://www.opencyclemap.org\">OpenCycleMap</a>, &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>"
  //   // }).addTo(map);

  //   // don't forget to include leaflet-heatmap.js
  //   var testData = {
  //     max: 8,
  //     data: [{lat: 38.987701, lng:-76.940989, count: 3},{lat: 50.75, lng:-1.55, count: 1}]
  //   };

  //   var cfg = {
  //     // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  //     // if scaleRadius is false it will be the constant radius used in pixels
  //     "radius": 2,
  //     "maxOpacity": .8, 
  //     // scales the radius based on map zoom
  //     "scaleRadius": true, 
  //     // if set to false the heatmap uses the global maximum for colorization
  //     // if activated: uses the data maximum within the current map boundaries 
  //     //   (there will always be a red spot with useLocalExtremas true)
  //     "useLocalExtrema": true,
  //     // which field name in your data represents the latitude - default "lat"
  //     latField: 'lat',
  //     // which field name in your data represents the longitude - default "lng"
  //     lngField: 'lng',
  //     // which field name in your data represents the data value - default "value"
  //     valueField: 'count'
  //   };


  //   // cfg.addTo(map);
  //   var heatmapLayer = new HeatmapOverlay(cfg);

  //   // var map = new L.Map('map-canvas', {
  //   //   center: new L.LatLng(25.6586, -80.3568),
  //   //   zoom: 4,
  //   //   layers: [baseLayer, heatmapLayer]
  //   // });


  //   map = new L.Map('map', {
  //     center: new L.LatLng(38.987701, -76.940989),
  //     maxZoom: 50,
  //     zoom: 16,
  //     zoomControl: false,
  //     layers: [baseLayer, heatmapLayer]
  //   });

  //   // zoomControl = L.control.zoom({
  //   //   position: 'bottomleft'
  //   // });

  //   // map.addControl(zoomControl);

  //   heatmapLayer.setData(testData);
// };




    // var testData = {
    //   max: 8,
    //   data: [{lat: 24.6408, lng:46.7728, count: 3},{lat: 50.75, lng:-1.55, count: 1}]
    // };

    // var baseLayer = L.tileLayer("http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png", {
    //       attribution: "&copy; <a href=\"http://www.opencyclemap.org\">OpenCycleMap</a>, &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>",
    //     maxZoom: 18
    //   }
    // );


    // //   'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    // //     attribution: '...',
    // //     maxZoom: 18
    // //   }
    // // );

    // var cfg = {
    //   // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    //   // if scaleRadius is false it will be the constant radius used in pixels
    //   "radius": 2,
    //   "maxOpacity": .8, 
    //   // scales the radius based on map zoom
    //   "scaleRadius": true, 
    //   // if set to false the heatmap uses the global maximum for colorization
    //   // if activated: uses the data maximum within the current map boundaries 
    //   //   (there will always be a red spot with useLocalExtremas true)
    //   "useLocalExtrema": true,
    //   // which field name in your data represents the latitude - default "lat"
    //   latField: 'lat',
    //   // which field name in your data represents the longitude - default "lng"
    //   lngField: 'lng',
    //   // which field name in your data represents the data value - default "value"
    //   valueField: 'count'
    // };


    // var heatmapLayer = new HeatmapOverlay(cfg);

    // var map = new L.Map('map-canvas', {
    //   center: new L.LatLng(25.6586, -80.3568),
    //   zoom: 4,
    //   layers: [baseLayer, heatmapLayer]
    // });

    // heatmapLayer.setData(testData);



        // standard gmaps initialization
    var myLatlng = new google.maps.LatLng(48.3333, 16.35);

    // define map properties
    var myOptions = {
        zoom: 3,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        scrollwheel: true,
        draggable: true,
        navigationControl: true,
        mapTypeControl: false,
        scaleControl: true,
        disableDoubleClickZoom: false
    };

    // we'll use the heatmapArea 
    var map = new google.maps.Map($("#heatmapArea")[0], myOptions);

    // let's create a heatmap-overlay
    // with heatmap config properties
    var heatmap = new HeatmapOverlay(map, {
        "radius": 20,
            "visible": true,
            "opacity": 60
    });

    // here is our dataset
    // important: a datapoint now contains lat, lng and count property!
    var testData = {
        max: 3,
        data: [{
            lat: 48.3333,
            lng: 16.35,
            count: 100
        }, {
            lat: 51.465558,
            lng: 0.010986,
            count: 100
        }, {
            lat: 33.5363,
            lng: -5.044,
            count: 100
        }]
    };

    // now we can set the data
    google.maps.event.addListenerOnce(map, "idle", function () {
        // this is important, because if you set the data set too early, the latlng/pixel projection doesn't work
        //debugger;
        heatmap.setDataSet(testData);
    });
};
