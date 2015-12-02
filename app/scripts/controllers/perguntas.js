'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('PerguntasCtrl', function ($scope, $window, $http, $rootScope, $location, Coreg, Menu, Allin, Campaing, User, Utils, Product) {

    Menu.setMenu('PerguntasCtrl');
    $rootScope.showFooter = false;

    $scope.user = User.getData();
    $scope.user.coregs = [];

    // controla os botões da tela
    $scope.isStepButtonDisabled = true;
    $scope.disableAnswerButton = false;
    $scope.isValidationError = false;
    $scope.indexQuestion = 0;



    /**
     * -------------------------------------------------------------------
     * Login
     */

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
        $location.path('/main');
      }

    }else{
      $rootScope.firstName = Utils.getFirstName(User.getData().name);
    }



    getCampaings();
    getProducts(User);



    /**
     * -------------------------------------------------------------------
     * Coregs
     */

    Coreg.resource.query(function(data){

      $scope.coregs = [];


        for(var x=0; x<data.length; x++){

          if(data[x].status){

            data[x].answer = true;

            if(data[x].code === 'estrelafone'){

              var date = new Date();
              var hour = date.getHours();
              var weekday = date.getDay();

              //TODO - SEGUIMENTACAO
              var userYears = Utils.getUserYears($scope.user.birthDate);
              if((userYears >= 30) && ($scope.user.gender === 'F')){

                if((weekday != 0) && (weekday != 6)){
                  if((hour>7) && (hour<24)){

                    $scope.coregs.push(data[x]);

                    $scope.user.coregs.push({
                      _id : data[x]._id,
                      answer : true
                    });
                  }
                }
              }

            }else{
              $scope.coregs.push(data[x]);
              $scope.user.coregs.push({
                _id : data[x]._id,
                answer : true
              });
            }
          }
      }


      if( $scope.coregs.length === 0){
        $scope.steps = ['complete', 'active', 'disabled', 'disabled'];
      }else{
        $scope.steps = ['active', 'disabled', 'disabled', 'disabled'];
      }

    });





    $scope.addUserCoreg = function(coregId, answer){

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
          answer : answer
        });
      }

      if($scope.user.coregs.length === $scope.coregs.length){
        $scope.isStepButtonDisabled = false;
      }


    };

    $scope.sendCoreg = function(){

      User.resourceCoreg.save({'id'  : $scope.user._id}, $scope.user.coregs, function(){}, function(){});

    };






    /**
     * -------------------------------------------------------------------
     * Campanhas corredor
     */

    function getCampaings() {

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

        $scope.question = {

          title: $scope.corredor[0].title,
          description: $scope.corredor[0].description,
          answerList: $scope.corredor[0].answerList,
          image: $scope.corredor[0].image,
          urlAnswer: $scope.corredor[0].urlAnswer
        };


      }).error(function(){});
    }







    $scope.setAnswerQuestion = function (answerType) {

      var question = $scope.corredor[$scope.indexQuestion];

      if (answerType === true) {
        $window.open(question.urlAnswer+'&aff_sub='+$scope.campaign, '_blank');
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





    $scope.nextStep = function(){

      for(var x=0; x<$scope.steps.length; x++){

        if($scope.steps[x] === 'active'){
          $scope.steps[x] = 'complete';
          $scope.isStepButtonDisabled = true;
          $scope.steps[x+1] = 'active';
          break;
        }
      }
    };



    /**
     * -------------------------------------------------------------------
     * Produtos
     */

    $scope.saveProduct = function (product) {

      $scope.isStepButtonDisabled = false;


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

          for(var u_index=0; u_index<userProducts.length; u_index++){

            if(userProducts[u_index]._id === data[p_index]._id){
              data[p_index].marked = true;
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

      $scope.user.birthDate = Utils.getBirthDate($scope.user.birthDate);
      User.resourceEmail.put({'email'  : User.data.email}, $scope.user, onSuccess, onError);

    };

    function onSuccess(data) {
      User.setData(data);
      $location.path('/home');
    }

    function onError(data) {
      console.log('error', data);
      $scope.isValidationError = true;
      $scope.validationMessage = 'Ocorreu um erro no envio dos dados.';
    }

    /*$scope.$watch('user.address.zipcode', function() {

     if($scope.user.address.zipcode){

     $http.get('http://api.postmon.com.br/v1/cep/'+$scope.user.address.zipcode).success(function(data){

     $scope.user.address.city = data.cidade;
     $scope.user.address.state = data.estado;
     $scope.user.address.neighborhood = data.bairro;
     $scope.user.address.street = data.logradouro;

     $('#endereco').css('display', 'block');
     $scope.isValidationError = false;

     }).error(function(){

     //setMessageOnField('zipcode', 'CEP inválido');
     //$('#endereco').css('display', 'none');

     });
     }
     });*/



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


      /*if (Utils.isEmpty($scope.user.birthDate)) {

        setMessageOnField('birthDate', 'Preencha a data de nascimento');
        return false;

      } else {

        if ($scope.user.birthDate.length === 8) {

          var day = $scope.user.birthDate.substr(0, 2);
          var month = $scope.user.birthDate.substr(2, 2);
          var year = $scope.user.birthDate.substr(4, 4);

          if (day > '31') {
            setMessageOnField('birthDate', 'Dia Invalido');
            return false;
          }

          if (month > '12') {
            setMessageOnField('birthDate', 'Mes Invalido');
            return false;
          }

          if (year > new Date().getFullYear()) {
            setMessageOnField('birthDate', 'Ano Invalido');
            return false;
          }

        } else {
          setMessageOnField('birthDate', 'Preencha a data de nascimento');
          return false;
        }
      }

      if (Utils.isEmpty($scope.user.cellphone)) {

        setMessageOnField('cellphone', 'Preencha o celular');
        return false;
      }*/


      if (Utils.isEmpty($scope.user.address.zipcode)) {

        setMessageOnField('zipcode', 'Preencha o Cep');
        return false;
      }





      if (Utils.isEmpty($scope.user.address.street)) {

        setMessageOnField('address', 'Preencha o Endereço');
        return false;
      }
      if (Utils.isEmpty($scope.user.address.neighborhood)) {

        setMessageOnField('neighborhood', 'Preencha o Bairro');
        return false;
      }
      if (Utils.isEmpty($scope.user.address.city)) {

        setMessageOnField('city', 'Preencha a Cidade');
        return false;
      }
      if (Utils.isEmpty($scope.user.address.state)) {

        setMessageOnField('state', 'Preencha o Estado');
        return false;
      }






      if (Utils.isEmpty($scope.user.address.number)) {

        setMessageOnField('number', 'Preencha o numero');
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
