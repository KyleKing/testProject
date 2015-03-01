if (Meteor.isServer) {
  // Calculate current day of year without momentjs
  // Copied from: http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
  var currentDay = (function() {
    var currentDay = new Date();
    var start = new Date(currentDay.getFullYear(), 0, 0);
    var diff = currentDay - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  });

  // Calculate random GPS coordinates within campus
  // console.log(randGPS().lng[1]);
  var randGPS = (function() {
    // Bottom Right: Latitude : 38.980296 | Longitude : -76.933479
    // Bottom Left: Latitude : 38.982297 | Longitude : -76.957941
    // Top Left: Latitude : 38.999109 | Longitude : -76.956053
    // Top Right: Latitude : 39.003778 | Longitude : -76.932278
    var latRand = [];  var lngRand = [];
    var latTemp = NaN; var lngTemp = NaN;
    for (var i = 1; i <= 25; i++) {
      latTemp = 39.004 - Math.random();
      lngTemp = -76.958 + Math.random();

      while ((latTemp <= 38.980296) && (latTemp >= 39.003778)) {
        latTemp = 39.004 - Math.random();
      }

      while ((lngTemp >= -76.932278) && (lngTemp <= -76.957941)) {
        lngTemp = -76.958 + Math.random();
      }
      latRand.push(latTemp);
      lngRand.push(lngTemp);
    }

    var randCoordinates = {lat: latRand, lng: lngRand};
    return randCoordinates;
  });

  // Insert database of bikes if no data for today
  if (TimeSeries.find({day: currentDay()}).count() === 0) {
    for (var i = 1; i <= 10; i++) {
      var now = new Date().getTime();
      // create template for each timeseries data stored
      var position = []; var randomNow = NaN; var blank = {};
      for (var countTime = 0; countTime < 15; countTime++) { // For 60 minutes in an hour
        randomNow = now*Math.random();
        blank = {User: NaN, timestamp: randomNow, Lat: NaN, Long: NaN};
        position.push(blank); // create array
      }
      TimeSeries.insert({
        bike: i,
        day: currentDay(),
        position: position
      });
      console.log("Created TimeSeries dataschema without momentJS!");
    }
  }

  if (Current.find().count() === 0) {
    // console.log("Starting MongoDB with math!");
    for (var i = 0; i < 10; i++) { // For 10 bikes
      Current.insert({
        Bike: i,
        Lat: NaN,
        Long: NaN
      });
    }
  }

  if (BarChart.find().count() === 0) {
    console.log("Starting BarChart with math!");
    BarChart.insert({
      Data: [21.2, 12.5, 19.4, 12.2, 30.0, 15.0, 28.6]
    });
  }

  if (AdminBarChart.find().count() === 0) {
    console.log("Starting AdminBarChart with math!");
    AdminBarChart.insert({
          name: '< 10 Minute Rides',
          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          });
    AdminBarChart.insert({
          name: '10+ Minute Rides',
          data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        });
    AdminBarChart.insert({
          name: 'Off Campus Rides',
          data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
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
}