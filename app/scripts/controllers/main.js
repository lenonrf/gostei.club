'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('MainCtrl', function ($scope, $location, $modal, Utils, User, Login, $http) {

    Utils.setDefaultMenu();

    $scope.user = User.getData() || {};
    $scope.user.terms = true;
    $scope.disableButton = false;
    $scope.showFormFields = true;



    $scope.items = ['item1', 'item2', 'item3'];


    $scope.open = function () {

      console.log('aki');

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '../../views/myModalContent.html',
        controller: 'ModalTermosCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };


    /**
     * Efetua o login do usuario
     * @param user
     * @returns {boolean}
     */
    $scope.login = function(user){

      if(!validateLogin(user)) return false;

      User.resource.get({email:user.email}, onSuccessDefault, onErrorLogin);
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

      $http.post('/api/users', data).success(onSuccessDefault).error(onErrorCheckout);

    };


    /**
     * Função de sucesso para login e cadastro
     * @param data
     */
    function onSuccessDefault(data, status) {

      data.isLogged = true;

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
