var POSITIVE_CLASS = 'positive',
    NEGATIVE_CLASS = 'negative';

var Market = function(id) {
  this.time = null;
  this.timestamp = null;
  this.bid = '-';
  this.bidClass = null;
  this.ask = '-';
  this.askClass = null;
  this.avg = '-';
  this.avgClass = null;
  this.active = false;
  this.bids = [];
  this.asks = [];
  this.avgTicks = 10;
  this.id = id;
};

Market.prototype.activate = function() {
  var that = this;
  that.active = true;

  window.subscribeToMarket(that.id, function(tick) {
    that.updateMarket(tick);
  });
};

Market.prototype.deactivate = function() {
  var that = this;
  this.active = false;
  window.unsubscribeFromMarket(that.id);
};

Market.prototype.updateMarket = function(data) {
  this.timestamp = data.time;
  this.formatTime(data.time);
  this.formatBid(data.bid);
  this.formatAsk(data.ask);
  this.calculateAvg(data);
};

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

Market.prototype.formatBid = function(bid) {
  var newBid;
  this.bidClass = null;

  if (bid === 'undefined') return;
  newBid = this.formatPrice(bid);

  if (newBid > this.bid) this.bidClass = POSITIVE_CLASS;
  if (newBid < this.bid) this.bidClass = NEGATIVE_CLASS;
  this.bid = newBid;
};

Market.prototype.formatAsk = function(ask) {
  var newAsk;
  this.askClass = null;

  if (ask  === 'undefined') return;
  newAsk = this.formatPrice(ask);

  if (newAsk > this.ask) this.askClass = POSITIVE_CLASS;
  if (newAsk < this.ask) this.askClass = NEGATIVE_CLASS;
  this.ask = newAsk;
};

Market.prototype.formatPrice = function(price) {
  return parseFloat(price).toFixed(6);
};

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

    this.avg = that.formatPrice(bidAvg - askAvg);
  }
};