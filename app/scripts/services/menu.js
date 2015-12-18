'use strict';


angular.module('gosteiclubApp')
  .service('Menu', function ($rootScope, $location, SessionLanding) {

    $rootScope.menu = {};


    this.setMenu = function(controller){

      $rootScope.menu =
        this.getMenuBySessionLanding(SessionLanding.getSessionCodeByLocation($location), controller);

    };




    this.getMenuBySessionLanding = function (sessionLandingCode, controller){


      if(controller === 'MainCtrl'){

        this.setDefaultMenu();
        $rootScope.showMenuItems = true;
        return this.getMenuItems(sessionLandingCode, controller);

      }


      if(controller === 'PerguntasCtrl'){

        $rootScope.showMenuItems = false;
        this.setFixedMenu();
        return null;
      }


      if(controller === 'HomeCtrl'){

        $rootScope.showMenuItems = true;
        this.setFixedMenu();
        return this.getMenuItems(sessionLandingCode, controller);
      }


    };




    this.getMenuItems = function(sessionLandingCode, controller){


      switch(sessionLandingCode) {

        case 'amostras':

          if (controller === 'MainCtrl') {

            return [
              {nome: 'De Graça?', href: '#degraca'},
              {nome: 'Oportunidades', href: '#oportunidade'},
              {nome: 'Depoimentos', href: '#depoimentos'},
              {nome: 'Marcas', href: '#marcas'}
            ];
          }

          if (controller === 'HomeCtrl') {

            return [
              {nome: 'Oportunidades', href: '#oportunidade'},
              {nome: 'Amostras Gratis', href: '#amostras'}
            ];
          }

          break;





        case 'videncias':

          if (controller === 'MainCtrl') {
            return [{nome: 'De Graça?', href: '#degraca'}];
          }

          if (controller === 'HomeCtrl') {
            return [{nome: 'Oportunidades', href: '#oportunidade'}];
          }

          break;





        case 'revendas':

          if (controller === 'MainCtrl') {
            return [
              {nome: 'De Graça?', href: '#degraca'},
              {nome: 'Marcas', href: '#marcas'}
            ];
          }

          if (controller === 'HomeCtrl') {
            return [{nome: 'Oportunidades', href: '#oportunidade'}];
          }

          break;

      }

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
