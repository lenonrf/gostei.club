'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('Canal', function ($resource, $http, Utils) {

    this.data = {};
    var self = this;

    this.resource = $resource('/api/canais/:id');

    this.getData = function(){
      return self.data;
    };

    this.setData = function(data){
      return self.data = data;
    };

    this.getCanais = function(user) {
      this.resource.query(function(data){
        console.log('canais', data);
        return data;
      }, function(err){ });
    };


    /**
     * Retorna o canal do usuario
     * @param location
     * @returns {string}
     */
    this.defineUserCanal = function(location, canais){

      var canalParam = 'gostei.club';

      if(!Utils.isEmpty(location.search().utm_source)){
        canalParam = location.search().utm_source;
      }


      return canalParam;


    };


    return this;

  });
