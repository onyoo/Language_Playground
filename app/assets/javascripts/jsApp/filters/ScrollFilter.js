function ScrollFilter(docService) {
  return function(items, count) {
    return items.slice(count, count + 20)
  }
}

angular
  .module('app')
  .filter('scrollFilter', ScrollFilter)
