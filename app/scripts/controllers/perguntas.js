'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('PerguntasCtrl', function ($scope, $window, Malling, $http, $rootScope,
                                         $translate, $location, Coreg, Menu, Allin, $compile, $sce, 
                                         Campaing, Survey, WsUriBuilder, WsClient, User, Utils, 
                                         Product, SessionLanding, lodash) {


    /** ------------------------------------------------------ */

    $rootScope.avaliableOffers = [];

    $scope.isCreditCard = null;
    $scope.isChild = false;
    $scope.isPixelImoveis = false;

    $scope.hideChild = function(){
      $scope.isCreditCard = false;
      $scope.isChild = false;
      $rootScope.isStepButtonDisabled = false;

    };

    $scope.showChild = function(){
      $scope.isCreditCard = true;
      $scope.isChild = true;
    };


    $scope.isCatho = false;

    $scope.hideCatho = function(){
      $scope.isCatho = false;
      $rootScope.isStepButtonDisabled = false;

    };

    $scope.showCatho = function(){
      $scope.isCatho = true;
    };


    /** ------------------------------------------------------ */

     if(!Utils.isLogged(User.data)){
      if(User.isUserFromLandingPage($location)){

        User.resource.get({email:$location.search().email}, function(data){

          Allin.sendDataToWelcomeLifeCycle(data);
          User.setData(data);
          User.setLogged(true);
          $scope.user = User.getData();

        }, function(){
          $location.path('/main');
        });

      }else{
        if($location.path() !== '/'){
          $location.path('/main');
          return null;
        }
      }

    }else{
      $rootScope.firstName = Utils.getFirstName(User.getData().name);
    }


    Menu.setMenu('PerguntasCtrl');

    $rootScope.showFooter = false;
    $rootScope.isStepButtonDisabled = true;
    $scope.disableAnswerButton = false;
    $scope.isValidationError = false;

    $scope.user = User.getData();

    $scope.user.coregs = [];
    $rootScope.steps = ['complete', 'active', 'disabled', 'disabled'];

    $scope.coregsSelecteds = 0;
    $scope.indexQuestion = 0;
    $scope.pixelFacebookId = null;

    $scope.escolhido = $translate.instant('HALL.FREESAMPLE_05');
    $scope.euquero =  $translate.instant('HALL.FREESAMPLE_06');

    if($rootScope.sessionLanding){

      $scope.isBR = (SessionLanding.getLanguageOrigin() === 'pt-BR');
      $scope.isFR = (SessionLanding.getLanguageOrigin() === 'fr-FR');
      $scope.isMX = (SessionLanding.getLanguageOrigin() === 'es-MX');

      switch($rootScope.sessionLanding.languageOrigin){

        case 'es-MX':
          $scope.pixelFacebookId = 0;
          break;

        case 'fr-FR':
          $scope.pixelFacebookId = 6045526204254;
          break;

        case 'pt-BR':
          $scope.pixelFacebookId = 6044565660054;
          break;
      }
    }



    //getCampaings();
    getProducts(User);







    

    /**
     * -------------------------------------------------------------------------------------
     */

    $scope.showButtomOpportunity = false;

    $scope.deliveryWS = {
      survey: [],
      questionHall: {},
      balcony: {}
    };

    $scope.offers = {
      questionHall: []
    }


    /**
     * Call the API and Get all offers filtered by offer by and user segmentation
     */
      $http.get('/api/offers/affiliation/579271a2cbf2e4130bb724b0?user='+$scope.user.email)
        .success(function(data){

          $scope.setProgressBar(data.survey);

          $scope.survey = data.survey;
          $scope.dynamicSegmentation = data.dynamicSegmentation;
          $scope.offers.questionHall = data.questionHall;

          console.log('$scope.offers.questionHall', $scope.offers.questionHall);


      }).error(function(){});




    /**
     * Avaliate if the survey is complete and allow the next button to proceed
     * to the next step
     */
    $scope.isNextStepAvaliableForSurvey = function(){
      $rootScope.isStepButtonDisabled = 
        !(Survey.isAllChoisesSelected($scope.dynamicSegmentation, $rootScope.avaliableOffers));
    };




    /**
     * Inicialize the progress bar with de default values
     */
    $scope.setProgressBar = function (survey){

      //$rootScope.steps = ['complete', 'active', 'disabled', 'disabled'];

      if(survey.length === 0){
        $rootScope.steps = ['complete', 'active', 'disabled', 'disabled'];
      }else{
        $rootScope.steps = ['active', 'disabled', 'disabled', 'disabled'];
      }
    };




    /**
     * Move forward to next step in the progress bar
     */
    $scope.nextStep = function(){

      if($scope.isSurveyStep()){
        $scope.sendSurvey();
      }

      if($scope.isQuestionHallStep()){
        //$scope.questionHall = $scope.applyDynamicSegmentation($scope.questionHall);
      }

      $scope.moveProgressBar();


    };


    $scope.applyDynamicSegmentation = function(offers){

      var offersAvailable = [];
      
      console.log('$scope.questionHall', $scope.questionHall);
      console.log('$rootScope.avaliableDynamicSegmentation', $rootScope.avaliableDynamicSegmentation);

      for (var x = 0; x < $scope.questionHall.length; x++) {
        for (var y = 0; y < $scope.questionHall[x].segmentation.dynamicSegmentation.length; y++) {

          var dynamicSegId = $scope.questionHall[x].segmentation.dynamicSegmentation[y]._id;

          console.log('dynamicSegId', dynamicSegId, ($rootScope.avaliableDynamicSegmentation.indexOf(dynamicSegId) > -1));

          if($rootScope.avaliableDynamicSegmentation.indexOf(dynamicSegId) > -1){

            offersAvailable.push($scope.questionHall[x]);
          }
        };
      };

      console.log('offersAvailable', offersAvailable);
      return offersAvailable;
    };



    $scope.isSurveyStep = function(){
      return ($rootScope.steps[0] === 'active' && $rootScope.steps[1] === 'disabled');
    };


    $scope.isQuestionHallStep = function(){
      return ($rootScope.steps[0] === 'complete' && $rootScope.steps[1] === 'active');
    };




    /**
     * Move foward the progress bar
     */
    $scope.moveProgressBar = function(){


      for(var x=0; x<$rootScope.steps.length; x++){

        if($rootScope.sessionLandingData.isAmostras){

          if($rootScope.steps[x] === 'active'){

            $rootScope.steps[x] = 'complete';
            $rootScope.steps[x+1] = 'active';

            $rootScope.isStepButtonDisabled = true;
            break;
          }

        }else{

          if($rootScope.steps[x] === 'active'){

            if(x === 1){
              onSuccess($scope.user);
              break;
            }

            $rootScope.steps[x] = 'complete';
            $rootScope.isStepButtonDisabled = true;
            $rootScope.steps[x+1] = 'active';
            break;
          }
        }
      }
    };




    /**
     * Call the API to send que survey to avaiable web services
     */
    $scope.sendSurvey = function(){
      Survey.sendSurvey($scope.survey, $scope.user);
    };







    













    /**
     * -------------------------------------------------------------------
     * COREGS/**
     * -------------------------------------------------------------------
     * COREGS


    /**
     * -------------------------------------------------------------------
     * COREGS
     

    $http.get('/api/coregs/user/'+$scope.user._id
    + '?sessionlanding='+$rootScope.sessionLanding._id
    + '&deviceAccess='+$rootScope.deviceAccess).success(function(data){

      for(var x=0; x<data.length; x++){

        $scope.coregs = data;

        if( $scope.coregs.length === 0){
          $rootScope.steps = ['complete', 'active', 'disabled', 'disabled'];
        }else{
          $rootScope.steps = ['active', 'disabled', 'disabled', 'disabled'];
        }
      }

    /*
     *
     * CAMPANHAS
     
      $http.get('/api/offers/affiliation/579271a2cbf2e4130bb724b0?user='+$scope.user.email)
        .success(function(data){

          $scope.survey = data.survey;
          $scope.dynamicSegmentation = data.dynamicSegmentation

        }).error(function(){});

    }).error(function(){});




    $scope.addUserCoreg = function(coregId, answer, code){

      var isExists = false;

      for(var x=0; x<$scope.user.coregs.length; x++){

        if($scope.user.coregs[x]._id === coregId){
          $scope.user.coregs[x].answer = answer;
          isExists = true;
        }
      }

      if(!isExists){

        $scope.user.coregs.push({
          _id : coregId,
          answer : answer,
          code: code
        });
      }

      if($scope.user.coregs.length === $scope.coregs.length){
        $rootScope.isStepButtonDisabled = false;
      }

    };

    $scope.sendCoreg = function(){


      // TODO REMOVE
      for(var x=0; x<$scope.user.coregs.length; x++){
        
        console.log($scope.user.coregs[x].code, $scope.user.coregs[x].answer);

        if($scope.user.coregs[x].code === 'empreendimentoImobiliario'
          && $scope.user.coregs[x].answer){

            $http.post('/api/empremobiliario')
              .success(function(dataResult){}).error(function(){});
        }

        if($scope.user.coregs[x].code === 'catho'
          && $scope.user.coregs[x].answer){

            $http.post('/api/catho')
              .success(function(dataResult){}).error(function(){});
        }
      }

      $scope.user.languageOrigin = SessionLanding.getLanguageOrigin();
      User.resourceCoreg.save({'id'  : $scope.user._id}, $scope.user.coregs, function(){}, function(){});

    };*/





    /**
     * -------------------------------------------------------------------
     * Campanhas corredor
     

    function getCampaings() {

      if(!$rootScope.sessionLanding){
        return null;
      }

      //console.log('$rootScope.sessionLanding', $rootScope.sessionLanding);

      $http.get('/api/oportunities/user/'+$scope.user._id
        +'?sessionlanding='+$rootScope.sessionLanding._id
        +'&deviceAccess='+$rootScope.deviceAccess).success(function(data){

        $scope.campaings = data;
        $scope.corredor = [];


        for(var i=0; i<$scope.campaings.length; i++){
          if($scope.campaings[i].isQuestion === true){
            $scope.corredor.push($scope.campaings[i]);
          }
        }

        //console.log('$scope.campaings', $scope.campaings);
        //console.log('$scope.corredor', $scope.corredor);

        $scope.question = {

          title: $scope.corredor[0].title,
          description: $scope.corredor[0].description,
          answerList: $scope.corredor[0].answerList,
          image: $scope.corredor[0].image,
          urlAnswer: $scope.corredor[0].urlAnswer
        };


      }).error(function(){});
    }*/








    $scope.setAnswerQuestion = function (answerType) {

      var question = $scope.corredor[$scope.indexQuestion];

      if (answerType === true) {

        if(question.urlAnswer.indexOf('<user_id>') > -1){

          question.urlAnswer = question.urlAnswer.replace('<user_id>', $scope.user._id);
          $window.open(question.urlAnswer, '_blank');


        /*}else if(question.urlAnswer.indexOf('<conectai_random_key>') > -1){
          console.log('is conectai_random_key');
          $http.get('/api/randomkey?cellphone='+$scope.user.cellphone).success(function(data){
            question.urlAnswer = question.urlAnswer.replace('<conectai_random_key>', data.key);
            console.log('question.urlAnswer', question.urlAnswer);
            $window.open(question.urlAnswer, '_blank');
          }).error(function(){});*/

          
        }else{
          $window.open(question.urlAnswer+'&aff_sub='
            +User.getCampaing($location, $rootScope.deviceAccess, $rootScope.sessionLanding), '_blank');
        }

      }

      if (hasNextQuestion()) {
        showNextQuestion();

      } else {
        $scope.nextStep();
      }
    };


    function hasNextQuestion() {
      return ($scope.indexQuestion + 1 !== $scope.corredor.length);
    }


    function showNextQuestion() {

      $scope.indexQuestion = $scope.indexQuestion + 1;
      var question = $scope.corredor[$scope.indexQuestion];

      $scope.question = {

        title: question.title,
        description: question.description,
        answerList: question.answerList,
        image: question.image,
        urlAnswer: question.urlAnswer
      };
    }





    /**
     * -------------------------------------------------------------------
     * Produtos
     */

    $scope.saveProduct = function (product) {

      $rootScope.isStepButtonDisabled = false;


      if( (product.marked === false) || (Utils.isEmpty(product.marked))){

        product.marked = true;
        $scope.user.products.push(product);

      }else{

        product.marked = false;
        $scope.user.products.splice($scope.user.products.indexOf(product), 1);

      }

    };


    function getProducts(user) {

      Product.resource.query(function(data){

        var userProducts = user.getData().products;

        for(var p_index=0; p_index<data.length; p_index++){

          data[p_index].marked = false;

          if(userProducts){

            for(var u_index=0; u_index<userProducts.length; u_index++){

              if(userProducts[u_index]._id === data[p_index]._id){
                data[p_index].marked = true;
              }
            }
          }


        }

        $scope.products = data;

      }, function(err){ });
    }







    /**
     * -------------------------------------------------------------------
     * Entrega
     */
    $scope.save = function () {

      if (!validateFields()) {
        return false;
      }

      //$scope.user.birthDate = Utils.getBirthDate($scope.user.birthDate);

      User.resourceEmail.put({'email'  : User.data.email}, $scope.user, onSuccess, onError);

    };

    function onSuccess(data) {
      User.setData(data);
      Malling.updateContact(data);
      $location.path('/home');
    }

    function onError(data) {
      console.log('error', data);
      $scope.isValidationError = true;
      $scope.validationMessage = 'Ocorreu um erro no envio dos dados.';
    }


    /**
     * -------------------------------------------------------------------
     * Validators
     */

    function validateFields() {

      $scope.isValidationError = false;

      $scope.bgCellphoneColor = '#FFFFFF';
      $scope.bgNumberColor = '#FFFFFF';
      $scope.bgBirthColor = '#FFFFFF';
      $scope.bgZipcodeColor = '#FFFFFF';


      if (Utils.isEmpty($scope.user.address.zipcode)) {

        setMessageOnField('zipcode', $translate.instant('VALIDATION.ZIPCODE_FAILED'));
        return false;
      }

      if (Utils.isEmpty($scope.user.address.street)) {

        setMessageOnField('address', $translate.instant('VALIDATION.STREET_FAILED'));
        return false;
      }

      if($rootScope.sessionLanding){
        if($rootScope.sessionLanding.languageOrigin === 'pt-BR'){

          if (Utils.isEmpty($scope.user.address.neighborhood)) {

            setMessageOnField('neighborhood', $translate.instant('VALIDATION.NEIBOR_FAILED'));
            return false;
          }
        }
      }


      if (Utils.isEmpty($scope.user.address.city)) {

        setMessageOnField('city', $translate.instant('VALIDATION.CITY_FAILED'));
        return false;
      }


      if($rootScope.sessionLanding){
        if($rootScope.sessionLanding.languageOrigin === 'pt-BR'){

          if (Utils.isEmpty($scope.user.address.state)) {

            setMessageOnField('state', $translate.instant('VALIDATION.STATE_FAILED'));
            return false;
          }
        }
      }

      if (Utils.isEmpty($scope.user.address.number)) {

        setMessageOnField('number', $translate.instant('VALIDATION.NUMBER_FAILED'));
        return false;
      }

      return true;

    }

    function setMessageOnField(field, message) {

      setFieldWarning(field);
      $scope.isValidationError = true;
      $scope.validationMessage = message;
    }



    function setFieldWarning(field) {

      var warningColor = '#FFFACD';
      var msgErrorColor = '#CD0000';

      switch (field) {

        case 'cellphone':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgCellphoneColor = warningColor;
          angular.element('#cellphone').focus();
          break;


        case 'number':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgNumberColor = warningColor;
          angular.element('#number').focus();
          break;

        case 'birthDate':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgBirthColor = warningColor;
          angular.element('#bithDate').focus();
          break;

        case 'zipcode':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgZipcodeColor = warningColor;
          angular.element('#zipcode').focus();
          break;

        case 'city':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgCityColor = warningColor;
          angular.element('#city').focus();
          break;

        case 'neighborhood':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgNeighborhoodColor = warningColor;
          angular.element('#neighborhood').focus();
          break;

        case 'state':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgStateColor = warningColor;
          angular.element('#state').focus();
          break;

        case 'address':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgAddressColor = warningColor;
          angular.element('#address').focus();
          break;

      }
    }

  });
