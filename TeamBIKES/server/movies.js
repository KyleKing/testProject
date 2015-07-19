if (Movies.find().count() === 0) {
  Movies.insert({title: 'The Shawshank Redemption', year: 1994, rating: 9.2});
  Movies.insert({title: 'The Godfather', year: 1972, rating: 9.2});
  Movies.insert({title: 'Forrest Gump', year: 1994, rating: 8.7});
  Movies.insert({title: 'The Matrix', year: 1999, rating: 8.7});
}

Meteor.publish("crud", function () {
  return Movies.find();
});

if (!Books.find().count()){
	Books.insert({
		author:"Anthony Doerr",
		name:"All the Light We Cannot See"
	});

	Books.insert({
		author:"Paula Hawkins",
		name:"The girl on the train"
	});
}

Meteor.publish("Datatable", function () {
  return Books.find();
});

// more movie data: http://www.imdb.com/xml/find?json=1&tt=on&q=meteor


// more movie data: http://www.imdb.com/xml/find?json=1&tt=on&q=meteor
