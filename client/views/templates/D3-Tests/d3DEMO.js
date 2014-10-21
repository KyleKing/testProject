Template.lineChart.rendered = function(){
  if(Meteor.isClient) {

    // We'll first need some data. This data was pulled from the Crossfilter API documentation:

    var data = [
      {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
      {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab"},
      {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"},
      {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab"},
      {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab"},
      {date: "2011-11-14T16:53:41Z", quantity: 2, total: 90, tip: 0, type: "tab"},
      {date: "2011-11-14T16:54:06Z", quantity: 1, total: 100, tip: 0, type: "cash"},
      {date: "2011-11-14T16:58:03Z", quantity: 2, total: 90, tip: 0, type: "tab"},
      {date: "2011-11-14T17:07:21Z", quantity: 2, total: 90, tip: 0, type: "tab"},
      {date: "2011-11-14T17:22:59Z", quantity: 2, total: 90, tip: 0, type: "tab"},
      {date: "2011-11-14T17:25:45Z", quantity: 2, total: 200, tip: 0, type: "cash"},
      {date: "2011-11-14T17:29:52Z", quantity: 1, total: 200, tip: 100, type: "visa"}
    ];

    // We'll make our Crossfilter instance.

     var ndx = crossfilter(data);

     // For our first example, we'll setup a filter using one of the integer columns. Say we want to get all the transactions with a total equal to 90. To do this, we need to setup a dimension.

     var totalDim = ndx.dimension(function(d) { return d.total; });

     var total_90 = totalDim.filter(90);

     print_filter("total_90");
  };
};