Bikes = new Mongo.Collection('bikes'); // Create new bikes collection for inventory
TimeSeries = new Meteor.Collection('timeseries'); // Time series data
Current = new Meteor.Collection('current'); // Time series data
BarChart = new Meteor.Collection('barchart');
AdminBarChart = new Meteor.Collection('adminbarchart');
AdminAreaChart = new Meteor.Collection('adminareachart');

Information = new Meteor.Collection('information');

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
//     { $unwind: '$position' },

//     // Sort in descending order
//     { $sort: {
//         'position.timestamp': -1
//     }}
// )

// // Testing sorting of array of documents
// if (Meteor.isServer) {
//   Meteor.methods({
//     sortTime: function (num) {
//       var pipeline = [
//         { $group : { _id : "$position.timestamp", position: { $push: "$position.Lat" } } }
//         // { $match: { bike: num} },
//         // { $unwind: '$position' },
//         // { $sort: {'position.timestamp': -1} }
//         // { $out: "sortedTime" } // Not yet supported in Meteor
//       ];
//       var TestResult = TimeSeries.aggregate(pipeline);
//     }
//   });
// }