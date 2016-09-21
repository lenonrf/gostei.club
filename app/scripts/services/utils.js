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
        
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
      }

      return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    };


    this.getDateAllin = function(){

      var date = new Date();

      var year = date.getFullYear();
      var month = ( (date.getMonth()+1) < 10) ? ("0" + (date.getMonth()+1)) : (date.getMonth()+1);
      var day = date.getDate();
      
      return year+'-'+month+'-'+day;
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



    this.getRegionByCellphone = function(cellphone){

      var ddd   = cellphone.substr(0, 2);

      var DDD_SUDESTE = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38];
      var DDD_SUL = [41,42,43,44,45,46,47,48,49,51,53,54,55];
      var DDD_CENTRO_OESTE = [61,62,64,65,66,67];
      var DDD_NORDESTE = [71,73,74,75,77,79,81,82,83,84,85,86,87,88,89];
      var DDD_NORTE = [91,92,93,94,95,96,97,98,99,68,69,63];

      if(DDD_SUDESTE.indexOf(ddd) > -1){
        return 'DDD_SUDESTE';
      }

      if(DDD_SUL.indexOf(ddd) > -1){
        return 'DDD_SUL';
      }

      if(DDD_CENTRO_OESTE.indexOf(ddd) > -1){
        return 'DDD_CENTRO_OESTE';
      }

      if(DDD_NORDESTE.indexOf(ddd) > -1){
        return 'DDD_NORDESTE';
      }

      if(DDD_NORTE.indexOf(ddd) > -1){
        return 'DDD_NORTE';
      }
    

    };







    this.getUserAge = function(user){

      var userYearBirth = '';

      if(user.birthDate[0] === '0'){
        userYearBirth = parseInt(user.birthDate.slice(-4), 10);

      }else{
        userYearBirth = parseInt(user.birthDate.slice(0, 4), 10);
      }

      return (2016 - userYearBirth);
    };


    this.getUserRegion = function(user){

      var cepRange = parseInt(user.address.zipcode.substr(0, 5), 10); 

      // SAO PAULO
      
      if((cepRange >= 1000) && (cepRange <= 19999)){
         return 1;    
      }

      
      // RIO

      if((cepRange >= 20000) && (cepRange <= 28999)){
         return 2;    
      }


      // Belo Horizonte - MG

      if((cepRange >= 30000) && (cepRange <= 39999)){
         return 3;    
      }


      // Curitiba - PR

      if((cepRange >= 80000) && (cepRange <= 87999)){
         return 4;    
      }


      // Goiania - GO

      if((cepRange >= 72800) && (cepRange <= 76799)){
         return 5;    
      }


      // Recife - PE

      if((cepRange >= 50000) && (cepRange <= 56999)){
         return 5;    
      }


      // Brasília

      if((cepRange >= 70000) && (cepRange <= 73699)){
         return 6;    
      }


      //  Porto Alegre - RS

      if((cepRange >= 90000) && (cepRange <= 99999)){
         return 7;    
      }


      //  Salvador - BA

      if((cepRange >= 40000) && (cepRange <= 48999)){
         return 7;    
      }

      return 1;


    };








 });
