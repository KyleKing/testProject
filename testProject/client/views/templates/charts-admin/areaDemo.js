/*
 * Function to draw the area chart
 */
function builtArea() {

    $('#container-area').highcharts({

        chart: {
            type: 'area'
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
Template.areaDemo.rendered = function() {
    builtArea();
}