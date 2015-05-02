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
        image: 'frigobar.png',
        title: 'Receba 1 mês de filtro Brastemp Grátis!',
        description: 'Conheça o filtro bastemp e tal, seja feliz e de muitos clique para gente. Conheça o filtro bastemp e tal, seja feliz e de muitos clique para gente. ',
        urlAnswer: 'http://brastemp.acxiom.com.br/?utm_source=bleads&utm_medium=wbrastemp&utm_content=email'

      };

      var question_2 = {
        idQuestion : 2,
        score : 100,
        image: 'wiseup.jpg',
        title: 'Do you speak english?',
        description: 'Deseja receber um super desconto na nossa mensalidade?',
        urlAnswer: 'http://www.wiseup.com'

      };

      var question_3 = {
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
        description: 'Deseja receber um super desconto na nossa mensalidade?',
        urlAnswer: 'http://compare-ja.com/chevrolet/'

      };


      return [question_1, question_2, question_3, question_4];
    };

  });
