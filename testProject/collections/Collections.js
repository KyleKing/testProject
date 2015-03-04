Bikes = new Mongo.Collection('bikes'); // Create new bikes collection for inventory

TimeSeries = new Meteor.Collection('timeseries'); // Time series data
Current = new Meteor.Collection('current'); // Time series data
BarChart = new Meteor.Collection('barchart');
AdminBarChart = new Meteor.Collection('adminbarchart');
AdminAreaChart = new Meteor.Collection('adminareachart');

Information = new Meteor.Collection('information');
SortTime = new Meteor.Collection('sortTime');
TestUsers = new Meteor.Collection('testUsers');

RandNames = new Meteor.Collection('randNames');
RandMechanicNames = new Meteor.Collection('randMechanicNames');

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
      var Bike = TimeSeries.aggregate(pipeline);
      // var pipeline = [
      //   { $group : { _id : "$positions.timestamp", positions: { $push: "$positions.Lat" } } }
      //   // { $match: { bike: num} },
      //   // { $unwind: '$positions' },
      //   // { $sort: {'positions.timestamp': -1} }
      //   // { $out: "sortedTime" } // Not yet supported in Meteor
      // ];
      // var Bike = TimeSeries.aggregate(pipeline);

      SortTime.insert({
        email: 'Kyle@email.com',
        meal: Bike[0]._id,
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
        var Bikes = TimeSeries.aggregate([
          { $match: {bike: BikeNum} },
          { $unwind: '$positions' },
          { $sort: {'positions.timestamp': 1} },
          { $group: {_id : "$positions.User", positions: {$push: '$positions'} } }
        ]);
        // console.log(Bikes);

        _(Bikes).each(function(Bike) {
          if (Bike._id) { // Ignore blank strings (i.e. no user)
            var record = TestUsers.findOne({User: Bike._id});
            var positionsData = []; var rides = 0;
            _(Bike.positions).each(function(position) {
              positionsData.push({bike: BikeNum, timestamp: position.timestamp,  User: position.User, Lat: position.Lat, Lng: position.Lng});
              rides = rides + 1;
            });
            if (!record) {
              TestUsers.insert({
                User: Bike._id,
                rides: rides,
                positions: positionsData
                // positions: Bike.positions
              });
            } else {
              _(Bike.positions).each(function(position) {
                if (!TestUsers.findOne({'positions.timestamp': position.timestamp})) {
                  positionsData = {bike: BikeNum, timestamp: position.timestamp,  User: position.User, Lat: position.Lat, Lng: position.Lng};
                  TestUsers.update(
                    record, {
                      $addToSet: {positions: positionsData},
                      $inc: {rides: 1}
                    }
                  );
                }
              });
            }
          }
        });
      }
    }
  });

}