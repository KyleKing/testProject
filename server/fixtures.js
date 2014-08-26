// Fixture data
if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  var telescopeId = Posts.insert({
    title: 'Bikes'
  });

  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Bike #' + i
    });
  }
}