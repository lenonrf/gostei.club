'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Question
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('Campaing', function ($resource) {


    this.data = {};
    var self = this;

    this.resource = $resource('/api/oportunities/:id');

    this.getData = function(){
      return self.data;
    };

    this.setData = function(data){
      return self.data = data;
    };




    return this;

  });
