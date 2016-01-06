'use strict';


angular.module('gosteiclubApp')
  .service('Menu', function ($rootScope, $location, $translate, SessionLanding) {

    $rootScope.menu = {};


    this.setMenu = function(controller){

      if(controller === 'PerguntasCtrl'){

        $rootScope.showMenuItems = false;
        this.setFixedMenu();
        return null;

      }

      $rootScope.showMenuItems = true;
      this.setDefaultMenu();


      var menuItemsTranslation = {
        freeSamples: {nome: $translate.instant('MENU.FREESAMPLES_NAME'), href: $translate.instant('MENU.FREESAMPLES_HREF')},
        itsFree: {nome: $translate.instant('MENU.ITSFREE_NAME'), href: $translate.instant('MENU.ITSFREE_HREF')},
        oportunity: {nome: $translate.instant('MENU.OPORTUNITY_NAME'), href: $translate.instant('MENU.OPORTUNITY_HREF')},
        testimonials: {nome: $translate.instant('MENU.TESTIMONIALS_NAME'), href: $translate.instant('MENU.TESTIMONIALS_HREF')},
        brands: {nome: $translate.instant('MENU.BRANDS_NAME'), href: $translate.instant('MENU.BRANDS_HREF')},
      };

      var sessionLandingCode = SessionLanding.getSessionCode($location);
      $rootScope.menu = SessionLanding.getItemsMenu(sessionLandingCode, controller, menuItemsTranslation);



    };


    this.setFixedMenu = function(){
      $("header").css("background", "#000000").css("padding", "0px 0px 13px");
      $("#entrarLI").css("display", "none");
    };

    this.setDefaultMenu = function(){
      $("header").css("background", "transparent").css("padding", "20px 0px 20px");
      $("#entrarLI").css("display", "block");
    };


  });
