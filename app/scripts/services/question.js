'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Question
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .service('Question', function ($resource) {

    /**
     * Retorna uma lista de questoes para o usuario
     * @returns {*[]}
     */
    this.getQuestionList = function(){

      var question_1 = {
        idQuestion : 1,
        score : 560,
        iframeHeight: 1250,
        image: 'english.jpeg',
        title: 'Como está o seu Inglês? Te damos 14 dias Grátis na EnglishTown.',
        description: 'inscreva-se e utilize 14 dias sem pagar nada.',
        urlAnswer: 'http://www.englishtown.com.br/'

      };

     var question_2 = {
        idQuestion : 2,
        score : 100,
        image: 'seulima.jpeg',
        title: 'Está no ar a promoção Encontro Premiado, ganhe até 350 mil reais.',
        description: 'é só clicar e participar, é sem pagar nada!',
        urlAnswer: 'http://encontropremiado.com.br/cadastro/criar/?mktcode=X4EL01&transaction_id=&nome=&sobrenome=&email='

      };

      /* var question_3 = {
        idQuestion : 3,
        score : 200,
        image: 'greenpeace.jpg',
        title: 'Ajude o Greenpeace',
        description: 'Deseja receber um super desconto na nossa mensalidade?',
        urlAnswer: 'https://junte-se-ao-greenpeace.org.br/2014/?appeal=12446&utm_source=referral&utm_medium=partner'

      };

      var question_4 = {
        idQuestion : 4,
        score : 130,
        image: 'chevrolet.png',
        title: 'Ganhe um carro chevolet',
        description: 'Mensalmente, o dinheiro é retirado da conta para compor um ou mais bens. A pessoa pode ser contemplada por lance (oferecer maior percentual em relação ao valor do bem) ou sorteio.',
        urlAnswer: 'http://compare-ja.com/chevrolet/'

      };*/

      return [question_1];

      //return [question_1, question_2, question_3, question_4];
    };

  });
