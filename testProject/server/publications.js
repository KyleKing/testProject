Meteor.publish("RandNamesData", function () {
  return RandNames.find();
});
Meteor.publish("RandMechanicNamesData", function () {
  return RandMechanicNames.find();
});



Meteor.publish("RFIDdataPublication", function () {
  return RFIDdata.find();
});


Meteor.publish("bikesData", function() {
  return Bikes.find();
});


Meteor.publish("timeseriesData", function() {
  return TimeSeries.find();
});
Meteor.publish("TestUsersData", function() {
  return TestUsers.find();
});
// Meteor.publish("TestUserDataSorted", function() {
//   var TestResult = TimeSeries.aggregate([
//     { $match: {bike: 4} },
//     { $unwind: '$positions' },
//     { $sort: {'positions.timestamp': -1} },
//     { $group: {_id : "$bike", positions: {$push: '$positions'}} }
//   ]);
//   // console.log(TestResult[0].positions);
//   // _(TestResult[0].positions).each(function(eachSelf){
//   //   console.log('_each: ' + eachSelf.timestamp);
//   // });

//   // information needs to be the lowercase version from the collection, not the Meteor version
//   this.added('testUsers', Random.id(), {sort: true, data: TestResult[0]._id });
// });


// Meteor.publish('previousInviteContacts', function() {
//   contacts = Events.aggregate([
//       {$match: {creatorId: this.userId}},
//       {$project: {invites: 1}},
//       {$unwind: "$invites" },
//       {$group: {_id: {email: "$invites.email"}}},
//       {$project: {email: "$_id.email"}}
//     ]);
//   _(contacts).each(function(contact) {
//     if (contact.email) {
//       if (!Contacts.findOne({userId: this.userId, email: contact.email})) {
//         this.added('contacts', Random.id(), {email: contact.email, userId: this.userId, name: ''});
//       }
//     }
//   });
// });

Meteor.publish("informationTestData", function() {
  var pipeline = [
    { $match: {bike: 4} },
    { $unwind: '$positions' },
    { $sort: {'positions.timestamp': -1} },
    { $group: {_id : "$bike", positions: {$push: '$positions'}} }
  ];
  var TestResult = TimeSeries.aggregate(pipeline);
  // console.log(TestResult[0].positions);
  // _(TestResult[0].positions).each(function(eachSelf){
  //   console.log('_each: ' + eachSelf.timestamp);
  // });

  // information needs to be the lowercase version from the collection, not the Meteor version
  this.added('information', Random.id(), {email: 'Kyle@email.com', userId: this.userId, data: TestResult[0]._id });
});

Meteor.publish("SortTime", function() {
  return SortTime.find();
});


Meteor.publish("currentData", function() {
  return Current.find();
});


Meteor.publish("BarChartData", function() {
  return BarChart.find();
});
Meteor.publish("AdminBarChartData", function() {
  return AdminBarChart.find();
});
Meteor.publish("AdminAreaChartData", function() {
  return AdminAreaChart.find();
});