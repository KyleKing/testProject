// Router.configure({
//   waitOn: function() {
//     return Meteor.subscribe("Bikes");
//   }
// });

// Router.route('/', function () {
//   this.render('map-layout');
// });

// Router.route('/', function () {
//   this.render('about');
// });

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

Router.route('/layout');

Router.route('/layout2');


// Iron.Router.hooks.scrollToTop = function () {
//   var scrollEl = this.lookupOption('scrollEl') || 'body';
//   Deps.afterFlush(function () {
//     $(scrollEl).scrollTop(0);
//   });
// };

// Router.plugin('scrollToTop', {scrollEl: '.layout'});



// Router.route('/subscriptions', {
//   waitOn: function () {
//     return Meteor.subscribe('post');
//   },

//   action: function () {
//     if (this.ready())
//       // if the sub handle returned from waitOn ready() method returns
//       // true then we're ready to go ahead and render the page.
//       this.render('Page')
//     else
//       // otherwise render the loading template.
//       this.render('Loading');
//   })
// });

// myReadyVar = new Blaze.ReactiveVar(false);
// Router.route('/custom', {
//   waitOn: function () {
//     return function () {
//       // returns true or false
//       // and can bet set with myReadyVar.set(true|false);
//       return myReadyVar.get();
//     };
//   },

//   action: function () {
//     if (this.ready())
//       this.render('Page')
//     else
//       this.render('LoadingCustom');
//   }
// });

// one = new Blaze.ReactiveVar(false);
// two = new Blaze.ReactiveVar(false);
// Router.route('/many', {
//   waitOn: function () {
//     // we'll be ready when both one and two are true.
//     return [
//       function () { return one.get(); },
//       function () { return two.get(); }
//     ];
//   },

//   action: function () {
//     if (this.ready())
//       this.render('Page')
//     else
//       this.render('LoadingMany');
//   }
// });

// if (Meteor.isServer) {
//   Meteor.publish('post', function () {
//     var self = this;
//     // send the ready message in a few seconds
//     setTimeout(function () {
//       self.ready();
//     }, 2000);
//   });
// }