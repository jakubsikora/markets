var MarketBox = React.createClass({
  getInitialState: function() {
    return {data: [markets[0]]};
  },
  componentDidMount: function() {
    this.loadMarkets();
    setInterval(this.loadMarkets, 1000);
  },
  loadMarkets: function() {
    var activeMarkets = markets.filter(function(market) {
      return market.active;
    });

    this.setState({data: activeMarkets});
  },
  render: function() {
    return (
      <div>
        <table className="market-box table table-bordered table-condensed">
          <tr>
            <th>Market</th>
            <th>Bid</th>
            <th>Ask</th>
            <th>Avg</th>
            <th>Time</th>
            <th></th>
          </tr>
          <MarketList data={this.state.data}></MarketList>
        </table>
        <MarketForm list={marketList} />
      </div>
    );
  }
});

var MarketList = React.createClass({
  render: function() {
    var marketNodes = this.props.data.map(function(market) {
      return (
        <MarketItem id={market.id}
                    bid={market.bid}
                    ask={market.ask}
                    avg={market.avg}
                    time={market.time}
                    bidClass={market.bidClass}
                    askClass={market.askClass}></MarketItem>
      );
    });

    return (
      <tbody>
        {marketNodes}
      </tbody>
    );
  }
});

var MarketItem = React.createClass({
  removeMarket: function(marketId) {
    var market = findById(marketId);
    market.deactivate();
    markets.splice(markets.indexOf(market), 1);
  },
  render: function() {
    var that = this;
    return (
      <tr className="custom">
        <td className="market-id">{this.props.id}</td>
        <td className={this.props.bidClass}>{this.props.bid}</td>
        <td className={this.props.askClass}>{this.props.ask}</td>
        <td className="market-avg">{this.props.avg}</td>
        <td className="market-time">{this.props.time}</td>
        <td className="market-action">
          <input className="btn btn-danger"
                 type="button"
                 value="Remove"
                 onClick={this.removeMarket.bind(this, that.props.id)} />
        </td>
      </tr>
    )
  }
});

var MarketForm = React.createClass({
  addMarket: function(e) {
    var marketId,
        market;
    e.preventDefault();

    marketId = React.findDOMNode(this.refs.marketId).value.trim();
    if (!marketId) return;

    if (marketExist(marketId) === -1) {
      market = new Market(marketId);
      market.activate();
      markets.push(market);
    }

    return;
  },
  render: function() {
    var marketNodes = this.props.list.map(function(market) {
      return (
        <MarketOption id={market}></MarketOption>
      );
    });

    return (
      <form className="form-inline" onSubmit={this.addMarket}>
        <div className="form-group">
          <select className="form-control" ref="marketId">
            <option value="">-- Choose new market --</option>
            {marketNodes}
          </select>
        </div>

        <input type="submit" className="btn btn-success" value="Add" />
      </form>
    );
  }
});

var MarketOption = React.createClass({
  render: function() {
    var market = findById(this.props.id);

    if (market) {
      return (
        <option value={this.props.id} disabled="disabled">{this.props.id}</option>
      )
    }

    return (
      <option value={this.props.id}>{this.props.id}</option>
    )
  }
});

React.render(
  <MarketBox />,
  document.getElementById('content')
);