$(function () {
  Highcharts.setOptions({
      global : {
          useUTC : false
      }
  });

  // Create the chart
  $('#container').highcharts('StockChart', {
      chart : {
          events : {
              load : function () {
                // set up the updating of the chart each second
                var series = this.series[0];
                console.log(series);
                setInterval(function () {
                    var x = markets[0].timestamp,
                        y = parseFloat(markets[0].ask);

                    console.log(x, y);

                    series.addPoint([x, y], true, true);
                }, 1000);
              }
          }
      },

      rangeSelector: {
          selected: 1
      },

      title : {
          text : 'Live Markets data'
      },

      exporting: {
          enabled: false
      },

      series : [{
        name : 'Data',
        data : [
          [1429983167319,1.2333],
          [1429983720015, 1.250348]
        ],
        tooltip: {
           valueDecimals: 6
        }
      }]
  });
});
