'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.User
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
 angular.module('gosteiclubApp')
 .factory('User', function ($resource, Utils) {

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


     /**
      * Define se o usuario esta vondp atraves de uma landingpage
      * @param location
      * @returns {boolean}
      */
     this.isUserFromLandingPage = function(location) {

       var isEmailParameter = !Utils.isEmpty(location.search().email);
       var isUtmSourceParameter = !Utils.isEmpty(location.search().utm_source);

       if (isEmailParameter && isUtmSourceParameter) {
         return true;
       }

       return false;

     };



     /**
      * Retorna a o subID da campanha
      * @param location
      * @returns {boolean}
      */
     this.getCampaing = function(location) {

       var isUtmCampaingParameter = !Utils.isEmpty(location.search().utm_campaign);

       if (isUtmCampaingParameter) {
         return location.search().utm_campaign;
       }

       if(location.path() === '/perguntas'){
         return 'GPG';
       }

       if(location.path() === '/home'){
         return 'GBC';
       }


     };




     /**
      * Define se o usuario esta vondp atraves de uma landingpage
      * @param location
      * @returns {boolean}
      */
     this.isUserFromEmail = function(location) {

       var isEmailParameter = !Utils.isEmpty(location.search().email);

       if (isEmailParameter) {
         return true;
       }

       return false;

     };


     this.getData = function(){
       return self.data;
     };

     this.setData = function(data){
       return self.data = data;
     };

     this.setLogged = function(isLogged){
       self.data.isLogged = {};
       return self.data.isLogged = isLogged;
     };


     /**
      * Verifica se o usuario esta completo
      * @param isLogged
      * @returns {*}
      */
     this.isUserCompleted = function(user){
       //console.log('user', user);
       //console.log('isUserCompleted', user.address.zipcode !== "" ? true : false);

       return user.address.zipcode !== "" ? true : false;
     };

     return this;

});
