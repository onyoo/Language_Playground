describe('Tests are working', function() {

  var $controller;
  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should display a hello world message', function() {
    var $scope = {};
    var controller = $controller('StrockCtrl', { $scope, $scope });
    expect(controller.hello).toEqual("Ok let's test this....");
  })
})
