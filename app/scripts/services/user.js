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

     this.resource = $resource('/api/users/:email');

     this.getData = function(){
       return self.data;
     };

     this.setData = function(data){
       return self.data = data;
     };

     return this;

});
