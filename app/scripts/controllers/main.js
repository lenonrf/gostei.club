'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('MainCtrl', function ($scope, $location, Utils, User, $http) {

    $scope.user = User.getData() || {};
    $scope.user.birthDate = null;
    $scope.user.terms = true;
    $scope.disableButton = false;
    $scope.showFormFields = true;

    function getBirthDate(birthField){

      if(Utils.isEmpty(birthField)) return null;

      var day   = birthField.substr(0, 2);
      var month = birthField.substr(2, 2);
      var year  = birthField.substr(4, 4);

      return new Date(year+'-'+month+'-'+day);
    }


    $scope.checkout = function (user) {



      if (validateFields(user)) {

        console.log(user.birthDate);
        console.log(getBirthDate(user.birthDate));


        $scope.user.data = {
          'name': user.name,
          'email': user.email,
          'gender': user.gender,
          'birth': getBirthDate($scope.user.birthDate)
        };

        $scope.disableButton = true;
        User.resource.save($scope.user.data, onSuccess, onError);

      }
    };


    function onSuccess(data) {

      console.log('sucess', data);


      User.setData({
        name: data.name,
        email: data.email,
        gender: data.gender
      });

      $location.path('/perguntas');
    }


    function onError(data) {

      console.log('error', data);

      if (data.status === 400) {

        setMessageOnField('email', 'Email j&aacute; cadastrado');
        $scope.disableButton = false;

      }
    }


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


        if (Utils.isEmpty(user.birthDate)) {

          setMessageOnField('birthDate', 'Preencha a data de nascimento');
          return false;

        }else{

          if(user.birthDate.length === 8){

            var day   = user.birthDate.substr(0, 2);
            var month = user.birthDate.substr(2, 2);
            var year  = user.birthDate.substr(4, 4);

            if(day > '31'){
              setMessageOnField('birthDate', 'Dia Invalido');
              return false;
            }

            if(month > '12'){
              setMessageOnField('birthDate', 'Mes Invalido');
              return false;
            }

            if(year > new Date().getFullYear()){
              setMessageOnField('birthDate', 'Ano Invalido');
              return false;
            }

          }else{
            setMessageOnField('birthDate', 'Preencha a data de nascimento');
            return false;
          }
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


  });
