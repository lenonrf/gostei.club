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
    'ngTouch',
    'ui.mask',
    'ui.bootstrap.showErrors'
  ])
  .config(function ($routeProvider, $httpProvider, showErrorsConfigProvider) {

    //$httpProvider.defaults.withCredentials = true;


    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    showErrorsConfigProvider.showSuccess(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/perguntas', {
        templateUrl: 'views/perguntas.html',
        controller: 'PerguntasCtrl'
      })
      .when('/sucesso', {
        templateUrl: 'views/sucesso.html',
        controller: 'SucessoCtrl'
      })
      .when('/degraca', {
        templateUrl: 'views/degraca.html',
        controller: ''
      })
      .when('/depoimentos', {
        templateUrl: 'views/depoimentos.html',
        controller: ''
      })
      .when('/marcas', {
        templateUrl: 'views/marcas.html',
        controller: ''
      })
      .otherwise({
        redirectTo: '/'
      });
  });
