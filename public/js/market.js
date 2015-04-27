var POSITIVE_CLASS = 'positive',
    NEGATIVE_CLASS = 'negative';

/**
 * Market class
 */
var Market = function(id) {
  this.id = id;
  this.time = null;

  this.bid = '-';
  this.bidClass = null;
  this.bids = [];

  this.ask = '-';
  this.askClass = null;
  this.asks = [];

  this.avg = '-';
  this.avgClass = null;

  this.active = false;
  this.avgTicks = 10;
};

/**
 * Activate market and start fetching the prices.
 */
Market.prototype.activate = function() {
  var that = this;
  that.active = true;

  window.subscribeToMarket(that.id, function(tick) {
    that.updateMarket(tick);
  });
};

/**
 * Deactivate market and stop fetching the prices.
 */
Market.prototype.deactivate = function() {
  var that = this;
  this.active = false;

  window.unsubscribeFromMarket(that.id);
};

/**
 * Update market properties.
 */
Market.prototype.updateMarket = function(data) {
  this.formatTime(data.time);
  this.formatBid(data.bid);
  this.formatAsk(data.ask);
  this.calculateAvg(data);
};

/**
 * Format time based on timestamp to HH:mm:ss.
 */
Market.prototype.formatTime = function(timestamp) {
  var date = new Date(timestamp),
      hours = date.getHours(),
      mins = date.getMinutes(),
      sec = date.getSeconds();

  this.time = (hours < 10 ? '0' + hours : hours)
              + ':'
              + (mins < 10 ? '0' + mins : mins)
              + ':'
              + (sec < 10 ? '0' + sec : sec);
};

/**
 * Format bid price and update it render class to show positive/negative
 * indicators.
 */
Market.prototype.formatBid = function(bid) {
  var newBid;
  this.bidClass = null;

  if (bid === 'undefined') return;
  newBid = this.formatPrice(bid);

  if (newBid > this.bid) this.bidClass = POSITIVE_CLASS;
  if (newBid < this.bid) this.bidClass = NEGATIVE_CLASS;
  this.bid = newBid;
};

/**
 * Format ask price and update it render class to show positive/negative
 * indicators.
 */
Market.prototype.formatAsk = function(ask) {
  var newAsk;
  this.askClass = null;

  if (ask  === 'undefined') return;
  newAsk = this.formatPrice(ask);

  if (newAsk > this.ask) this.askClass = POSITIVE_CLASS;
  if (newAsk < this.ask) this.askClass = NEGATIVE_CLASS;
  this.ask = newAsk;
};

/**
 * Format price to 6 decimal places.
 */
Market.prototype.formatPrice = function(price) {
  return parseFloat(price).toFixed(6);
};

/**
 * Calculate moving average based on full 10 ticks for bid and ask prices.
 */
Market.prototype.calculateAvg = function(data) {
  var that = this,
      bidAvg = 0,
      askAvg = 0;

  if (data.bid !== 'undefined') {
    // Remove first element from the array if max hit.
    if (this.bids.length === this.avgTicks) this.bids.shift();

    this.bids.push(data.bid);
  }

  if (data.ask  !== 'undefined') {
    // Remove first element from the array if max hit.
    if (this.asks.length === this.avgTicks) this.asks.shift();

    this.asks.push(data.ask);
  }

  // Check if we have enough data to calculate avg.
  if (this.bids.length === this.avgTicks
      && this.asks.length === this.avgTicks) {

    this.bids.forEach(function(bid) {
      bidAvg = parseFloat(bidAvg) + parseFloat(bid);
    });

    bidAvg = bidAvg / this.avgTicks;

    this.asks.forEach(function(ask) {
      askAvg = parseFloat(askAvg) + parseFloat(ask);
    });

    askAvg = askAvg / this.avgTicks;

    // Calculate moving avg.
    this.avg = that.formatPrice(bidAvg - askAvg);
  }
};