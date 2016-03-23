function StockCtrl () {
  this.sayings = [{
    hi: "hello",
    bye: 'bye'
  },{
    hi: "hola",
    bye: 'adios'
  },{
    hi: "안녕하세요",
    bye: '안녕히계세요'
  }];
}

angular
  .module('app')
  .controller('StockCtrl', StockCtrl)
