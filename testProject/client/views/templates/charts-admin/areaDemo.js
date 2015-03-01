/*
 * Function to draw the area chart
 */
function builtArea(BarData) {

    $('#container-area').highcharts({

        chart: {
            type: 'area',
            animation: Highcharts.svg, // don't animate in old IE
            // events: {
            //         load: function () {

            //             // set up the updating of the chart each second
            //             var series = this.series[0];
            //             setInterval(function () {
            //                 var x = (new Date()).getTime(), // current time
            //                     y = Math.random();
            //                 series.addPoint([x, y], true, true);
            //             }, 1000);
            //         }
            //     }
        },

        title: {
            text: 'Bike Quantities'
        },

        credits: {
            enabled: false
        },

        // subtitle: {
        //     text: 'Source: <a href="http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
        //         'thebulletin.metapress.com</a>'
        // },

        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ]
        },

        // xAxis: {
        //     allowDecimals: false,
        //     labels: {
        //         formatter: function () {
        //             return this.value; // clean, unformatted number for year
        //         }
        //     }
        // },

        yAxis: {
            title: {
                text: 'Milieage (miles)'
            }
        },

        // yAxis: {
        //     title: {
        //         text: 'Milieage'
        //     },
        //     labels: {
        //         formatter: function () {
        //             return this.value / 1000 + 'k';
        //         }
        //     }
        // },

        tooltip: {
            pointFormat: '{series.name} <b>{point.y:,.0f}</b> miles'
        },

        // plotOptions: {
        //     area: {
        //         pointStart: 2013,
        //         marker: {
        //             enabled: false,
        //             symbol: 'circle',
        //             radius: 2,
        //             states: {
        //                 hover: {
        //                     enabled: true
        //                 }
        //             }
        //         }
        //     }
        // },

        // series: BarData
        series: [{
            name: 'Bikes Ridden',
            data: [600, 650, 700, 450, 300, 200, 100, 90, 350, 450, 700, 900]
        }, {
            name: 'Miles Redistributed',
            data: [10, 35, 25, 30, 40, 55, 65, 30, 25, 10, 30, 10]
        }]
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
//  if(Meteor.isClient) {
//     Meteor.subscribe("AdminAreaChartData");
// }

// if(Meteor.isClient) {
//     Session.set("current_channel", "cool_people_channel");

//     Meteor.autorun(function() {
//         Meteor.subscribe("messages", Session.get("current_channel"));
//     });
// }

Template.areaDemo.created = function() {
    return Meteor.subscribe("AdminAreaChartData", function() {
        if (Meteor.isClient) {
            // console.log(BarData);
            builtArea();
        }
    });
};