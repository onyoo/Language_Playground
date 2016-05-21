function D3Controller() {
  this.d3Data = [
    {date: '4-Apr-12', close: 34},
    {date: '5-Apr-12', close: 45},
    {date: '6-Apr-12', close: 37},
    {date: '7-Apr-12', close: 56},
    {date: '9-Apr-12', close: 50},
    {date: '10-Apr-12', close: 80},
    {date: '11-Apr-12', close: 25},
    {date: '12-Apr-12', close: 48},
    {date: '13-Apr-12', close: 50},
    {date: '14-Apr-12', close: 87}
  ]
}

angular
  .module('app')
  .controller('D3Controller', D3Controller);
