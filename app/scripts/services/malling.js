'use strict';

angular.module('gosteiclubApp')
  .service('Malling', function ($http) {



  var server = '127.0.0.1:3009'


    this.createContact = function(user){

      $http.post(server+'/malling/contact', user)
        .success(function(data, status) {
          console.log('createContact', data, status)
        });
    };




  });
