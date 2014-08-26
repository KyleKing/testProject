Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userID, post, fieldnames) {
    // may only edit the following two fields
    return (_.without(fieldnames, 'title').length > 0);
  }
});