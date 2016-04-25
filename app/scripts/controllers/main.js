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
                                    $http, Product, $translate, TermsConditions, Malling, Partners) {

    $scope.googleAnaliticsId = '';
    $rootScope.isFR = (SessionLanding.getLanguageOrigin() === 'fr-FR');
    $rootScope.isBR = (SessionLanding.getLanguageOrigin() === 'pt-BR');
    $scope.isMX = (SessionLanding.getLanguageOrigin() === 'es-MX');

    $scope.isPartnersAllowed = true;
    $scope.partners = [];
    $scope.isAgreeWith = true;


    /**
     * Parceiros
     */
    $http.get('/api/sponsoring').success(function(dataResult){

      for(var x=0; x<dataResult.length; x++){
        if(dataResult[x].partner.isPartner){
          $scope.partners.push(dataResult[x].partner);
        }
      }
    }).error(function(){});


    if(User.isUserFromEmail($location)){
      var user = {};
      user.email = $location.search().email;

      if(!validateLogin(user)) return false;

      User.resourceEmail.get({email:user.email}, function(data){

        User.setData(data);
        User.setLogged(true);

        if(User.isUserCompleted(data)){
          $location.path('/home');
        }else{
          $location.path('/perguntas');
        }

      }, onErrorLogin);
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

      }).error(function(){});
    }



    Canal.resource.query({code: Canal.getCanalCode($location) }, function(data){
      $scope.user.canal =  data[0]._id;
    });


    Product.resource.query(function(data){
      $scope.products = data;
    }, function(err){ });


    $scope.showTermos = function(){
      $rootScope.textModal = TermsConditions.getTermsConditionsText();
    };

    $scope.showPartners = function(){
      $rootScope.textModal = Partners.getPartners($scope.partners);
    };




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

      user.languageOrigin = SessionLanding.getLanguageOrigin();
      User.resourceEmail.get({email:user.email}, function(data){

        User.setData(data);
        User.setLogged(true);
        $location.path('/perguntas');

      }, function(){


        User.resource.save(user, function(data){
          //Malling.createContact(data);
          //Malling.sendWelcomeMail(data);
          //Allin.sendDataToWelcomeLifeCycle(data);
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


      if(SessionLanding.getLanguageOrigin() === 'pt-BR'){
        user.cellphone = user.ddd+''+user.cellphone;
      }

      if(SessionLanding.getLanguageOrigin() === 'fr-FR' ||
         SessionLanding.getLanguageOrigin() === 'es-MX'){
        user.cellphone = user.cellphoneFR;
        user.telephone = user.telephoneFR;
      }



      user.birthDate = Utils.getBirthDate(user.birthDate);
      User.resourceEmail.put({'email'  : user.email}, user, onSuccess, onErrorCheckout);

    };


    /**
     * Função de sucesso para cadastro
     * @param data
     */
    function onSuccess(data, status) {

      // Envia Sponsorings
      $http.post('/api/users/'+data._id +'/sponsoring'
        + '?sessionlanding='+$rootScope.sessionLanding._id+'&isPartnerAllowed='+$scope.isPartnersAllowed
        + '&deviceAccess='+$rootScope.deviceAccess).success(function(dataResult){
        }).error(function(){});

      //Malling.updateContact(data);


      User.setData(data);
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

          var isFullName = /^(([A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+[\-\']?)*([A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+)?\s)+([A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+[\-\']?)*([A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+)?$/.test(user.name);

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



        if(!$scope.isAgreeWith){
          setMessageOnField('isAgreeWith', $translate.instant('VALIDATION.ISAGREEWITH'));
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




        if(SessionLanding.getLanguageOrigin() === 'pt-BR'){

          if (Utils.isEmpty(user.ddd)) {
            setMessageOnField('ddd', $translate.instant('VALIDATION.DDD_FAILED'));
            return false;
          }
        }


        if(SessionLanding.getLanguageOrigin() === 'fr-FR'||
          SessionLanding.getLanguageOrigin() === 'es-MX'){

          if (Utils.isEmpty(user.telephoneFR)) {

            setMessageOnField('telephone', $translate.instant('VALIDATION.TELEPHONE_FAILED'));
            return false;

          }else{

            if(user.telephoneFR.length != 10){
              setMessageOnField('telephone', $translate.instant('VALIDATION.TELEPHONE_FAILED'));
              return false;
            }

            if(SessionLanding.getLanguageOrigin() === 'fr-FR'){

              if((user.telephoneFR.startsWith('01'))
                || (user.telephoneFR.startsWith('02'))
                || (user.telephoneFR.startsWith('03'))
                || (user.telephoneFR.startsWith('04'))
                || (user.telephoneFR.startsWith('05'))
                || (user.telephoneFR.startsWith('09'))){

              }else{
                setMessageOnField('telephone', $translate.instant('VALIDATION.TELEPHONE_FAILED'));
                return false;
              }
            }

          }


          if (Utils.isEmpty(user.cellphoneFR)) {

            setMessageOnField('cellphone', $translate.instant('VALIDATION.CELLPHONE_FAILED'));
            return false;

          }else{

            if(user.cellphoneFR.length != 10){
              setMessageOnField('cellphone', $translate.instant('VALIDATION.CELLPHONE_FAILED'));
              return false;
            }

            if(SessionLanding.getLanguageOrigin() === 'fr-FR'){


              if((user.cellphoneFR.startsWith('06'))
                || (user.cellphoneFR.startsWith('07'))){

              }else{
                setMessageOnField('cellphone', $translate.instant('VALIDATION.CELLPHONE_FAILED'));
                return false;
              }
            }
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


        case 'isAgreeWith':

          $scope.bgMsgColor = msgErrorColor;
          angular.element('#isAgreeWith').focus();
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
