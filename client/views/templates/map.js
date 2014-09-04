Template.map.rendered = function() {

  // Populate database with static information
  if (Bikes.find().count() === 0) {
    Bikes.insert({
      title: 'Bike #1',
      status: 'Bad',
      needs: 'In a lake...',
      repaired: '2014-08-12',
      latitude: '38.984249',
      longitude: '-76.960559'
    });

    Bikes.insert({
      title: 'Bike #2',
      status: 'Good',
      needs: 'none',
      repaired: '2014-08-12',
      latitude: '38.984249',
      longitude: '-76.942719'
    });

    Bikes.insert({
      title: 'Bike #3',
      status: 'Good',
      needs: 'none',
      repaired: '2014-08-12',
      latitude: '38.932046',
      longitude: '-76.949717'
    });

    Bikes.insert({
      title: 'Bike #4',
      status: 'Good',
      needs: 'none',
      repaired: '2014-08-12',
      latitude: '38.982346',
      longitude: '-76.942797'
    });

    Bikes.insert({
      title: 'Bike #5',
      status: 'Good',
      needs: 'none',
      repaired: '2014-08-12',
      latitude: '38.982043',
      longitude: '-76.949797'
    });

    Bikes.insert({
      title: 'Bike #6',
      status: 'Good',
      needs: 'none',
      repaired: '2014-08-12',
      latitude: '38.932046',
      longitude: '-76.949717'
    });

    Bikes.insert({
      title: 'Bike #7',
      status: 'Good',
      needs: 'none',
      repaired: '2014-08-12',
      latitude: '38.983046',
      longitude: '-76.942719'
    });

    Bikes.insert({
      title: 'Bike #8',
      status: 'Good',
      needs: 'none',
      repaired: '2014-08-12',
      latitude: '38.985046',
      longitude: '-76.943717'
    });

    Bikes.insert({
      title: 'Bike #9',
      status: 'Good',
      needs: 'none',
      repaired: '2014-08-12',
      latitude: '38.982056',
      longitude: '-76.932717'
    });

    Bikes.insert({
      title: 'Bike #10',
      status: 'Good',
      needs: 'none',
      repaired: '2014-08-12',
      latitude: '38.582046',
      longitude: '-76.942713'
    });

    Bikes.insert({
      title: 'Bike #11',
      status: 'Good',
      needs: 'none',
      repaired: '2014-08-12',
      latitude: '38.952046',
      longitude: '-76.942317'
    });

    Bikes.insert({
      title: 'Bike #12',
      status: 'Good',
      needs: 'none',
      repaired: '2014-08-12',
      latitude: '38.982056',
      longitude: '-76.942737'
    });
  };

  var bikesData = Bikes.find().fetch(); // Fetch collection data
  // console.log(bikesData[0].latitude); // For testing

  // Start Minimum working code:
    // var map = L.map('map').setView([51.505, -0.09], 13); // Center on London
    var map = L.map('map').setView([bikesData[0].latitude, bikesData[0].longitude], 14); // Center on Bike #1
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/kyleking.icaokpd6/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 16,
        minZoom: 12
    }).addTo(map);
  // End Minimum working code:

  // Plot bikes as circles
  for (var i = 11; i >= 0; i--) {

    if (bikesData[i].status == "Good") { // If good status, make green circle
      var circle = L.circle([bikesData[i].latitude, bikesData[i].longitude], 25, {
          color: 'green',
          fillColor: '#43ff6c',
          fillOpacity: 0.5
        }).addTo(map);
    } else { // If bad status, make red circle
      var circle = L.circle([bikesData[i].latitude, bikesData[i].longitude], 25, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5
        }).addTo(map);
       };
  };
};
