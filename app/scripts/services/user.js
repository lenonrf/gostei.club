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

  return $resource('/api/users/:email', {}, {salvar: {method:'POST', isArray:true}});

/*
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

  this.resource = 


  this.getCachedData = function(){
    return self.data;
  };

  return this;*/
});
