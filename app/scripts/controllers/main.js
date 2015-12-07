'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, $modal, SessionLanding,
                                    deviceDetector, Cep, Canal, Allin, Menu, Utils, User, Login,
                                    $http, Product, TermsConditions) {

    $rootScope.isStepButtonDisabled = false;
    $rootScope.showFooter = true;
    $rootScope.titleModal = 'Termos e Condoções';
    $rootScope.textModal = TermsConditions.getTermsConditionsText();


    $rootScope.deviceAccess = Utils.getDevice();
    SessionLanding.getSessionLanding($location, $rootScope);

    Menu.setMenu('MainCtrl');

    $scope.user = User.getData() || {};
    $scope.user.address = {}
    $scope.user.terms = true;
    $scope.disableButton = false;
    $scope.showFormFields = true;
    $scope.showFormFields_STEP2 = false;

    Canal.resource.query(
      {code: Canal.defineUserCanal($location)}, function(data){
        $scope.user.canal =  data[0]._id;
    });


    if(User.isUserFromEmail($location)){
      var user = {};
      user.email = $location.search().email;
      executeLogin(user, 'home');
    }

    Product.resource.query(function(data){
      $scope.products = data;
    }, function(err){ });


    /**
     * Efetua o login do usuario
     * @param user
     * @returns {boolean}
     */
    $scope.login = function(user){
      executeLogin(user, 'home');
    };


    function executeLogin(user, page) {

      if(!validateLogin(user)) return false;

      User.resourceEmail.get({email:user.email}, function(data){

        User.setData(data);
        User.setLogged(true);

        if(User.isUserCompleted(data)){
          $location.path('/'+page);
        }else{
          $location.path('/perguntas');
        }


      }, onErrorLogin);

    }


    $scope.checkoutStepOne = function (user) {

      if (!validateFieldsStepOne(user)) return false;

      User.resourceEmail.get({email:user.email}, function(data){

        User.setData(data);
        User.setLogged(true);
        $location.path('/perguntas');

      }, function(){

          User.resource.save(user, function(data){
            Allin.sendDataToWelcomeLifeCycle(data);
            showStep2();
          });
      });

    };


    /**
     * Executa o cadastro do usuario
     * @param user
     * @returns {boolean}
     */
    $scope.checkoutStepTwo = function (user) {

      if (!validateFieldsStepTwo(user)) return false;
      $scope.disableButton = true;

      user.birthDate = Utils.getBirthDate(user.birthDate);
      console.log('user', user);

      User.resourceEmail.put({'email'  : user.email}, user, onSuccess, onErrorCheckout);

      /*Cep.resource.get({cep: $scope.user.address.zipcode}, function(data){

        user.address = {
          'zipcode': data.cep,
          'city' : data.localidade,
          'state' : data.uf,
          'neighborhood' : data.bairro,
          'street' : data.logradouro
        };

        User.resourceEmail.put({'email'  : user.email}, user, onSuccess, onErrorCheckout);

      }, function(err){
        user.address.zipcode = null;
        $scope.disableButton = false;
        validateFieldsStepTwo(user);
      });*/

    };


    /**
     * Função de sucesso para cadastro
     * @param data
     */
    function onSuccess(data, status) {

      User.setData(data);
      User.sendSponsoring();
      User.setLogged(true);
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
    function onErrorCheckout(data, status, transformResponse) {

      if (status === 400) {
        setMessageOnField('email', 'Erro ao cadastrar');
        $scope.disableButton = false;

      }

      if (status === 409) {
        executeLogin({email:data.email}, 'home');
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



    function showStep2() {

      $scope.showFormFields = false;
      $scope.showFormFields_STEP2 = true;
      $scope.bgMsgColor = '#3498db';
      angular.element('#messageStatus').html('Complete o formul&aacute;rio');
    }




    /**
     *
     * -------------------------------------------------------------------------------------------------------
     * VALIDATORS
     */


    function validateFieldsStepOne(user) {

      var status = true;

      $scope.bgUserColor = '#FFFFFF';
      $scope.bgEmailColor = '#FFFFFF';
      $scope.bgGenderColor = '#FFFFFF';
      $scope.bgBirthColor = '#FFFFFF';

      if (!Utils.isEmpty(user)) {


        if (Utils.isEmpty(user.name)) {

          setMessageOnField('name', 'Preencha o usu&aacuterio');
          return false;

        }else{

          user.name = user.name.trim();
          var isFullName = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(user.name);

          if(!isFullName){
            setMessageOnField('name', 'Preencha com nome completo');
            return false;
          }
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



    function validateFieldsStepTwo(user) {

      var status = true;

      $scope.bgCellphoneColor = '#FFFFFF';
      $scope.bgBirthColor = '#FFFFFF';
      $scope.bgZipCodeColor = '#FFFFFF';

      if (!Utils.isEmpty(user)) {


        if (Utils.isEmpty(user.birthDate)) {

          setMessageOnField('birthDate', 'Preencha a Data de Nascimento');
          return false;

        }else{

          var day   = user.birthDate.substr(0, 2);
          var month = user.birthDate.substr(2, 2);
          //var year  = user.birthDate.substr(4, 4);

          if(day>31){
            setMessageOnField('birthDate', 'Preencha um dia válido');
            return false;
          }

          if(month>12){
            setMessageOnField('birthDate', 'Preencha um mês válido');
            return false;
          }

        }










        if (Utils.isEmpty(user.cellphone)) {

          setMessageOnField('cellphone', 'Preencha o Celular');
          return false;
        }









        if (Utils.isEmpty(user.address.zipcode)) {

          setMessageOnField('zipcode', 'Cep Inválido');
          return false;

        }



      } else {

        $scope.bgMsgColor = '#CD0000';
        $scope.bgCellphoneColor = '#FFFACD';
        $scope.bgBirthColor = '#FFFACD';
        $scope.bgZipCodeColor = '#FFFACD';

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

        case 'cellphone':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgCellphoneColor = warningColor;
          angular.element('#cellphone').focus();
          break;

        case 'zipcode':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgZipCodeColor = warningColor;
          angular.element('#zipcode').focus();
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
