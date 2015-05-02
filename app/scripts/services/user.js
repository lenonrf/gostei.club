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


     this.resource = $resource('/api/users;email=:email',
       { email: ' @email'}, {

         put: {
           method: 'PUT',
           interceptor: {
             response: function(response){
               response.data.birthDate = getDateFormated(response.data.birthDate);
               return response.data;
             }
           }
         },

         get: {
           method: 'GET',
           interceptor: {
             response: function(response){
               response.data.birthDate = getDateFormated(response.data.birthDate);
               return response.data;
             }
           }
         }
     });

     function getDateFormated(dateResponse){

       var date = new Date(dateResponse);

       var day = ("0" + date.getDate()).slice(-2);
       var month = ("0" + (date.getMonth() + 1)).slice(-2);
       var year = date.getFullYear();

       return day+''+month+''+year;
     }



     this.getData = function(){
       return self.data;
     };

     this.setData = function(data){
       return self.data = data;
     };

     return this;

});
