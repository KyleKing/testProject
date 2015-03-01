Bikes = new Mongo.Collection('bikes'); // Create new bikes collection for inventory
TimeSeries = new Meteor.Collection('timeseries'); // Time series data
Current = new Meteor.Collection('current'); // Time series data
BarChart = new Meteor.Collection('barchart');
AdminBarChart = new Meteor.Collection('adminbarchart');
AdminAreaChart = new Meteor.Collection('adminareachart');

Information = new Meteor.Collection('information');
SortTime = new Meteor.Collection('sortTime');
TestUsers = new Meteor.Collection('testUsers');


// // package example
// // Source: https://github.com/meteorhacks/meteor-aggregate/
// var metrics = new Mongo.Collection('metrics');
// var pipeline = [
//   {$group: {_id: null, resTime: {$sum: "$resTime"}}}
// ];
// var result = metrics.aggregate(pipeline);

// // Found online example
// // Source: http://stackoverflow.com/questions/13449874/how-to-sort-array-inside-collection-record-in-mongodb
// db.students.aggregate(
//     // Initial document match (uses index, if a suitable one is available)
//     { $match: {
//         _id : 1
//     }},

//     // Expand the scores array into a stream of documents
//     { $unwind: '$scores' },

//     // Filter to 'homework' scores
//     { $match: {
//         'scores.type': 'homework'
//     }},

//     // Sort in descending order
//     { $sort: {
//         'scores.score': -1
//     }}
// )

// TimeSeries.aggregate(
//     // Initial document match (uses index, if a suitable one is available)
//     { $match: {
//         bike: 4
//     }},

//     // Expand the scores array into a stream of documents
//     { $unwind: '$positions' },

//     // Sort in descending order
//     { $sort: {
//         'positions.timestamp': -1
//     }}
// )

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

//   Meteor.methods({
//     eachBike: function () {
//       for (var BikeNum = 1; BikeNum <= 10; BikeNum++) {
//         var pipeline = [
//           { $match: {bike: num} },
//           { $unwind: '$positions' },
//           // { $sort: {'positions.User': -1} },
//           { $group: {_id : "$positions.User", positions: {$push: '$positions'}} }
//         ];
//         var TestResult = TimeSeries.aggregate(pipeline);
//         // var pipeline = [
//         //   { $group : { _id : "$positions.timestamp", positions: { $push: "$positions.Lat" } } }
//         //   // { $match: { bike: num} },
//         //   // { $unwind: '$positions' },
//         //   // { $sort: {'positions.timestamp': -1} }
//         //   // { $out: "sortedTime" } // Not yet supported in Meteor
//         // ];
//         // var TestResult = TimeSeries.aggregate(pipeline);

//         TestUsers.insert({
//           email: 'Kyle@email.com',
//           meal: TestResult[0]._id,
//           data: 4
//         });
//         // On the console:
//         // TestUsers.find({meal: 4}).fetch()[0]
//       }
//     }
//   });
}