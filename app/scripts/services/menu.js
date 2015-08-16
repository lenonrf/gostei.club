'use strict';


angular.module('gosteiclubApp')
  .service('Menu', function ($rootScope) {

    $rootScope.menu = {};


    var main = {
      link_1 : { nome : 'De Graça?', href : '#degraca' },
      link_2 : { nome : 'Oportunidades', href : '#oportunidade' },
      link_3 : { nome : 'Depoimentos', href : '#depoimentos' },
      link_4 : { nome : 'Marcas testadas', href : '#marcas' }
    };


    var home = {
      link_1 : { nome : 'Oportunidades', href : '#oportunidade' },
      link_2 : { nome : 'Amostras Gratis', href : '#amostras' },
      link_3 : null,
      link_4 : null,
    };



    this.setMenu= function(controller){

      switch(controller) {

        case 'PerguntasCtrl':

          $rootScope.menu = null;
          $rootScope.showMenuItems = false;
          this.setFixedMenu();
          break;

        case 'HomeCtrl':

          $rootScope.menu = home;
          $rootScope.showMenuItems = true;
          this.setFixedMenu();
          break;

        case 'MainCtrl':

          $rootScope.menu = main;
          $rootScope.showMenuItems = true;
          this.setDefaultMenu();
          break;

      }
    }


    this.setFixedMenu = function(){
      $("header").css("background", "#000000").css("padding", "0px 0px 13px");
      $("#entrarLI").css("display", "none");
    };

    this.setDefaultMenu = function(){
      $("header").css("background", "transparent").css("padding", "20px 0px 20px");
      $("#entrarLI").css("display", "block");
    };


  });
