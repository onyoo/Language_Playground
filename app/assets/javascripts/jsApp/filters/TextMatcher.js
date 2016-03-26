function TextMatcher(docService) {
  return function(input, index) {
    var doc = docService.document.body;
    debugger;
    if( doc[index] != input ) {
      return doc.replace(index, '<span class="super-class">$1</span>');
    }
    return;
  }
}

angular
  .module('app')
  .filter('textMatcher', TextMatcher)
