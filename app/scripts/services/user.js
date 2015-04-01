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
      url: '/api/users',
      interceptor : {
        response : function(response){
          self.data = response.data;
          return self.data;
        }
      }
        
    }
  };

  this.resource = $resource(null, {}, actions);

  this.isLoogedIn = function(){
    return self.data.logged;
  };

  this.getCachedData = function(){
    return self.data;
  };

  return this;
});
