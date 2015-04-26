var markets = [],
    EURUSD_MARKET_ID = 'eurusd',
    GBPUSD_MARKET_ID = 'gbpusd',
    EURGBP_MARKET_ID = 'eurgbp',
    marketList = [EURUSD_MARKET_ID, GBPUSD_MARKET_ID, EURGBP_MARKET_ID];

init();

/**
 * Initialize app with EURUSD_MARKET_ID market
 */
function init() {
  var market = new Market(EURUSD_MARKET_ID);
  market.activate();
  markets.push(market);
}

function marketExist(marketId) {
  return markets.map(function(market) {
    return market.id;
  }).indexOf(marketId);
}

function findById(marketId) {
  return markets.filter(function(market) {
    return market.id === marketId;
  })[0];
}