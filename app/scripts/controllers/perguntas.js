'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('PerguntasCtrl', function ($scope, $window, $location, User, Utils) {


    Utils.setFixedMenu();
    $scope.user = User.getData();
    $scope.indexQuestion = 0;
    $scope.user.score = 0;


    var question_1 = {
      score : 560,
      iframeHeight: 1250,
      image: 'images/frigobar.png',
      title: 'Deseja ganhar descontos de em produtos da Brastemp?',
      description: 'Conheça o filtro bastemp e tal, seja feliz e de muitos clique para gente. Conheça o filtro bastemp e tal, seja feliz e de muitos clique para gente. ',
      urlAnswer: 'http://brastemp.acxiom.com.br/?utm_source=bleads&utm_medium=wbrastemp&utm_content=email'

    };

    var question_2 = {
      score : 100,
      image: 'images/wiseup.jpg',
      title: 'Do you speak english?',
      description: 'Deseja receber um super desconto na nossa mensalidade?',
      urlAnswer: 'http://www.wiseup.com'

    };

    var question_3 = {
      score : 200,
      image: 'images/greenpeace.jpg',
      title: 'Ajude o Greenpeace',
      description: 'Deseja receber um super desconto na nossa mensalidade?',
      urlAnswer: 'https://junte-se-ao-greenpeace.org.br/2014/?appeal=12446&utm_source=referral&utm_medium=partner'

    };

    var question_4 = {
      score : 130,
      image: 'images/chevrolet.png',
      title: 'Ganhe um carro chevolet',
      description: 'Deseja receber um super desconto na nossa mensalidade?',
      urlAnswer: 'http://compare-ja.com/chevrolet/'

    };


    var questionList = [question_1, question_2, question_3, question_4];

    $scope.question = {

      title: questionList[0].title,
      description: questionList[0].description,
      answerList: questionList[0].answerList,
      image: questionList[0].image,
      urlAnswer: questionList[0].urlAnswer
    };






    $scope.getNextQuestion = function(answer){

      if($scope.indexQuestion+1 !== questionList.length)  {

        $scope.indexQuestion = $scope.indexQuestion + 1;

      }else{
        $location.path('/participe');
      }

      if(answer){
        $scope.user.score = $scope.user.score + questionList[$scope.indexQuestion].score;
        $window.open($scope.question.urlAnswer, '_blank');
      }


      $scope.question = {

        title: questionList[$scope.indexQuestion].title,
        description: questionList[$scope.indexQuestion].description,
        answerList: questionList[$scope.indexQuestion].answerList,
        image: questionList[$scope.indexQuestion].image,
        urlAnswer: questionList[$scope.indexQuestion].urlAnswer
      };
    };


    function isLastQuestion(){
      return ($scope.indexQuestion+1 > questionList.length);
    }




      /*
      $scope.showPartner = function(){

        $('#imageProduct').css('display', 'none');
        $('#divPartners').css('display', 'block');

        $('#headerPergunta').css('display', 'none');
        $('#headerPontuacao').css('display', 'block');

        $('#mainView').css('background-color', '#ffffff');
        $('#mainView').css('position', 'fixed');
        $('#mainView').css('top', '0');
        $('#mainView').css('right', '0');
        $('#mainView').css('left', '0');
        $('#mainView').css('z-index', '888');
        $('#mainView').css('border-bottom', '2px solid #ddd');

        $('#iframePartners').attr('src', 'http://brastemp.acxiom.com.br/?utm_source=bleads&utm_medium=wbrastemp&utm_content=email');
        $('#iframePartners').css('height',$scope.question.iframeHeight);
        $('#iframePartners').css('padding-top','125px');
      }*/

  });
