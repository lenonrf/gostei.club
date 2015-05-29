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
        image: 'udbc.jpeg',
        title: 'Sua carreira precisa melhorar? Estude pela internet e Ganhe um Tablet Totalmente Grátis.',
        description: 'Faça aulas 100% on-line e conclua a sua pós graduação.',
        urlAnswer: 'http://www.portaleducacao.com.br/adnet/lppos/?'

      };


      var question_2 = {
        idQuestion : 1,
        score : 560,
        iframeHeight: 1250,
        image: 'magazine.jpeg',
        title: 'Que tal montar uma loja na internet só sua e de graça?',
        description: 'Aumente  sua renda tendo uma loja totalmente GRÁTIS da Magazine Luiza. Divulgue os produtos para seus amigos e família e fature alto da sua casa.',
        urlAnswer: 'https://www.magazinevoce.com.br'

      };

      var question_3 = {
        idQuestion : 1,
        score : 560,
        iframeHeight: 1250,
        image: 'english.jpeg',
        title: 'Não está muito bem no Inglês? Podemos te ajudar!',
        description: 'Cadastre-se na EnglishTown e receba 14 dias de aulas COMPLETAMENTE GRÁTIS.',
        urlAnswer: 'http://www.englishtown.com.br/'

      };

     var question_4 = {
        idQuestion : 2,
        score : 100,
        image: 'seulima.jpeg',
        title: 'Quer ganhar até 350 mil reais sem fazer nada?',
        description: 'É só se cadastrar na promoção encontro premiado e torcer para ser sorteado!',
        urlAnswer: 'http://encontropremiado.com.br/cadastro/criar/?mktcode=X4EL01&transaction_id=&nome=&sobrenome=&email='

      };

      var question_5 = {
        idQuestion : 2,
        score : 100,
        image: 'direitos.jpeg',
        title: 'Você é contra a violência contra a mulher?',
        description: 'Saiba como apoiar a defesa dos direitos humanos no Brasil, é Grátis!',
        urlAnswer: 'http://springmedia.go2cloud.org/aff_c?offer_id=338&aff_id=1208&source=AFF'

      };


      return [question_1, question_2, question_3, question_4, question_5];

    };

  });
