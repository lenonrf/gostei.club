'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('PerguntasCtrl', function ($scope, $window, $http, $rootScope, $location, Menu, Allin, Question, User, Utils, Product) {

    Menu.setMenu('PerguntasCtrl');

    $scope.user = User.getData();
    $scope.user.score = 0;
    $scope.user.answers = [];

    // controla os botões da tela
    $scope.disableSubmitButton = true;
    $scope.disableAnswerButton = false;
    $scope.isValidationError = false;

    $scope.indexQuestion = 0;
    $scope.step_1 = false;
    $scope.step_2 = false;




    if(!Utils.isLogged(User.data)){

      if(User.isUserFromLandingPage($location)){

        User.resource.get({email:$location.search().email}, function(data){

          // TODO - Mudar a logica para o backend
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


    $scope.campaign = User.getCampaing($location);

    $rootScope.products = getProducts(User);
    getQuestionList();

   /* $scope.$watch('user.address.zipcode', function() {

      if($scope.user.address.zipcode){

        $http.get('http://api.postmon.com.br/v1/cep/'+$scope.user.address.zipcode).success(function(data){

          $scope.user.address.city = data.cidade;
          $scope.user.address.state = data.estado;
          $scope.user.address.neighborhood = data.bairro;
          $scope.user.address.street = data.logradouro;

          $('#endereco').css('display', 'block');
          $scope.isValidationError = false;

        }).error(function(){

          setMessageOnField('zipcode', 'CEP inválido');
          $('#endereco').css('display', 'none');

        });
      }
    });*/

    /**
     * submita as peguntas
     */
    $scope.save = function () {

      if (!validateFields()) {
        return false;
      }

      $scope.user.birthDate = getBirthDate($scope.user.birthDate);
      User.resource.put({'email'  : User.data.email}, $scope.user, onSuccess, onError);

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




    /**
     * Função que retorna na tela a proxima pergunta e trata os dados da resposta
     * @param answer
     */
    $scope.setAnswerQuestion = function (answerType) {

      setUserAnswer(answerType);

      if (hasNextQuestion()) {
        showNextQuestion();

      } else {

        $scope.disableAnswerButton = true;
        $scope.step_1 = true;

        $('#step_2').css('opacity', '1');
        $('#step_2').css('pointer-events', 'auto');

        $('#step_3').css('opacity', '1');
        $('#step_3').css('pointer-events', 'auto');

        $('#step_1').css('display', 'none');
        $('#step_spacer').css('padding', '0px');
        $('#features_3').css('border-top', '0px');


        setButtonFinalize();
      }
    };


    /**
     * Salva a opcao de produto escolhido pelo usuario
     * @param product
     */
    $scope.saveProduct = function (product) {


      if( (product.marked === false) || (Utils.isEmpty(product.marked))){

        product.marked = true;
        $scope.user.products.push(product);

      }else{

        product.marked = false;
        $scope.user.products.splice($scope.user.products.indexOf(product), 1);

      }

    };


    function getBirthDate(birthField){

      if(Utils.isEmpty(birthField)) return null;

      var day   = birthField.substr(0, 2);
      var month = birthField.substr(2, 2);
      var year  = birthField.substr(4, 4);

      return new Date(year, (month-1), day);
    }




    /**
     * ----------------------------------------------------------------------------------------
     */

    /**
     * Veririfica se o botao de finalizar esta apto para ser liberado
     */
    function setButtonFinalize() {
      //if ($scope.step_1 && $scope.step_2) {
      if ($scope.step_1) {
        $scope.disableSubmitButton = false;
      }
    }


    /**
     * Seta a resposta, calcula score e exibe a tela
     * @param answerType
     */
    function setUserAnswer(answerType) {

      var question = getQuestion($scope.indexQuestion);

      if (answerType === true) {
        $scope.user.answers.push(question.idQuestion);
        $scope.user.score = $scope.user.score + question.score;
        $window.open(question.urlAnswer+'&aff_sub='+$scope.campaign, '_blank');
      }
    }


    /**
     * Verifica se ainda existe questoes na lista
     * @returns {boolean}
     */
    function hasNextQuestion() {
      return ($scope.indexQuestion + 1 !== $scope.questionList.length);
    }


    /**
     * Retorna uma questão da lista atraves do seu indice
     * @param index
     * @returns {*}
     */
    function getQuestion(index) {
      return $scope.questionList[index];
    }


    /**
     * Mostra a proxima questão na tela
     */
    function showNextQuestion() {

      $scope.indexQuestion = $scope.indexQuestion + 1;
      var question = getQuestion($scope.indexQuestion);

      $scope.question = {

        title: question.title,
        description: question.description,
        answerList: question.answerList,
        image: question.image,
        urlAnswer: question.urlAnswer
      };
    }


    /**
     * Mostra na tela sempre a primeira pergunta do lista de questoes
     */
    function showFirstQuestion() {

      var question = getQuestion(0);

      $scope.question = {

        title: question.title,
        description: question.description,
        answerList: question.answerList,
        image: question.image,
        urlAnswer: question.urlAnswer
      };
    }


    /**
     * Rertona uma lista de questões cadastradas
     * @returns {*[]}
     */
    function getQuestionList() {
      //return Question.getQuestionList();

      Question.resource.query(function(data){

        $scope.allQuestions = data;
        $scope.questionList = [];

        for(var i=0; i<$scope.allQuestions.length; i++){

          if($scope.allQuestions[i].status === true &&
            $scope.allQuestions[i].isQuestion === true){

            $scope.questionList.push($scope.allQuestions[i]);
          }
        }

        //console.log('$scope.allQuestions', $scope.allQuestions);
        //console.log('$scope.questionList', $scope.questionList);

        var question = $scope.questionList[0];

        $scope.question = {

          title: question.title,
          description: question.description,
          answerList: question.answerList,
          image: question.image,
          urlAnswer: question.urlAnswer
        };

      }, function(err){
        console.log('err', err);
      });
    }


    /**
     * Retorna os produtos cadastrados
     * @returns {*|{method, isArray}}
     */
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

        return data;


      }, function(err){ });
    }




    /**
     * ----------------------------------------------------------------------------------------
     */

    function validateFields() {

      $scope.isValidationError = false;

      $scope.bgCellphoneColor = '#FFFFFF';
      $scope.bgNumberColor = '#FFFFFF';
      $scope.bgBirthColor = '#FFFFFF';
      $scope.bgZipcodeColor = '#FFFFFF';


      if (Utils.isEmpty($scope.user.birthDate)) {

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
      }


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
