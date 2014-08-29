'use strict';

describe('Controller: ParkingspotslistCtrl', function () {

  // load the controller's module
  beforeEach(module('easyparkangularApp'));

  var ParkingspotslistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ParkingspotslistCtrl = $controller('ParkingspotslistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
