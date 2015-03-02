Bikes = new Mongo.Collection('bikes'); // Create new bikes collection for inventory
TimeSeries = new Meteor.Collection('timeseries'); // Time series data
Current = new Meteor.Collection('current'); // Time series data
BarChart = new Meteor.Collection('barchart');
AdminBarChart = new Meteor.Collection('adminbarchart');
AdminAreaChart = new Meteor.Collection('adminareachart');

Information = new Meteor.Collection('information');
SortTime = new Meteor.Collection('sortTime');
TestUsers = new Meteor.Collection('testUsers');

// Testing sorting of array of documents
if (Meteor.isServer) {
  Meteor.methods({
    sortTime: function () {
      var pipeline = [
        { $match: {bike: 4} },
        { $unwind: '$positions' },
        { $sort: {'positions.timestamp': -1} },
        { $group: {_id : "$bike", positions: {$push: '$positions'}} }
      ];
      var TestResult = TimeSeries.aggregate(pipeline);
      // var pipeline = [
      //   { $group : { _id : "$positions.timestamp", positions: { $push: "$positions.Lat" } } }
      //   // { $match: { bike: num} },
      //   // { $unwind: '$positions' },
      //   // { $sort: {'positions.timestamp': -1} }
      //   // { $out: "sortedTime" } // Not yet supported in Meteor
      // ];
      // var TestResult = TimeSeries.aggregate(pipeline);

      SortTime.insert({
        email: 'Kyle@email.com',
        meal: TestResult[0]._id,
        data: 4,
        lunch: 12
      });
      // On the console:
      // SortTime.find({meal: 4}).fetch()[0]
    }
  });

  Meteor.methods({
    eachBike: function () {
      for (var BikeNum = 1; BikeNum <= 10; BikeNum++) {
        var TestResults = TimeSeries.aggregate([
          { $match: {bike: BikeNum} },
          { $unwind: '$positions' },
          { $sort: {'positions.timestamp': 1} },
          { $group: {_id : "$positions.User", positions: {$push: '$positions'} } }
        ]);
        // console.log(TestResults);

        _(TestResults).each(function(testResult) {
          if (testResult._id) { // Ignore blank strings (i.e. no user)
            if (!TestUsers.findOne({User: testResult._id})) {
              TestUsers.insert({
                bike: BikeNum,
                day: 60,
                User: testResult._id,
                positions: testResult.positions
              });
            }
          }
        });
      }
    }
  });
}