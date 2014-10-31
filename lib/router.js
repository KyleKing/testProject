Router.route('/', function () {
  // add the subscription handle to our waitlist
  // this.wait(Meteor.subscribe('Bikes', this.params._id));
  this.wait(Meteor.subscribe('Bikes'));

  // this.ready() is true if all items in the wait list are ready

  if (this.ready()) {
    this.render('layout');
  } else {
    this.render('map-layout');
  }
});

Router.route('/about');

Router.route('/layout');

Router.route('/layout2');


// Iron.Router.hooks.scrollToTop = function () {
//   var scrollEl = this.lookupOption('scrollEl') || 'body';
//   Deps.afterFlush(function () {
//     $(scrollEl).scrollTop(0);
//   });
// };

// Router.plugin('scrollToTop', {scrollEl: '.layout'});