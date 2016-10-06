'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('Survey', function (WsClient, WsUriBuilder, $http) {


    this.getRadioGroupChoise = function(id){
      return $("input:radio[name ='"+id+"']:checked").val();
    };


    this.isAllChoisesSelected = function(dynamicSegmentation, avaliableOffers){
      
      var statusDynamicSegmentation = true;
      var statusAvaliableOffers = true;
      var radioChoise = null;

      for (var x = 0; dynamicSegmentation.length>x; x++) { 

        radioChoise = this.getRadioGroupChoise('answer_'+dynamicSegmentation[x]._id);                    
        statusDynamicSegmentation = (!radioChoise) ? false : true;
      }

      for (var x = 0; avaliableOffers.length>x; x++) { 

        radioChoise = this.getRadioGroupChoise(avaliableOffers[x]);
        statusAvaliableOffers = (!radioChoise) ? false : true;
      }

      return (statusDynamicSegmentation && statusAvaliableOffers);

    };




    this.sendSurvey = function(surveyList, user){
      
      var uri = '';

      for (var i = 0; i < surveyList.length; i++) { 

          var actionTypeArr = (this.getRadioGroupChoise('answer_survey_'+surveyList[i]._id));

          if(!actionTypeArr){
            break;
          }

          actionTypeArr = actionTypeArr.split('_-_');

          var action = {
            type: actionTypeArr[0],
            answerId : actionTypeArr[1]

          }; 

          if(action.type !== 'do_nothing'){
            
            uri = this.getSurveyURI(surveyList[i], user, action);
            console.log('uri', uri);
            WsClient.executeUri(uri, 'survey', surveyList[i], user);

            $http.post('/api/yhall/offer/'+surveyList[i]._id+'/stats/clicks?type=acceptance');
          
          }else{
            $http.post('/api/yhall/offer/'+surveyList[i]._id+'/stats/clicks?type=refusal');
          }
      };
    };




    this.getSurveyURI = function(survey, user, action){


      var uri = '';

      switch(action.type){

        case 'delivery':
        case 'confirm_user_fields':
          return WsUriBuilder.buildUri(user, 'survey', survey.delivery.survey.wsUrl);;


        case 'open_new_input_field':
          
          var customKey   = $('#userfield_custom_tag_'+action.answerId).val();
          var customValue = $('#userfield_custom_'+action.answerId).val();

          return WsUriBuilder.buildUriCustom(user, 'survey', 
            survey.delivery.survey.wsUrl, customKey, customValue);

      }
    };

    return this;

  });
