Template.map.rendered = function() {
  return Meteor.subscribe("bikesData", function() {

    var OpenCycleMap, bikesData, circle, i, map, zoomControl;

    if (Meteor.isClient) {

      L.Icon.Default.imagePath = 'packages/mrt_leaflet/images';

      map = new L.Map('map', {
        center: new L.LatLng(38.987701, -76.940989),
        zoom: 17,
        zoomControl: false
      });

      OpenCycleMap = L.tileLayer("http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"http://www.opencyclemap.org\">OpenCycleMap</a>, &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>"
      }).addTo(map);

      zoomControl = L.control.zoom({
        position: 'bottomleft'
      });

      map.addControl(zoomControl);

      bikesData = Bikes.find().fetch();

      i = bikesData.length - 1;
      while (i >= 0) {
        if (bikesData[i].status === "Good") {
          circle = L.circle([bikesData[i].latitude, bikesData[i].longitude], 10, {
            color: "green",
            fillColor: "#43ff6c",
            fillOpacity: 0.9
          }).addTo(map);
        } else {
          circle = L.circle([bikesData[i].latitude, bikesData[i].longitude], 30, {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.9
          }).addTo(map);
        }
        i--;
      }
    } else {
      console.log("loading");
    }

    map.locate({
      setView: true
    }).on("locationfound", function(e) {

    var marker;
      marker = L.marker([e.latitude, e.longitude]).addTo(map);
    });
  });
};

