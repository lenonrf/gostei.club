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

      console.log('$scope.survey', $scope.survey);

      if($scope.isSurveyStep()){
        $scope.sendSurvey();
      }

      $scope.moveProgressBar();

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







    $scope.setAnswerQuestion = function (answerType, offerId) {


      if (answerType === true) {

        var question = $scope.corredor[$scope.indexQuestion];

        if(question.urlAnswer.indexOf('<user_id>') > -1){

          question.urlAnswer = question.urlAnswer.replace('<user_id>', $scope.user._id);
          $window.open(question.urlAnswer, '_blank');

          
        }else{
          $window.open(question.urlAnswer+'&aff_sub='
            +User.getCampaing($location, $rootScope.deviceAccess, $rootScope.sessionLanding), '_blank');
        }


        $http.get('/api/yhall/offer/'+offerId+'/stats/totalclicks?type=acceptance')
          .success(function(data){
            console.log('success', data);
          })
          .error(function(){
            console.log('error');
          });

      }else{

          $http.get('/api/yhall/offer/'+offerId+'/stats/totalclicks?type=refusal')
            .success(function(data){
              console.log('success', data);
            })
            .error(function(){
              console.log('error');
            });

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
