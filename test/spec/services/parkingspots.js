'use strict';

describe('Service: ParkingSpots', function () {

  // load the service's module
  beforeEach(module('yeomanApp'));

  // instantiate service
  var ParkingSpots;
  beforeEach(inject(function (_ParkingSpots_) {
    ParkingSpots = _ParkingSpots_;
  }));

  it('should do something', function () {
    expect(!!ParkingSpots).toBe(true);
  });

});
