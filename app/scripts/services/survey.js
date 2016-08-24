'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('Survey', function () {


    this.getRadioGroupChoise = function(id){
      return $("input:radio[name ='answer_"+id+"']:checked").val();
    };


    this.isAllChoisesSelected = function(dynamicSegmentation, avaliableOffers){
      
      var statusDynamicSegmentation = true;
      var statusAvaliableOffers = true;
      var radioChoise = null;

      for (var x = 0; dynamicSegmentation.length>x; x++) { 

        radioChoise = this.getRadioGroupChoise(dynamicSegmentation[x]._id);                    
        statusDynamicSegmentation = (!radioChoise) ? false : true;
      }

      for (var x = 0; avaliableOffers.length>x; x++) { 

        radioChoise = this.getRadioGroupChoise(avaliableOffers[x]);
        statusAvaliableOffers = (!radioChoise) ? false : true;
      }

      return (statusDynamicSegmentation && statusAvaliableOffers);

    };

    return this;

  });
