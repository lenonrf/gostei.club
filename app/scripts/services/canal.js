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

    this.resource = $resource('/api/canais/:id',{},{
      query: {
        method:'GET', isArray:true
      }
    });

    this.getData = function(){
      return self.data;
    };

    this.setData = function(data){
      return self.data = data;
    };

    this.getCanais = function(user) {
      this.resource.query(function(data){
        return data;
      }, function(err){ });
    };


    /**
     * Retorna o canal do usuario
     * @param location
     * @returns {string}
     */
    this.defineUserCanal = function(location){

      var canalParam = location.host(); //'gostei.club';
      canalParam = canalParam.replace('www.','');

      if(!Utils.isEmpty(location.search().utm_source)){
        canalParam = location.search().utm_source;
      }

      return canalParam;


    };


    return this;

  });
