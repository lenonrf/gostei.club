'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('Cep', function ($resource) {

    this.data = {};
    var self = this;

    this.resource = $resource('http://cep.correiocontrol.com.br/:cep.json');

    this.getData = function(){
      return self.data;
    };

    this.setData = function(data){
      return self.data = data;
    };



    return this;

  });
