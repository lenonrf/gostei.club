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
                                    $http, Product, $translate, TermsConditions) {



    $scope.googleAnaliticsId = '';


    if(User.isUserFromEmail($location)){
      var user = {};
      user.email = $location.search().email;
      $scope.executeLogin(user, 'home');
    }

    Menu.setMenu('MainCtrl');

    $rootScope.sessionLanding = {};
    $scope.user = User.getData() || {};
    $scope.user.address = {}
    $scope.user.ddd = '';

    $scope.ddds = [null,11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,41,42,43,44,45,46,47,48,49,
      51,53,54,55,61,62,63,64,65,66,67,68,69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99];

    $scope.user.terms = true;
    $scope.disableButton = false;
    $scope.showFormFields = true;
    $scope.showFormFields_STEP2 = false;
    $rootScope.showFooter = true;

    $rootScope.titleModal = 'Termos e Condoções';
    $rootScope.textModal = TermsConditions.getTermsConditionsText();

    $rootScope.titleMain = $translate.instant('TITLE');
    $rootScope.deviceAccess = Utils.getDevice();


    var sessionCode = SessionLanding.getSessionCode($location);
    if(sessionCode != null){
      $http.get('/api/sessionlanding?code='+sessionCode).success(function(data){

        $rootScope.sessionLanding = data[0];
        $rootScope.sessionLandingData = SessionLanding.getDataFromLanding($rootScope, sessionCode);


        switch($rootScope.sessionLanding.languageOrigin){

          case 'fr-FR':
            $scope.googleAnaliticsId = 'UA-72415942-1';
            break;

          case 'pt-BR':
            $scope.googleAnaliticsId = 'UA-61389086-1';
            break;
        }

       // console.log('GA', $scope.googleAnaliticsId);


        /*!function(A,n,g,u,l,a,r){A.GoogleAnalyticsObject=l,A[l]=A[l]||function(){
          (A[l].q=A[l].q||[]).push(arguments)},A[l].l=+new Date,a=n.createElement(g),
          r=n.getElementsByTagName(g)[0],a.src=u,r.parentNode.insertBefore(a,r)
        }(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', $scope.googleAnaliticsId, 'auto');
        */

      }).error(function(){});
    }




    var canal = (sessionCode === 'echantillon') ? 'opportunites.club' : 'gostei.club';
    Canal.resource.query(
      //{code: Canal.defineUserCanal($location)}, function(data){
      {code: canal}, function(data){
        $scope.user.canal =  data[0]._id;
    });

    Product.resource.query(function(data){
      $scope.products = data;
    }, function(err){ });








    /**
     * Efetua o login do usuario
     * @param user
     * @returns {boolean}
     */
    $scope.login = function(user){
      $scope.executeLogin(user, 'home');
    };

    $scope.executeLogin = function(user, page) {

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

    };


    $scope.checkoutStepOne = function (user) {

      if (!validateFieldsStepOne(user)) return false;

      user.languageOrigin = SessionLanding.getLanguageOrigin($location);
      User.resourceEmail.get({email:user.email}, function(data){

        User.setData(data);
        User.setLogged(true);
        $location.path('/perguntas');

      }, function(){

        if($rootScope.sessionLanding.languageOrigin === 'fr-FR'){
          user.name = user.name;
        }

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

      user.cellphone = user.ddd+''+user.cellphone;
      user.birthDate = Utils.getBirthDate(user.birthDate);
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
        setMessageOnLogin($translate.instant('VALIDATION.EMAIL_NOT_FOUNT'));
      }

      if (data.status === 500) {
        setMessageOnLogin($translate.instant('VALIDATION.LOGIN_FAILED'));
      }
    }


    /**
     * Trata os erros do cadastro
     * @param data
     */
    function onErrorCheckout(data, status, transformResponse) {

      if (status === 400) {
        setMessageOnField('email', $translate.instant('VALIDATION.SIGNUP_FAILED'));
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
      angular.element('#messageStatus').html( $translate.instant('VALIDATION.FORM_FAILED'));
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

          setMessageOnField('name', $translate.instant('VALIDATION.USER_FAILED'));
          return false;

        }else{

          user.name = user.name.trim();
          var isFullName = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(user.name);

          if(!isFullName){
            setMessageOnField('name', $translate.instant('VALIDATION.FULLNAME_FAILED'));
            return false;
          }
        }

        if (Utils.isEmpty(user.email)) {

          setMessageOnField('email', $translate.instant('VALIDATION.EMAIL_FAILED'));
          return false;
        }


        if (Utils.isEmpty(user.gender)) {

          setMessageOnField('gender', $translate.instant('VALIDATION.GENDER_FAILED'));
          return false;
        }


      } else {

        $scope.bgMsgColor = '#CD0000';
        $scope.bgGenderColor = '#FFFACD';
        $scope.bgEmailColor = '#FFFACD';
        $scope.bgUserColor = '#FFFACD';

        angular.element('#lname').focus();
        angular.element('#messageStatus').html($translate.instant('VALIDATION.FORM_FAILED'));

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


        if($rootScope.sessionLanding.languageOrigin != 'fr-FR'){

          if (Utils.isEmpty(user.ddd)) {
            setMessageOnField('ddd', $translate.instant('VALIDATION.DDD_FAILED'));
            return false;
          }
        }





        if($rootScope.sessionLanding.languageOrigin === 'fr-FR'){

          console.log('user.cellphone', user.cellphone);
          console.log('user.telephone', user.telephone);

          if ( Utils.isEmpty(user.cellphone) && Utils.isEmpty(user.telephone)) {

            setMessageOnField('', $translate.instant('VALIDATION.CELLPHONE_FAILED'));
            return false;
          }

        }else{

          if (Utils.isEmpty(user.cellphone)) {

            setMessageOnField('cellphone', $translate.instant('VALIDATION.CELLPHONE_FAILED'));
            return false;
          }

        }







        if (Utils.isEmpty(user.birthDate)) {

          setMessageOnField('birthDate', $translate.instant('VALIDATION.FORM_FAILED'));
          return false;

        }else{

          var day   = user.birthDate.substr(0, 2);
          var month = user.birthDate.substr(2, 2);
          //var year  = user.birthDate.substr(4, 4);

          if(day>31){
            setMessageOnField('birthDate', $translate.instant('VALIDATION.BIRTH_DAY_FAILED'));
            return false;
          }

          if(month>12){
            setMessageOnField('birthDate', $translate.instant('VALIDATION.BIRTH_MONTH_FAILED'));
            return false;
          }

        }



        if (Utils.isEmpty(user.address.zipcode)) {

          setMessageOnField('zipcode', $translate.instant('VALIDATION.ZIPCODE_FAILED'));
          return false;

        }


      } else {

        $scope.bgMsgColor = '#CD0000';
        $scope.bgCellphoneColor = '#FFFACD';
        $scope.bgBirthColor = '#FFFACD';
        $scope.bgZipCodeColor = '#FFFACD';

        angular.element('#lname').focus();
        angular.element('#messageStatus').html($translate.instant('VALIDATION.FORM_FAILED'));

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


        case 'ddd':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgCellphoneColor = warningColor;
          angular.element('#ddd').focus();
          break;

        case 'cellphone':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgCellphoneColor = warningColor;
          angular.element('#cellphone').focus();
          break;

        case 'telephone':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgTelephoneColor = warningColor;
          angular.element('#telephone').focus();
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
