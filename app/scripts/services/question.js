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
        image: 'claro.jpeg',
        title: 'Em época de crise é bom rever os plano de TV a cabo, que tal pagar apenas 49,90?',
        description: '90 canais com 2 equipamentos!',
        urlAnswer: ''

      };

      var question_2 = {
        idQuestion : 1,
        score : 560,
        iframeHeight: 1250,
        image: 'udbc.jpeg',
        title: 'Ganhe Grátis um Tablet',
        description: 'Nos cursos do Portal Educação você ganha um tablet',
        urlAnswer: 'http://www.portaleducacao.com.br/adnet/lppos/?'

      };

      var question_3 = {
        idQuestion : 1,
        score : 560,
        iframeHeight: 1250,
        image: 'magazine.jpeg',
        title: 'Precisando aumentar a sua renda? Que tal montar uma loja na internet só sua?',
        description: 'É só se cadastrar e trabalhar de casa!',
        urlAnswer: 'https://www.magazinevoce.com.br'

      };

      var question_4 = {
        idQuestion : 1,
        score : 560,
        iframeHeight: 1250,
        image: 'english.jpeg',
        title: 'Como está o seu Inglês? Te damos 14 dias Grátis na EnglishTown.',
        description: 'inscreva-se e utilize 14 dias sem pagar nada.',
        urlAnswer: 'http://www.englishtown.com.br/'

      };

     var question_5 = {
        idQuestion : 2,
        score : 100,
        image: 'seulima.jpeg',
        title: 'Está no ar a promoção Encontro Premiado, ganhe até 350 mil reais.',
        description: 'É só clicar e participar, é sem pagar nada!',
        urlAnswer: 'http://encontropremiado.com.br/cadastro/criar/?mktcode=X4EL01&transaction_id=&nome=&sobrenome=&email='

      };


      return [question_1, question_2, question_3, question_4, question_5];

      //return [question_1, question_2, question_3, question_4];
    };

  });
