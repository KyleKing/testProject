/*
 * Function to draw the pie chart
 */
function builtPieUsers() {

    // 'external' data
    var dataUsers = new Array();

    dataUsers.push({
        name: 'Under 5 rides/week',
        y: 900,
        color: '#55BF3B'
    });

    dataUsers.push({
        name: '5 -  30 rides/week',
        y: 1500,
        color: '#DDDF0D'
    });

    dataUsers.push({
        name: '30+ rides/week',
        y: 270,
        color: '#DF5353'
    });

    $('#container-pie-users').highcharts({

        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },

        title: {
            text: ''
        },

        credits: {
            enabled: false
        },

        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },

        series: [{
            type: 'pie',
            name: 'Users',
            data: dataUsers
        }]
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.pieDemoUsers.rendered = function() {
    builtPieUsers();
}