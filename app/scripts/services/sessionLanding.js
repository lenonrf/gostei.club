'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('SessionLanding', function ($translate, $location) {

    this.data = {};

    this.getOriginTraficSource = function(location){

      var originTraficSource = 'organic'

      if(location.search().utm_source){
      
        originTraficSource = location.search().utm_source.toLowerCase();
      
      }else{

        if(location.search().utm_campaign){

          switch(location.search().utm_campaign.toLowerCase()){

            case 'g_amostras':
            case 'g_trabalhe':
            case 'g_revenda':
            case 'g_testadores':
            case 'g_relevancia':
            case 'g_promocoes':
            case 'g_pesquisas':
            case 'g_ganhardinheiro':
              originTraficSource = 'google';
              break;
          }
        }
      }

      return originTraficSource;

    };




    this.isOutBrain = function(location){
      if(location.search().utm_source){
        return (location.search().utm_source.toLowerCase() === 'outbrain');
      }

      return false;
    };

    this.isTaboola = function(location){
      if(location.search().utm_source){
        return (location.search().utm_source.toLowerCase() === 'taboola');
      }

      return false;
    };



    this.getItemsMenu = function(controller){

      var sessionLandingCode = this.getSessionCode($location);

      var menuItemsTranslation = {
        freeSamples: {nome: $translate.instant('MENU.FREESAMPLES_NAME'), href: $translate.instant('MENU.FREESAMPLES_HREF')},
        itsFree: {nome: $translate.instant('MENU.ITSFREE_NAME'), href: $translate.instant('MENU.ITSFREE_HREF')},
        oportunity: {nome: $translate.instant('MENU.OPORTUNITY_NAME'), href: $translate.instant('MENU.OPORTUNITY_HREF')},
        testimonials: {nome: $translate.instant('MENU.TESTIMONIALS_NAME'), href: $translate.instant('MENU.TESTIMONIALS_HREF')},
        brands: {nome: $translate.instant('MENU.BRANDS_NAME'), href: $translate.instant('MENU.BRANDS_HREF')},
      };


      switch(sessionLandingCode) {

        //TODO
        case 'echantillon':
        case 'amostras':

          if (controller === 'MainCtrl') {

            return [ menuItemsTranslation.itsFree, menuItemsTranslation.oportunity,
              menuItemsTranslation.testimonials, menuItemsTranslation.brands];
          }

          if (controller === 'PerguntasCtrl') {
            return null;
          }

          if (controller === 'HomeCtrl') {
            return [menuItemsTranslation.oportunity, menuItemsTranslation.freeSamples];
          }

          break;


        case 'videncias':

          if (controller === 'MainCtrl') {
            return  [menuItemsTranslation.itsFree];
          }

          if (controller === 'HomeCtrl') {
            return [menuItemsTranslation.oportunity];
          }

          break;


        case 'revendas':

          if (controller === 'MainCtrl') {
            return [menuItemsTranslation.itsFree, menuItemsTranslation.brands];
          }

          if (controller === 'HomeCtrl') {
            return [menuItemsTranslation.oportunity];
          }

          break;

      }

    };









    this.getSessionCode = function(location){

      /*var sessionCode = 'amostras';

      switch (location.host()){

        case 'www.opportunités.club':
        case 'opportunités.club':
        case 'www.opportunites.club':
        case 'opportunites.club':
            sessionCode = 'echantillon';
            break;

        case 'www.gostei.club':
          case 'gostei.club':
            sessionCode = 'amostras';
            break;

        case 'www.revendas.gostei.club':
          case 'revendas.gostei.club':
            sessionCode = 'revendas';
            break;

        case 'www.videncias.gostei.club':
          case 'videncias.gostei.club':
            sessionCode = 'videncias';
            break;

        case 'www.me-gusta.com.mx':
        case 'me-gusta.com.mx':
        case 'megusta.com.es':
        case 'www.megusta.com.es':
          sessionCode = 'megusta';
          break;
      }*/

      return 'amostras';

    };




    this.getLanguageOrigin = function(){

      switch ($location.host()){


        case 'me-gusta.com.mx':
        case 'www.me-gusta.com.mx':
        case 'megusta.com.es':
        case 'www.megusta.com.es':
          return 'es-MX'
          break;

        case 'www.opportunités.club':
        case 'opportunités.club':
        case 'www.opportunites.club':
        case 'opportunites.club':
          return 'fr-FR'
          break;

        case 'www.gostei.club':
        case 'gostei.club':
        case 'www.revendas.gostei.club':
        case 'revendas.gostei.club':
        case 'www.videncias.gostei.club':
        case 'videncias.gostei.club':
          return 'pt-BR';
          break;
      }

    };




    this.getDataFromLanding = function(rootScope, sessionCode){

      var objReturn = {};
      objReturn.main = {};
      objReturn.marcas = {};

      objReturn.deGraca = {};
      objReturn.deGraca.item1 = {};
      objReturn.deGraca.item2 = {};
      objReturn.deGraca.item3 = {};

      objReturn.isAmostras = false;
      objReturn.isRevendas = false;
      objReturn.isVidencias = false;

      switch (sessionCode){


        case 'megusta':
        case 'echantillon':
        case 'amostras':

          objReturn.isAmostras = true;

          objReturn.showDeGraca = true;
          objReturn.showDeGracaImages = true;
          objReturn.showOportunidades = true;
          objReturn.showDepoimentos = true;
          objReturn.showMarcas = true;

          break;


        case 'revendas':

          objReturn.isRevendas = true;

          objReturn.showDeGraca = true;
          objReturn.showDeGracaImages = true;
          objReturn.showOportunidades = false;
          objReturn.showDepoimentos = false;
          objReturn.showMarcas = true;

          break;


        case 'videncias':

          objReturn.isVidencias = true;

          objReturn.showDeGraca = true;
          objReturn.showDeGracaImages = true;
          objReturn.showOportunidades = false;
          objReturn.showDepoimentos = false;
          objReturn.showMarcas = false;

          break;

      }

      return objReturn;
    };


    return this;

  });
