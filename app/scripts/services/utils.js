'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.utils
 * @description
 * # utils
 * Service in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .service('Utils', function () {

    this.isLogged = function(user){
      return !this.isEmpty(user.email);
    };

    this.setFixedMenu = function(){
      $("header").css("background", "#000000").css("padding", "0px 0px 13px");
      $("#entrarLI").css("display", "none");
    };

    this.setDefaultMenu = function(){
      $("header").css("background", "transparent").css("padding", "20px 0px 20px");
      $("#entrarLI").css("display", "block");
    };

    /**
     * Valida se o objeto esta nulo
     */
    this.isEmpty = function(object){

    	if(object !== null && object !== undefined && object !== ''){
        	return false;
        }else{
        	return true;
        }
    };


    this.getFirstName = function(name){
      var nameSplited = name.split(' ');
      return nameSplited[0];
    }
 });
