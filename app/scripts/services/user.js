'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.User
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
 angular.module('gosteiclubApp')
 .factory('User', function ($resource) {

  this.data = {};
  var self = this;

  var actions = {

    'get' : {
      method: 'GET',
      isArray:true,
      interceptor : {
        response : function (response) {
          self.data.item = angular.extend(self.data.item, response.data.item);
          return self.data;
        }
      }
    },    
  };

  this.resource = $resource('/api/users/', {}, actions);


  this.getCachedData = function(){
    return self.data;
  };

  return this;
});
