'use strict';


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
    'ng.deviceDetector',
    'pascalprecht.translate',

  ])
  .config(function ($locationProvider, $routeProvider, $httpProvider, $translateProvider,
                    AppTranslateFRProvider, AppTranslateBRProvider, showErrorsConfigProvider) {



    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('languageInterceptor');
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


    $translateProvider.translations('pt-BR-RVD', {

      'LOGO_IMG' : AppTranslateBRProvider.getLogo(),
      'LOGO_SIZE' : '115px',

      'TITLE'   : AppTranslateBRProvider.getTitle('pt-BR-RVD'),
      'MAIN'    : AppTranslateBRProvider.getMain('pt-BR-RVD'),
      'BRANDS'  : AppTranslateBRProvider.getBrands('pt-BR-RVD'),
      'BGHOME'  : AppTranslateBRProvider.getBgHome('pt-BR-RVD'),
      'MENU'    : AppTranslateBRProvider.getMenuItems(),
      'FIELDS'  : AppTranslateBRProvider.getFields(),
      'DEGRACA' : AppTranslateBRProvider.getItsFree(),
      'FOOTER'  : AppTranslateBRProvider.getFooter(),

      'HALL' : AppTranslateBRProvider.getHall(),
      'HOME' : AppTranslateBRProvider.getHome(),
      'VALIDATION' : AppTranslateBRProvider.getValidation()


    });



    $translateProvider.translations('pt-BR-AMT', {

      'LOGO_IMG' : AppTranslateBRProvider.getLogo(),
      'LOGO_SIZE' : '115px',

      'TITLE'   : AppTranslateBRProvider.getTitle('pt-BR-AMT'),
      'MAIN'    : AppTranslateBRProvider.getMain('pt-BR-AMT'),
      'BRANDS'  : AppTranslateBRProvider.getBrands('pt-BR-AMT'),
      'BGHOME'  : AppTranslateBRProvider.getBgHome('pt-BR-AMT'),
      'MENU'    : AppTranslateBRProvider.getMenuItems(),
      'FIELDS'  : AppTranslateBRProvider.getFields(),
      'DEGRACA' : AppTranslateBRProvider.getItsFree(),
      'FOOTER'  : AppTranslateBRProvider.getFooter(),
      'TESTIMONIALS' : AppTranslateBRProvider.getTestimonials(),
      'OPORTUNITY'   : AppTranslateBRProvider.getOportunity(),

      'HALL' : AppTranslateBRProvider.getHall(),
      'HOME' : AppTranslateBRProvider.getHome(),
      'VALIDATION' : AppTranslateBRProvider.getValidation()

    });


    $translateProvider.translations('pt-BR-VDC', {

      'LOGO_IMG' : AppTranslateBRProvider.getLogo(),
      'LOGO_SIZE' : '115px',

      'TITLE'   : AppTranslateBRProvider.getTitle('pt-BR-VDC'),
      'MAIN'    : AppTranslateBRProvider.getMain('pt-BR-VDC'),
      'BGHOME'  : AppTranslateBRProvider.getBgHome('pt-BR-VDC'),
      'DEGRACA' : AppTranslateBRProvider.getItsFree('pt-BR-VDC'),
      'MENU'    : AppTranslateBRProvider.getMenuItems(),
      'FIELDS'  : AppTranslateBRProvider.getFields(),
      'FOOTER'  : AppTranslateBRProvider.getFooter(),

      'HALL' : AppTranslateBRProvider.getHall(),
      'HOME' : AppTranslateBRProvider.getHome(),
      'VALIDATION' : AppTranslateBRProvider.getValidation()

    });





    $translateProvider.translations('fr-FR', {

      'LOGO_IMG' : AppTranslateFRProvider.getLogo(),
      'LOGO_SIZE' : '140px',

      'TITLE'   : AppTranslateFRProvider.getTitle(),
      'MAIN'    : AppTranslateFRProvider.getMain(),
      'BRANDS'  : AppTranslateFRProvider.getBrands(),
      'BGHOME'  : AppTranslateFRProvider.getBgHome(),
      'MENU'    : AppTranslateFRProvider.getMenuItems(),
      'FIELDS'  : AppTranslateFRProvider.getFields(),
      'DEGRACA' : AppTranslateFRProvider.getItsFree(),
      'FOOTER'  : AppTranslateFRProvider.getFooter(),
      'TESTIMONIALS' : AppTranslateFRProvider.getTestimonials(),
      'OPORTUNITY'   : AppTranslateFRProvider.getOportunity(),

      'HALL' : AppTranslateFRProvider.getHall(),
      'HOME' : AppTranslateFRProvider.getHome(),
      'VALIDATION' : AppTranslateFRProvider.getValidation()


    });


    $translateProvider.preferredLanguage('pt-BR');
    $translateProvider.useSanitizeValueStrategy('escapeParameters');


  })

  .factory('languageInterceptor', function ($cookieStore, $translate, $location) {
    return {

      request: function (config) {

        switch ($location.host()){

          case 'www.gostei.club':
          case 'gostei.club':
            config.headers['x-language-origin'] = 'pt-BR';
            $translate.use('pt-BR-AMT');
            break;

          case 'www.revendas.gostei.club':
          case 'revendas.gostei.club':
            config.headers['x-language-origin'] = 'pt-BR';
            $translate.use('pt-BR-RVD');
            break;

          case 'www.videncias.gostei.club':
          case 'videncias.gostei.club':
            config.headers['x-language-origin'] = 'pt-BR';
            $translate.use('pt-BR-VDC');
            break;

          case 'www.opportunités.club':
          case 'opportunités.club':
          case 'www.opportunites.club':
          case 'opportunites.club':
            config.headers['x-language-origin'] = 'fr-FR';
            $translate.use('fr-FR');
            break;
        }

        return config;

      }
    };
  });
