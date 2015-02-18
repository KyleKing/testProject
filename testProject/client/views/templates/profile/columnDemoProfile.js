/*
 * Function to draw the column chart
 */
function builtColumn(BarData) {

    $('#container-column-profile').highcharts({

        chart: {
            type: 'column'
        },

        title: {
            text: 'Weekly Miles Ridden'
        },

        credits: {
            enabled: false
        },

        xAxis: {
            categories: [
                'Mo',
                'Tu',
                'We',
                'Th',
                'Fr',
                'Sa',
                'Su'
            ]
        },

        yAxis: {
            min: 0,
            title: {
                text: 'Distance (miles)'
            }
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },

        series: [{
            name: '< 10 Minute Rides',
            data: BarData.Data
        }]
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.columnDemoProfile.rendered = function() {
    return Meteor.subscribe("BarChartData", function() {
        if (Meteor.isClient) {
            BarData = BarChart.findOne();
            // console.log(BarData.Data);
            builtColumn(BarData);
        }
    });
};