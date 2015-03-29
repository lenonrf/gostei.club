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
    

    var resource = $resource('localhost:3009/user/:userId',
      {
        userId:'userId'

      }, {
        charge: {
          method:'POST', 
          params:{
            charge:true
          }
        }
    });

    return {
      getResource: function () {
        return resource;
      }
    };
  });
