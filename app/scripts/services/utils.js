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


    this.setFixedMenu = function(){
      $("header").css("background", "#000000").css("padding", "0px 0px 13px");
    }


    /**
     * Valida se o objeto esta nulo
     */
    this.isEmpty = function(object){

    	if(object !== null && object !== undefined && object !== ''){
        	return false;
        }else{
        	return true;
        }
    }


 });
