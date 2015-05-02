'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('PerguntasCtrl', function ($scope, $window, $rootScope, $location, Question, User, Utils, Product, $timeout) {

    if(!Utils.isLogged(User.data)){
      $location.path('/main');
    }else{
      $rootScope.showMenuCheckout = false;
      $rootScope.showMenuUser = true;
      $rootScope.firstName = Utils.getFirstName(User.getData().name);
    }

    Utils.setFixedMenu();

    $scope.user = User.getData();
    $scope.user.score = 0;
    $scope.user.answers = [];
    //$scope.user.products = [];
    //$scope.user.address = {};

    // controla os botões da tela
    $scope.disableSubmitButton = true;
    $scope.disableAnswerButton = false;
    $scope.isValidationError = false;

    $scope.indexQuestion = 0;
    $scope.step_1 = false;
    $scope.step_2 = false;

    $scope.questionList = getQuestionList();
    getProducts();
    showFirstQuestion();



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
      console.log('sucesso', data)
      $location.path('/sucesso');
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

        setButtonFinalize();
      }
    };


    /**
     * Salva a opcao de produto esclhido pelo usuario
     * @param product
     */
    $scope.saveProduct = function (product) {

      $scope.user.products.push(product);
      $scope.step_2 = true;

      $('#link_' + product._id).css('background-color', '#749c0d');
      $('#link_' + product._id).css('cursor', 'default');
      $('#link_' + product._id).html('ESCOLHIDO!');
      $('#link_' + product._id).css('pointer-events', 'none');

      setButtonFinalize();
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
        $window.open(question.urlAnswer, '_blank');
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
      return Question.getQuestionList();
    }


    /**
     * Retorna os produtos cadastrados
     * @returns {*|{method, isArray}}
     */
    function getProducts() {

      Product.resource.query(function(data){

        $scope.products = data;
        var userProducts = User.getData().products;

        for(var p_index=0; p_index<data.length; p_index++){

          data[p_index].marked = false;

          for(var u_index=0; u_index<userProducts.length; u_index++){

            if(userProducts[u_index]._id === data[p_index]._id){
              data[p_index].marked = true;
            }
          }
        }

        //console.log('USER', userProducts);
        //console.log('DATA', data);

      }, function(err){

      });
    }




    /**
     * ----------------------------------------------------------------------------------------
     */

    function validateFields() {

      $scope.isValidationError = false;

      $scope.bgCellphoneColor = '#FFFFFF';
      $scope.bgAddressColor = '#FFFFFF';
      $scope.bgNumberColor = '#FFFFFF';
      $scope.bgBirthColor = '#FFFFFF';
      $scope.bgNeighborhoodColor = '#FFFFFF';
      $scope.bgComplementColor = '#FFFFFF';
      $scope.bgZipcodeColor = '#FFFFFF';
      $scope.bgCityColor = '#FFFFFF';
      $scope.bgStateColor = '#FFFFFF';

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

      if (Utils.isEmpty($scope.user.address.street)) {

        setMessageOnField('street', 'Preencha o endereço');
        return false;
      }

      if (Utils.isEmpty($scope.user.address.number)) {

        setMessageOnField('number', 'Preencha o numero');
        return false;
      }

      if (Utils.isEmpty($scope.user.address.neighborhood)) {

        setMessageOnField('neighborhood', 'Preencha o bairro');
        return false;
      }

      if (Utils.isEmpty($scope.user.address.complement)) {

        setMessageOnField('complement', 'Preencha o complemento');
        return false;
      }

      if (Utils.isEmpty($scope.user.address.zipcode)) {

        setMessageOnField('zipcode', 'Preencha o Cep');
        return false;
      }

      if (Utils.isEmpty($scope.user.address.city)) {

        setMessageOnField('city', 'Preencha a cidade');
        return false;
      }

      if (Utils.isEmpty($scope.user.address.state)) {

        setMessageOnField('state', 'Preencha o estado');
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

        case 'street':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgAddressColor = warningColor;
          angular.element('#street').focus();
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

        case 'neighborhood':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgNeighborhoodColor = warningColor;
          angular.element('#neighborhood').focus();
          break;

        case 'complement':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgComplementColor = warningColor;
          angular.element('#complement').focus();
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

        case 'state':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgStateColor = warningColor;
          angular.element('#state').focus();
          break;
      }
    }

  });
