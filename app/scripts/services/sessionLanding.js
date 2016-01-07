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

      var sessionCode = null;

      switch (location.host()){

        //TODO
        case 'www.fr.gostei.club':
          case 'fr.gostei.club':
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
      }

      return sessionCode;

    };




    this.getLanguageOrigin = function(location){

      switch (location.host()){

        //TODO
        case 'www.fr.gostei.club':
        case 'fr.gostei.club':
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

      return 'pt-BR';

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
