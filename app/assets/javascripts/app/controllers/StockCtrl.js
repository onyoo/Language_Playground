function StockCtrl (stockService) {
  this.getStocks = function(){
    stockService.pushStocks();
  }

  this.stocks = stockService;
}

angular
  .module('app')
  .controller('StockCtrl', StockCtrl)
