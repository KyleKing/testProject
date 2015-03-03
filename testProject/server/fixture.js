var totalBikeCount = 15;

// Calculate current day of year without momentjs
  // Copied from: http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
var currentDay = (function() {
  var dateFunc = new Date();
  var start = new Date(dateFunc.getFullYear(), 0, 0);
  var diff = dateFunc - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day;
});

// Calculate random GPS coordinates within campus
  // Bottom Right: Latitude : 38.980296 | Longitude : -76.933479
  // Bottom Left: Latitude : 38.982297 | Longitude : -76.957941
  // Top Left: Latitude : 38.999109 | Longitude : -76.956053
  // Top Right: Latitude : 39.003778 | Longitude : -76.932278
var randGPS = (function(max) {
  // Create empty variables
  var latRand = [];  var lngRand = [];
  var latTemp = NaN; var lngTemp = NaN;
  // Calculate a given number of random GPS locations (max)
  for (var i = 1; i <= max; i++) {
    latTemp = 39.004 - Math.random();
    lngTemp = -76.958 + Math.random();
    // Confine to given area
    while ((latTemp <= 38.980296) && (latTemp >= 39.003778)) { latTemp = 39.004 - Math.random(); }
    while ((lngTemp >= -76.932278) && (lngTemp <= -76.957941)) { lngTemp = -76.958 + Math.random(); }
    // Store in array
    latRand.push(latTemp);
    lngRand.push(lngTemp);
  }
  // Save in object to return
  var randCoordinates = {lat: latRand, lng: lngRand};
  return randCoordinates;
});
// console.log(randGPS(25).lng[Math.round(24*Math.random())]);

var status = ['Waiting for Repair', 'Scrap', 'Fixed', 'Circulating', 'In Use'];

var randNames = [
  'Katherina Damm',
  '',
  'Ronny Spake',
  'Debroah Armer',
  '',
  'June Wakeland',
  'Elfriede Senegal',
  'Isaias Cappello',
  'Kati Rosser',
  'Takisha Bynum',
  '',
  'Mafalda Kennett',
  'Britany Bartsch',
  'Roselee Sabourin',
  '',
  'Chelsie Vantassel',
  'Chaya Daley',
  'Luella Cordon',
  'Jamel Brekke',
  '',
  'Jonie Schoemaker',
  'Susannah Highfield',
  'Mitzi Brouwer',
  '',
  'Forrest Lazarus',
  'Dortha Dacanay',
  'Delinda Brouse',
  'Alyssa Castenada',
  '',
  'Carlo Poehler',
  'Cicely Rudder',
  'Lorraine Galban',
  'Trang Lenart',
  'Patrica Quirk',
  '',
  'Zackary Dedios',
  '',
  '',
  'Ursula Kennerly',
  'Shameka Flick',
  'President Loh'];

// Insert database of bikes if no data for today
if (TimeSeries.find({day: currentDay()}).count() === 0) {
  for (var i = 1; i <= totalBikeCount; i++) {
    var now = new Date().getTime();
    // create template for each timeseries data stored
    var position = []; var randomNow = NaN; var blank = {};
    for (var countTime = 0; countTime < 15; countTime++) { // For 60 minutes in an hour
      randomNow = now*Math.random();
      // console.log('i = ' + i);
      var namePoint = Math.round((randNames.length-1)*Math.random());
      // console.log('namePoint = ' + namePoint);
      var randGPSPoint = Math.round(1*Math.random());
      blank = {
        User: randNames[namePoint],
        timestamp: randomNow,
        Lat: randGPS(2).lat[randGPSPoint],
        Lng: randGPS(2).lng[randGPSPoint]
      };
      // console.log('name = ' + blank.User);
      position.push(blank); // create array
    }
    TimeSeries.insert({
      bike: i,
      status: (Math.round(0.65*Math.random()) === 0 ? 'Fine' : 'Bad'),
      day: currentDay(),
      positions: position
    });
  }
  console.log("Created TimeSeries dataschema");
}

var partslist = [
  'Bottom Bracket',
  'Stacks of cash',
  'Stem post',
  'Handlebar' ];

var mechanicNotes = [
  'Broken spokes, all of them',
  'Flat tire',
  'Broken stem',
  'Broken seatpost, someone was too heavy',
  'Tuneup',
  'Tuneup',
  'Tuneup',
  'Tuneup',
  'Tuneup',
  'Tuneup',
  'Tuneup',
  'Tuneup',
  'Tuneup',
  'Tuneup',
  'Tuneup',
  'Built from box',
  'Built from box' ];

var mechanic = {
  name: [
    'Erlene Pettit',
    'Ingrid Carney',
    'Cassondra Chau',
    'Katharina Pearce',
    'Thomasina Dye',
    'Melda Miranda',
    'Doretha Bayne',
    'Ester Newkirk',
    'Wynell Rosa',
    'Chadwick Slade' ],
  role: [
    'Administrator',
    'mechanic'
  ]};

