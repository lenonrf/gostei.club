'use strict';

angular.module('gosteiclubApp')
  .service('Malling', function ($http) {


    this.createContact = function(user){

      $http.post('/api/malling/contact', user)
        .then(function(data, status) {
          //console.log('data', data, status);
        });
    };


    this.updateContact = function(user){

      $http.put('/api/malling/contact/'+user.email, user)
        .then(function(data, status) {});
    };


    this.sendWelcomeMail = function(user){

      $http.post('/api/malling/welcome/'+user.email, user)
        .then(function(data, status) {});
    };




  });
