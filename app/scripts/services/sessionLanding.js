'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('SessionLanding', function ($http) {

    this.data = {};



    this.getSessionCodeByLocation = function(location){

      var sessionCode = null;

      switch (location.path()){

        case '/':
          sessionCode = 'amostras';
          break;

        case '/revendas':
          sessionCode = 'revendas';
          break;
      }

      return sessionCode

    };




    this.getSessionLanding = function(location, rootScope){

      var sessionCode = this.getSessionCodeByLocation(location);

      if(sessionCode != null){
        $http.get('/api/sessionlanding?code='+sessionCode).success(function(data){
          rootScope.sessionLanding = data[0];
        }).error(function(){});
      }

    };



    return this;

  });