// Insert database of bikes if no data for today
if (Bikes.find({month: currentDay()}).count() === 0) {
  for (var i = 1; i <= totalBikeCount; i++) {
    var now = new Date().getTime();
    // create template for each Bikes data stored
    var update = []; var randomNow = NaN; var blank = {};
    for (var countTime = 0; countTime < 15; countTime++) { // For 60 minutes in an hour
      randomNow = now*Math.random();
      var randGPSPoint = Math.round(1*Math.random());
      blank = {
        status: status[_.random(0,status.length - 1)],
        mechanicNotes: mechanicNotes[_.random(0,mechanicNotes.length - 1)],
        partslist: partslist[_.random(0,partslist.length - 1)],
        mechanic: mechanic.name[_.random(0,9)],
        role: (Math.round(0.65*Math.random()) === 1 ? 'Administrator' : 'Mechanic'),
        timestamp: randomNow,
        lat: randGPS(2).lat[randGPSPoint],
        lng: randGPS(2).lng[randGPSPoint]
      };
      // console.log('name = ' + blank.User);
      update.push(blank); // create array
    }
    Bikes.insert({
      bike: i,
      month: currentDay(),
      updates: update
    });
  }
  console.log("Created Bikes dataschema");
}

if (Current.find().count() === 0) {
  // console.log("Starting MongoDB with math!");
  for (var i = 0; i < totalBikeCount; i++) { // For 10 bikes
    Current.insert({
      Bike: i,
      Lat: NaN,
      Long: NaN
    });
  }
}

if (BarChart.find().count() === 0) {
  console.log("Starting BarChart with math!");
  var randArray = [];
  _.times(7, function(){ randArray.push(_.random(10, 30)); });
  BarChart.insert({
    Data: randArray
  });
}

if (AdminBarChart.find().count() === 0) {
  console.log("Starting AdminBarChart with math!");
  var randArray = [];
  _.times(12, function(){ randArray.push(_.random(40, 200)); });
  AdminBarChart.insert({
        name: '< 10 Minute Rides',
        data: randArray
        });
  var randArray = [];
  _.times(12, function(){ randArray.push(_.random(40, 200)); });
  AdminBarChart.insert({
        name: '10+ Minute Rides',
        data: randArray
      });
  var randArray = [];
  _.times(12, function(){ randArray.push(_.random(40, 200)); });
  AdminBarChart.insert({
        name: 'Off Campus Rides',
        data: randArray
    });
}

if (AdminAreaChart.find().count() === 0) {
  console.log("Starting AdminAreaChart with math!");
  AdminAreaChart.insert({
      name: 'Potentiometer Data',
      data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
  });
}

Meteor.methods({
  'loop': function (dataSet, schema) {
    // Print out schema of received data]
    // for (var key in dataSet) {
    //   if (dataSet.hasOwnProperty(key)) {
    //     console.log(key + " -> " + dataSet[key]);
    //   }
    // }

    // Prepare fields to udpate MongoDB
    var fields = {};
    var root = ["Time." + dataSet.timeHH + '.' + dataSet.timemm];
    fields[root + ".User"] = dataSet.User;
    fields[root + ".Lat"] = dataSet.Lat;
    fields[root + ".Long"] = dataSet.Long;

    // Update MongoDB data based on bike number
    var record = TimeSeries.findOne({Bike: dataSet.BikeNumber, YYYY: dataSet.timeYYYY, MM: dataSet.timeMM, DD: dataSet.timeDD});
    TimeSeries.update(
      record,
      { $set: fields }
    );

    return "ok";
  }
});

Meteor.methods({
  'current': function (dataSet, schema) {
    // Print out schema of received data]
    for (var key in dataSet) {
      if (dataSet.hasOwnProperty(key)) {
        console.log(key + " -> " + dataSet[key]);
      }
    }

    // Prepare fields to udpate MongoDB
    var fields = {};
    fields.Lat = dataSet.Lat;
    fields.Long = dataSet.Long;

    // Update MongoDB data based on bike number
    var record = Current.findOne({Bike: dataSet.BikeNumber});
    Current.update(
      record,
      { $set: fields }
    );

    return "ok";
  }
});

Meteor.methods({
  'chart': function (dataSet) {
    // Prepare fields to udpate MongoDB
    var fields = {};
    fields["data." + dataSet.BikeNumber] = dataSet.Potentiometer;
    fields.x = dataSet.x;
    console.log(dataSet.Potentiometer);

    // Update MongoDB data based on bike number
    var record = AdminAreaChart.findOne();
    AdminAreaChart.update(
      record,
      { $set: fields }
    );

    return "ok";
  }
});