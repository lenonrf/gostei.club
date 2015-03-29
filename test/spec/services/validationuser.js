'use strict';

describe('Service: ValidationUser', function () {

  // load the service's module
  beforeEach(module('gosteiclubApp'));

  // instantiate service
  var ValidationUser;
  beforeEach(inject(function (_ValidationUser_) {
    ValidationUser = _ValidationUser_;
  }));

  it('should do something', function () {
    expect(!!ValidationUser).toBe(true);
  });

});
