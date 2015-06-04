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

      var portal = {
        idQuestion : 1,
        score : 560,
        iframeHeight: 1250,
        image: 'udbc.jpeg',
        title: 'Sua carreira precisa melhorar? Estude pela internet e Ganhe um Tablet Totalmente Grátis.',
        description: 'Faça aulas 100% on-line e conclua a sua pós graduação.',
        urlAnswer: 'http://springmedia.go2cloud.org/aff_c?offer_id=396&aff_id=1208&source=AFF'

      };


      var magazine = {
        idQuestion : 1,
        score : 560,
        iframeHeight: 1250,
        image: 'magazine.jpeg',
        title: 'Que tal montar uma loja na internet só sua e de graça?',
        description: 'Aumente  sua renda com a loja totalmente GRÁTIS da Magazine Luiza. Divulgue os produtos para seus amigos e família e fature alto da sua própria casa.',
        urlAnswer: 'http://springmedia.go2cloud.org/aff_c?offer_id=214&aff_id=1208&source=AFF'

      };

      var englishtown = {
        idQuestion : 1,
        score : 560,
        iframeHeight: 1250,
        image: 'english.jpeg',
        title: 'Não está muito bem no Inglês? Podemos te ajudar!',
        description: 'Cadastre-se na EnglishTown e receba 14 dias de aulas COMPLETAMENTE GRÁTIS.',
        urlAnswer: 'http://springmedia.go2cloud.org/aff_c?offer_id=246&aff_id=1208&source=AFF'

      };

     var seulima = {
        idQuestion : 2,
        score : 100,
        image: 'seulima.jpeg',
        title: 'Quer ganhar até 350 mil reais sem fazer nada?',
        description: 'É só se cadastrar na promoção Encontro Premiado e torcer para ser sorteado!',
        urlAnswer: 'http://springmedia.go2cloud.org/aff_c?offer_id=439&aff_id=1208&source=AFF'

      };

      var fundoBrasil = {
        idQuestion : 2,
        score : 100,
        image: 'direitos.jpeg',
        title: 'Você é contra a violência contra a mulher?',
        description: 'Saiba como apoiar a defesa dos direitos humanos no Brasil, é Grátis!',
        urlAnswer: 'http://springmedia.go2cloud.org/aff_c?offer_id=338&aff_id=1208&source=AFF'

      };

      var gslim = {
        idQuestion : 2,
        score : 100,
        image: 'gslim.jpg',
        title: 'Perca peso muito mais rapido!',
        description: 'O G-SLIM é um novo e poderoso aliado na perda de peso. Graças à sua ação anti-oxidante, seu corpo todo funciona melhor e você emagrece muito mais rápido!',
        urlAnswer: 'http://springmedia.go2cloud.org/aff_c?offer_id=304&aff_id=1208&source=AFF'

      };

      var dietaDosNumeros = {
        idQuestion : 2,
        score : 100,
        image: 'dietaDosNumeros.jpg',
        title: 'O segredo da boa forma em suas mãos',
        description: 'Com a dieta dos números Seleções você não precisa mais passar fome e poderá esquecer as dietas cheias de restrições que trazem apenas resultados temporários.',
        urlAnswer: 'http://springmedia.go2cloud.org/aff_c?offer_id=366&aff_id=1208&source=AFF'

      };

      var turmaDaMonica = {
        idQuestion : 2,
        score : 100,
        image: 'turmaDaMonica.jpg',
        title: 'Deixe que a Turma da Mônica desperte o prazer da leitura no seu filho.',
        description: 'GANHE 6 PRESENTES GRÁTIS!',
        urlAnswer: 'http://springmedia.go2cloud.org/aff_c?offer_id=176&aff_id=1208&source=AFF&url_id=1216'

      };

      var megaLipo = {
        idQuestion : 2,
        score : 100,
        image: 'kitlipo.jpg',
        title: 'Necessita emagrecer urgente? Agora você pode.',
        description: 'Saiba como apoiar a defesa dos direitos humanos no Brasil, é Grátis!',
        urlAnswer: 'http://springmedia.go2cloud.org/aff_c?offer_id=310&aff_id=1208&source=AFF'

      };


      return [dietaDosNumeros, englishtown, seulima, turmaDaMonica, gslim, magazine];

    };

  });
