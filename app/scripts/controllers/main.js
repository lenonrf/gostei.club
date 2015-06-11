'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, $modal, Utils, User, Login, $http, Product) {

    Utils.setDefaultMenu();

    $scope.user = User.getData() || {};
    $scope.user.terms = true;
    $scope.disableButton = false;
    $scope.showFormFields = true;
    $rootScope.showMenuItems = true;

    getProducts();



    /**
     * Retorna os produtos cadastrados
     * @returns {*|{method, isArray}}
     */
    function getProducts() {

      Product.resource.query(function(data){
        $scope.products = data;
      }, function(err){});
    }




    /**
     * Efetua o login do usuario
     * @param user
     * @returns {boolean}
     */
    $scope.login = function(user){

      if(!validateLogin(user)) return false;

      User.resource.get({email:user.email}, function(data){

        data.isLogged = true;
        User.setData(data);
        $location.path('/perguntas');

      }, onErrorLogin);
    };


    /**
     * Executa o cadastro do usuario
     * @param user
     * @returns {boolean}
     */
    $scope.checkout = function (user) {

      if (!validateFields(user)) return false;

      $scope.disableButton = true;

      var data = {
        'name': user.name,
        'email': user.email,
        'gender': user.gender
      };

      //envio de dados para o bando de dados
      $http.post('/api/users', data).success(onSuccessDefault).error(onErrorCheckout);

    };


    /**
     * Função de sucesso para cadastro
     * @param data
     */
    function onSuccessDefault(data, status) {

      data.isLogged = true;
      
      // envio de dados para allin
      var allin = {
        evento : 'Novo Cadastro',
        nm_email: data.email,
        lista:{
          nm_lista: 'gostei.club',
          nome: data.name,
          sexo: data.gender,
          dt_cadastro: Utils.getDateFormated(null)
        }
      };

      try{
        lc.sendData(allin);
      }catch (e){
        console.log('erro', e);
      }

      User.setData(data);
      $location.path('/perguntas');
    }


    /**
     * Trata os erros vindo do login
     * @param data
     */
    function onErrorLogin(data) {

      console.log('ERROR - onErrorLogin', data);

      if (data.status === 404) {
        setMessageOnLogin('Email não cadastrado');
      }

      if (data.status === 500) {
        setMessageOnLogin('Erro ao logar');
      }
    }


    /**
     * Trata os erros do cadastro
     * @param data
     */
    function onErrorCheckout(data, status) {

      console.log('ERROR - onErrorCheckout', data);

      if (status === 400) {
        setMessageOnField('email', 'Email j&aacute; cadastrado');
        $scope.disableButton = false;

      }
    }



    $scope.showLoginForm = function(){

      $('#loginForm').css('display', 'block');
      $('#formFields').css('display', 'none');

    };


    $scope.showCheckoutForm = function(){
      $('#loginForm').css('display', 'none');
      $('#formFields').css('display', 'block');
      $("#lname").focus();
    }





    /**
     *
     * -------------------------------------------------------------------------------------------------------
     * VALIDATORS
     */


    function validateFields(user) {

      var status = true;

      $scope.bgUserColor = '#FFFFFF';
      $scope.bgEmailColor = '#FFFFFF';
      $scope.bgGenderColor = '#FFFFFF';
      $scope.bgBirthColor = '#FFFFFF';

      if (!Utils.isEmpty(user)) {


        if (Utils.isEmpty(user.name)) {

          setMessageOnField('name', 'Preencha o usu&aacuterio');
          return false;
        }

        if (Utils.isEmpty(user.email)) {

          setMessageOnField('email', 'Preencha o email');
          return false;
        }


        if (Utils.isEmpty(user.gender)) {

          setMessageOnField('gender', 'Preencha o sexo');
          return false;
        }


      } else {

        $scope.bgMsgColor = '#CD0000';
        $scope.bgGenderColor = '#FFFACD';
        $scope.bgEmailColor = '#FFFACD';
        $scope.bgUserColor = '#FFFACD';

        angular.element('#lname').focus();
        angular.element('#messageStatus').html('Preencha o formul&aacute;rio');

        status = false;
      }

      return status;
    }


    function setMessageOnField(field, message) {

      setFieldWarning(field);
      angular.element('#messageStatus').html(message);
    }

    function setFieldWarning(field) {

      var warningColor = '#FFFACD';
      var msgErrorColor = '#CD0000';

      switch (field) {

        case 'name':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgUserColor = warningColor;
          angular.element('#lname').focus();
          break;

        case 'email':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgEmailColor = warningColor;
          angular.element('#email').focus();
          break;

        case 'gender':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgGenderColor = warningColor;
          angular.element('#gender').focus();
          break;

        case 'birthDate':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgBirthColor = warningColor;
          angular.element('#bithDate').focus();
          break;

        case 'emailAlreadyThere':

          $scope.bgMsgColor = '#749c0d';
          $scope.bgEmailAlreadyColor = '#3498db';
          angular.element('#checkoutButton').html('Entrar');
          break;
      }
    }


    function validateLogin(user){

      if (Utils.isEmpty(user.email)) {
        setMessageOnLogin('Preencha o email');
        return false;
      }

      return true;
    }


    function setMessageOnLogin(message) {

      $scope.bgMsgLoginColor = '#CD0000';
      $scope.bgEmailLoginColor = '#FFFACD';

      angular.element('#emailLogin').focus();
      angular.element('#messageStatusLogin').html(message);
    }
  });
