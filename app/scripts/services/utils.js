'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.utils
 * @description
 * # utils
 * Service in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .service('Utils', function (deviceDetector) {

    this.isLogged = function(user){
      return !this.isEmpty(user.email);
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
    };


    this.getLastname = function(name){
      var nameSplited = name.split(' ');
      return nameSplited[1];
    };




    this.getDateFormated = function(date){

      if(date === null){
        date = new Date();
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
      }

      return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    };



    this.getBirthDate = function(birthField){

      if(this.isEmpty(birthField)) return null;

      var day   = birthField.substr(0, 2);
      var month = birthField.substr(2, 2);
      var year  = birthField.substr(4, 4);

      return new Date(year, (month-1), day);
    }


    this.getUserYears = function(date){

      var now = new Date();
      var birthDate = this.getBirthDate(date);
      return now.getFullYear() - birthDate.getFullYear();
    };


    this.getDevice = function(){

      if(deviceDetector.isDesktop()){

        return 'desktop';

      }else if(deviceDetector.isMobile() || deviceDetector.isTablet()){

        return 'mobile';

      }
    };


 });
