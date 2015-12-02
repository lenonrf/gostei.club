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
    'ui.mask',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap.showErrors',
    'ui.bootstrap.modal',
    'angulartics',
    'angulartics.google.analytics',
    'ng.deviceDetector'
  ])
  .config(function ($routeProvider, $httpProvider, showErrorsConfigProvider) {

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
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
