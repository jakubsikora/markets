$(function () {
    Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });

    // Create the chart
    $('#chart').highcharts('StockChart', {
        chart : {
            events : {
                load : function () {
                  var that = this;
                  // set up the updating of the chart each second
                  var bidSeries = this.series[0];
                  var askSeries = this.series[1];

                  setInterval(function() {
                    markets.forEach(function(market) {
                      // that.addSeries({
                      //   name: market.id,
                      //   data: []
                      // });
                      bidSeries.addPoint([(new Date).getTime(), Number(market.bid)], true, false);
                      askSeries.addPoint([(new Date).getTime(), Number(market.ask)], true, false);
                    });
                  }, 2000);

                  // window.subscribeToMarket('eurusd', function(tick) {
                  //     var bid = null;
                  //     var ask = null;
                  //     if (tick.bid !== 'undefined') {
                  //         bid = Number(parseFloat(tick.bid).toFixed(6));
                  //         bidSeries.addPoint([tick.time, bid], true, false);
                  //     }

                  //     // if (tick.ask !== 'undefined') {
                  //     //     ask = Number(parseFloat(tick.ask).toFixed(6));
                  //     //     askSeries.addPoint([tick.time, ask], true, false);
                  //     // }
                  // });

                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },

        title : {
            text : 'Live market data'
        },

        exporting: {
            enabled: false
        },

        series : [{
            name : 'Bid',
            data : [ ],
        },{
            name : 'Ask',
            data : [ ],
        }]
    });

});
