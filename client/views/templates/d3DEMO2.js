Template.d3DEMO2.rendered = function() {


  Deps.autorun(function () {
    // alert("Hello " + Session.get("name"));
    alert("Hello");


    'use strict';

    /* jshint globalstrict: true */
    /* global dc,d3,crossfilter,colorbrewer */
    var gainOrLossChart = dc.pieChart("#gain-loss-chart");
    var fluctuationChart = dc.barChart("#fluctuation-chart");
    var quarterChart = dc.pieChart("#quarter-chart");
    var dayOfWeekChart = dc.rowChart("#day-of-week-chart");
    var moveChart = dc.lineChart("#monthly-move-chart");
    var volumeChart = dc.barChart("#monthly-volume-chart");
    var yearlyBubbleChart = dc.bubbleChart("#yearly-bubble-chart");
     /*
         <div id="your-chart"></div>
         <div id="chart"><span>Days by Gain or Loss</span></div>
          <div id="chart">
           <a class="reset" href="javascript:myChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
         </div>
         <div id="chart">
            <span class="reset" style="display: none;">Current filter: <span class="filter"></span></span>
        </div>
    */

     d3.csv("ndx.csv", function (data) {
        /* since its a csv file we need to format the data a bit */
        var dateFormat = d3.time.format("%m/%d/%Y");
        var numberFormat = d3.format(".2f");

        data.forEach(function (d) {
            d.dd = dateFormat.parse(d.date);
            d.month = d3.time.month(d.dd); // pre-calculate month for better performance
            d.close = +d.close; // coerce to number
            d.open = +d.open;
        });
         var ndx = crossfilter(data);
        var all = ndx.groupAll();
         var yearlyDimension = ndx.dimension(function (d) {
            return d3.time.year(d.dd).getFullYear();
        });
         var yearlyPerformanceGroup = yearlyDimension.group().reduce(
            /* callback for when data is added to the current filter results */
            function (p, v) {
                ++p.count;
                p.absGain += v.close - v.open;
                p.fluctuation += Math.abs(v.close - v.open);
                p.sumIndex += (v.open + v.close) / 2;
                p.avgIndex = p.sumIndex / p.count;
                p.percentageGain = (p.absGain / p.avgIndex) * 100;
                p.fluctuationPercentage = (p.fluctuation / p.avgIndex) * 100;
                return p;
            },
            /* callback for when data is removed from the current filter results */
            function (p, v) {
                --p.count;
                p.absGain -= v.close - v.open;
                p.fluctuation -= Math.abs(v.close - v.open);
                p.sumIndex -= (v.open + v.close) / 2;
                p.avgIndex = p.sumIndex / p.count;
                p.percentageGain = (p.absGain / p.avgIndex) * 100;
                p.fluctuationPercentage = (p.fluctuation / p.avgIndex) * 100;
                return p;
            },
            /* initialize p */
            function () {
                return {count: 0, absGain: 0, fluctuation: 0, fluctuationPercentage: 0, sumIndex: 0, avgIndex: 0, percentageGain: 0};
            }
        );
         var dateDimension = ndx.dimension(function (d) {
            return d.dd;
        });
         var moveMonths = ndx.dimension(function (d) {
            return d.month;
        });
         var monthlyMoveGroup = moveMonths.group().reduceSum(function (d) {
            return Math.abs(d.close - d.open);
        });
         var volumeByMonthGroup = moveMonths.group().reduceSum(function (d) {
            return d.volume / 500000;
        });
        var indexAvgByMonthGroup = moveMonths.group().reduce(
            function (p, v) {
                ++p.days;
                p.total += (v.open + v.close) / 2;
                p.avg = Math.round(p.total / p.days);
                return p;
            },
            function (p, v) {
                --p.days;
                p.total -= (v.open + v.close) / 2;
                p.avg = p.days ? Math.round(p.total / p.days) : 0;
                return p;
            },
            function () {
                return {days: 0, total: 0, avg: 0};
            }
        );
         var gainOrLoss = ndx.dimension(function (d) {
            return d.open > d.close ? "Loss" : "Gain";
        });
         var gainOrLossGroup = gainOrLoss.group();
         var fluctuation = ndx.dimension(function (d) {
            return Math.round((d.close - d.open) / d.open * 100);
        });
        var fluctuationGroup = fluctuation.group();
         var quarter = ndx.dimension(function (d) {
            var month = d.dd.getMonth();
            if (month <= 2)
                return "Q1";
            else if (month > 2 && month <= 5)
                return "Q2";
            else if (month > 5 && month <= 8)
                return "Q3";
            else
                return "Q4";
        });
        var quarterGroup = quarter.group().reduceSum(function (d) {
            return d.volume;
        });
         var dayOfWeek = ndx.dimension(function (d) {
            var day = d.dd.getDay();
            var name=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            return day+"."+name[day];
        });
        var dayOfWeekGroup = dayOfWeek.group();
         /* dc.bubbleChart("#yearly-bubble-chart", "chartGroup") */
        yearlyBubbleChart
            .width(990) // (optional) define chart width, :default = 200
            .height(250)  // (optional) define chart height, :default = 200
            .transitionDuration(1500) // (optional) define chart transition duration, :default = 750
            .margins({top: 10, right: 50, bottom: 30, left: 40})
            .dimension(yearlyDimension)
             .group(yearlyPerformanceGroup)
            .colors(colorbrewer.RdYlGn[9]) // (optional) define color function or array for bubbles
            .colorDomain([-500, 500]) //(optional) define color domain to match your data domain if you want to bind data or color
             .colorAccessor(function (d) {
                return d.value.absGain;
            })
            .keyAccessor(function (p) {
                return p.value.absGain;
            })
            .valueAccessor(function (p) {
                return p.value.percentageGain;
            })
            .radiusValueAccessor(function (p) {
                return p.value.fluctuationPercentage;
            })
            .maxBubbleRelativeSize(0.3)
            .x(d3.scale.linear().domain([-2500, 2500]))
            .y(d3.scale.linear().domain([-100, 100]))
            .r(d3.scale.linear().domain([0, 4000]))
             .elasticY(true)
            .elasticX(true)
            .yAxisPadding(100)
            .xAxisPadding(500)
            .renderHorizontalGridLines(true) // (optional) render horizontal grid lines, :default=false
            .renderVerticalGridLines(true) // (optional) render vertical grid lines, :default=false
            .xAxisLabel('Index Gain') // (optional) render an axis label below the x axis
            .yAxisLabel('Index Gain %') // (optional) render a vertical axis lable left of the y axis
             .renderLabel(true) // (optional) whether chart should render labels, :default = true
            .label(function (p) {
                return p.key;
            })
            .renderTitle(true) // (optional) whether chart should render titles, :default = false
            .title(function (p) {
                return [p.key,
                       "Index Gain: " + numberFormat(p.value.absGain),
                       "Index Gain in Percentage: " + numberFormat(p.value.percentageGain) + "%",
                       "Fluctuation / Index Ratio: " + numberFormat(p.value.fluctuationPercentage) + "%"]
                       .join("\n");
            })
             .yAxis().tickFormat(function (v) {
                return v + "%";
            });
         gainOrLossChart
            .width(180) // (optional) define chart width, :default = 200
            .height(180) // (optional) define chart height, :default = 200
            .radius(80) // define pie radius
            .dimension(gainOrLoss) // set dimension
            .group(gainOrLossGroup) // set group
            /* (optional) by default pie chart will use group.key as its label
             * but you can overwrite it with a closure */
            .label(function (d) {
                if (gainOrLossChart.hasFilter() && !gainOrLossChart.hasFilter(d.key))
                    return d.key + "(0%)";
                var label = d.key;
                if(all.value())
                    label += "(" + Math.floor(d.value / all.value() * 100) + "%)";
                return label;
            }) /*
             .renderLabel(true)
             .innerRadius(40)
             .transitionDuration(500)
             .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
             .colorDomain([-1750, 1644])
             .colorAccessor(function(d, i){return d.value;})
            */;

        quarterChart.width(180)
            .height(180)
            .radius(80)
            .innerRadius(30)
            .dimension(quarter)
            .group(quarterGroup);
         dayOfWeekChart.width(180)
            .height(180)
            .margins({top: 20, left: 10, right: 10, bottom: 20})
            .group(dayOfWeekGroup)
            .dimension(dayOfWeek)
             .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
            .label(function (d) {
                return d.key.split(".")[1];
            })
             .title(function (d) {
                return d.value;
            })
            .elasticX(true)
            .xAxis().ticks(4);
         /* dc.barChart("#volume-month-chart") */
        fluctuationChart.width(420)
            .height(180)
            .margins({top: 10, right: 50, bottom: 30, left: 40})
            .dimension(fluctuation)
            .group(fluctuationGroup)
            .elasticY(true)
             .centerBar(true)
             .gap(1)
             .round(dc.round.floor)
            .alwaysUseRounding(true)
            .x(d3.scale.linear().domain([-25, 25]))
            .renderHorizontalGridLines(true)
             .filterPrinter(function (filters) {
                var filter = filters[0], s = "";
                s += numberFormat(filter[0]) + "% -> " + numberFormat(filter[1]) + "%";
                return s;
            });
         fluctuationChart.xAxis().tickFormat(
            function (v) { return v + "%"; });
        fluctuationChart.yAxis().ticks(5);
         moveChart
            .renderArea(true)
            .width(990)
            .height(200)
            .transitionDuration(1000)
            .margins({top: 30, right: 50, bottom: 25, left: 40})
            .dimension(moveMonths)
            .mouseZoomable(true)
             .rangeChart(volumeChart)
            .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .elasticY(true)
            .renderHorizontalGridLines(true)
            .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
            .brushOn(false)
             .group(indexAvgByMonthGroup, "Monthly Index Average")
            .valueAccessor(function (d) {
                return d.value.avg;
            })
             .stack(monthlyMoveGroup, "Monthly Index Move", function (d) {
                return d.value;
            })
             .title(function (d) {
                var value = d.value.avg ? d.value.avg : d.value;
                if (isNaN(value)) value = 0;
                return dateFormat(d.key) + "\n" + numberFormat(value);
            });

        volumeChart.width(990)
            .height(40)
            .margins({top: 0, right: 50, bottom: 20, left: 40})
            .dimension(moveMonths)
            .group(volumeByMonthGroup)
            .centerBar(true)
            .gap(1)
            .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
            .round(d3.time.month.round)
            .alwaysUseRounding(true)
            .xUnits(d3.time.months);

        /*
         <div id="data-count">
            <span class="filter-count"></span> selected out of <span class="total-count"></span> records
        </div>
        */
        dc.dataCount(".dc-data-count")
            .dimension(ndx)
            .group(all)
             .html({
                some:"<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records | <a href='javascript:dc.filterAll(); dc.renderAll();''>Reset All</a>",
                all:"All records selected. Please click on the graph to apply filters."
            });

        /*
         <!-- anchor div for data table -->
        <div id="data-table">
            <!-- create a custom header -->
            <div class="header">
                <span>Date</span>
                <span>Open</span>
                <span>Close</span>
                <span>Change</span>
                <span>Volume</span>
            </div>
            <!-- data rows will filled in here -->
        </div>
        */
        dc.dataTable(".dc-data-table")
            .dimension(dateDimension)
             .group(function (d) {
                var format = d3.format("02d");
                return d.dd.getFullYear() + "/" + format((d.dd.getMonth() + 1));
            })
            .size(10) // (optional) max number of records to be shown, :default = 25
             .columns([
                function (d) {
                    return d.date;
                },
                function (d) {
                    return numberFormat(d.open);
                },
                function (d) {
                    return numberFormat(d.close);
                },
                function (d) {
                    return numberFormat(d.close - d.open);
                },
                function (d) {
                    return d.volume;
                }
            ])
             .sortBy(function (d) {
                return d.dd;
            })
             .order(d3.ascending)
             .renderlet(function (table) {
                table.selectAll(".dc-table-group").classed("info", true);
            });

        /*
         dc.geoChoroplethChart("#us-chart")
            .width(990) // (optional) define chart width, :default = 200
            .height(500) // (optional) define chart height, :default = 200
            .transitionDuration(1000) // (optional) define chart transition duration, :default = 1000
            .dimension(states) // set crossfilter dimension, dimension key should match the name retrieved in geo json layer
            .group(stateRaisedSum) // set crossfilter group
             .colors(["#ccc", "#E2F2FF","#C4E4FF","#9ED2FF","#81C5FF","#6BBAFF","#51AEFF","#36A2FF","#1E96FF","#0089FF","#0061B5"])
             .colorDomain([-5, 200])
             .colorAccessor(function(d, i){return d.value;})
             .overlayGeoJson(statesJson.features, "state", function(d) {
                return d.properties.name;
            })
             .title(function(d) {
                return "State: " + d.key + "\nTotal Amount Raised: " + numberFormat(d.value ? d.value : 0) + "M";
            });
             dc.bubbleOverlay("#bubble-overlay")
                 .svg(d3.select("#bubble-overlay svg"))
                .width(990) // (optional) define chart width, :default = 200
                .height(500) // (optional) define chart height, :default = 200
                .transitionDuration(1000) // (optional) define chart transition duration, :default = 1000
                .dimension(states) // set crossfilter dimension, dimension key should match the name retrieved in geo json layer
                .group(stateRaisedSum) // set crossfilter group
                 .keyAccessor(function(p) {return p.value.absGain;})
                 .valueAccessor(function(p) {return p.value.percentageGain;})
                 .colors(["#ccc", "#E2F2FF","#C4E4FF","#9ED2FF","#81C5FF","#6BBAFF","#51AEFF","#36A2FF","#1E96FF","#0089FF","#0061B5"])
                 .colorDomain([-5, 200])
                 .colorAccessor(function(d, i){return d.value;})
                 .radiusValueAccessor(function(p) {return p.value.fluctuationPercentage;})
                 .r(d3.scale.linear().domain([0, 3]))
                 .renderLabel(true)
                 .label(function(p) {return p.key.getFullYear();})
                 .renderTitle(true)
                 .title(function(d) {
                    return "Title: " + d.key;
                })
                 .point("California", 100, 120)
                .point("Colorado", 300, 120)
                 .debug(true);
        */
         dc.renderAll();
        /*
         dc.renderAll("group");
         dc.redrawAll();
         dc.redrawAll("group");
        */
    });

    d3.selectAll("#version").text(dc.version);

  })
};


