/*********************************************/
/*   Not working -> defaults to map static                  */
/********************************************/
Router.route('/', function () {
  this.wait(Meteor.subscribe('Bikes'));
  this.render('mapLayout');
  // // this.ready() is true if all items in the wait list are ready
  // if (this.ready()) {
  //   this.render('mapLayout');
  // } else {
  //   this.render('mapStatic');
  // }
});

// Temporary workaround
// Router.route('/', function () {
//   this.render('mapLayout');
// });

Router.route('/about');

Router.route('/admin');
Router.route('/admin1');
Router.route('/admin2');
Router.route('/admin3');
Router.route('/RFID');

Router.route('/student');

Router.route('/mechanic');

Router.route('/mechanicMap');

Router.route('/potentiometer');

Router.route('/cool');

Router.route('/loginLayout');


// To be added to about, for scroll to top, if needed:
// Iron.Router.hooks.scrollToTop = function () {
//   var scrollEl = this.lookupOption('scrollEl') || 'body';
//   Deps.afterFlush(function () {
//     $(scrollEl).scrollTop(0);
//   });
// };

// Router.plugin('scrollToTop', {scrollEl: '.layout'});

// Additionally, make sure routing behaviour defaults to scrolling to top of each new page