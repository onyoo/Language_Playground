function StockService() {
  var stocks = []

  this.stocks =  stocks.push({
    name: "Apple Inc",
    symbol: "AAPL",
    lastPrice: 524.49,
    change: 15.6,
    changePercent: 3.06549549018453,
    timestamp: "Wed Oct 23 13:39:19 UTC-06:00 2013",
    mSDate:  41570.568969907,
    marketCap: 476497591530,
    volume: 397562,
    changeYTD: 532.1729,
    changePercentYTD: -1.44368493773359,
    high: 52499,
    low: 519.175,
    open: 519.175
  });

  stocks.pushStocks = function(){
    stocks.push({
      name: "Apple Inc",
      symbol: "AAPL",
      lastPrice: 524.49,
      change: 15.6,
      changePercent: 3.06549549018453,
      timestamp: "Wed Oct 23 13:39:19 UTC-06:00 2013",
      mSDate:  41570.568969907,
      marketCap: 476497591530,
      volume: 397562,
      changeYTD: 532.1729,
      changePercentYTD: -1.44368493773359,
      high: 52499,
      low: 519.175,
      open: 519.175
    });
  }

debugger;
  return stocks;
}

angular
  .module('app')
  .service('stockService', StockService)
