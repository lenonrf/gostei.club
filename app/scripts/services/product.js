'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('Product', function ($resource) {

    this.data = {};
    var self = this;

    this.resource = $resource('/api/products/:id');

    this.getData = function(){
      return self.data;
    };

    this.setData = function(data){
      return self.data = data;
    };


    return this;

  });
