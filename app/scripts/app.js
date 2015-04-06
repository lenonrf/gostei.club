'use strict';

/**
 * @ngdoc overview
 * @name gosteiclubApp
 * @description
 * # gosteiclubApp
 *
 * Main module of the application.
 */
angular
  .module('gosteiclubApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/perguntas', {
        templateUrl: 'views/perguntas.html',
        controller: 'PerguntasCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
