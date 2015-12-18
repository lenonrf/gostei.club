'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('SessionLanding', function ($http) {

    this.data = {};



    this.getSessionCodeByLocation = function(location){

      var sessionCode = null;

      switch (location.host()){

        case 'www.gostei.club':
          case 'gostei.club':
            sessionCode = 'amostras';
            break;

        case 'www.revendas.gostei.club':
          case 'revendas.gostei.club':
            sessionCode = 'revendas';
            break;

        case 'www.videncias.gostei.club':
        case 'videncias.gostei.club':
          sessionCode = 'videncias';
          break;
      }

      return sessionCode

    };




    /**
     * TODO - Remover quando a internacionalização for implementada
     */
    this.getDataFromLanding = function(rootScope, sessionCode){

      var objReturn = {};
      objReturn.main = {};
      objReturn.deGraca = {};
      objReturn.deGraca.item1 = {};
      objReturn.deGraca.item2 = {};
      objReturn.deGraca.item3 = {};
      objReturn.marcas = {};

      objReturn.isAmostras = false;
      objReturn.isRevendas = false;
      objReturn.isVidencias = false;

      switch (sessionCode){

        case 'amostras':

          objReturn.isAmostras = true;

          objReturn.showDeGraca = true;
          objReturn.showDeGracaImages = true;
          objReturn.showOportunidades = true;
          objReturn.showDepoimentos = true;
          objReturn.showMarcas = true;

          objReturn.main.title = 'Receba Produtos Grátis em Casa!';
          objReturn.main.desc = 'Faça parte do nosso Clube de Oportunidades, receba produtos em casa sem pagar nada e nos conte o que achou!';

          objReturn.deGraca.title = 'DE GRAÇA?';
          objReturn.deGraca.desc = 'Sim, de graça. Nosso objetivo é levar a opinião sobre a qualidade dos produtos para todos os participantes do gostei.club. Aproximando as marcas dos consumidores, gerando transparência e informação na hora da compra.';

          objReturn.deGraca.item1.title = 'Roupas e Acessórios';
          objReturn.deGraca.item1.mark1 = 'Camisetas, Camisas';
          objReturn.deGraca.item1.mark2 = 'Vestidos, Saias, Bijuterias';
          objReturn.deGraca.item1.mark3 = 'Bonés, Chapéus, Perfumes';
          objReturn.deGraca.item1.mark4 = 'Muitos outros...';
          objReturn.deGraca.item1.image = 'http://gosteiclub-12bd.kxcdn.com/images/xtra/1.jpg';

          objReturn.deGraca.item2.title = 'Eletrônicos e Gadgets';
          objReturn.deGraca.item2.mark1 = 'Mouse, Mouse Pad';
          objReturn.deGraca.item2.mark2 = 'Teclados, Mp3 Players';
          objReturn.deGraca.item2.mark3 = 'Relógios, Fones';
          objReturn.deGraca.item2.mark4 = 'Entre outros...';
          objReturn.deGraca.item2.image = 'http://gosteiclub-12bd.kxcdn.com/images/xtra/2.jpg';

          objReturn.deGraca.item3.title = 'Comidas, bebidas e itens de limpeza';
          objReturn.deGraca.item3.mark1 = 'Sucos, Refrigerantes';
          objReturn.deGraca.item3.mark2 = 'Gelatinas e Doces';
          objReturn.deGraca.item3.mark3 = 'Produtos de Limpeza';
          objReturn.deGraca.item3.mark4 = 'E muito mais...';
          objReturn.deGraca.item3.image = 'http://gosteiclub-12bd.kxcdn.com/images/xtra/3.jpg';

          objReturn.marcas.title = 'ALGUMAS MARCAS TESTADAS';
          objReturn.marcas.desc = 'Sempre procuramos bons parceiros, com produtos interessantes, para você testar e nos dizer o que acha.';

          objReturn.bgHome = 'http://gosteiclub-12bd.kxcdn.com/images/bg_home.png';


          break;




        case 'revendas':

          objReturn.isRevendas = true;

          objReturn.showDeGraca = true;
          objReturn.showDeGracaImages = false;
          objReturn.showOportunidades = false;
          objReturn.showDepoimentos = false;
          objReturn.showMarcas = true;

          objReturn.main.title = 'Aumente a sua renda trabalhando em casa!';
          objReturn.main.desc = 'Faça parte do nosso clube de Oportunidades e descubra todas as revendas disponíveis no mercado para você aumentar a sua renda trabalhando de casa!';

          objReturn.deGraca.title = 'DE GRAÇA?';
          objReturn.deGraca.desc = 'Sim, de graça. Nosso objetivo é levar as melhores oportunidades para os participantes do nosso clube. Seja um novo trabalho, uma revenda, ou qualquer outra oportunidade na internet que  ajude nossos usuários! Veja algumas coisas que você pode revender!';

          objReturn.marcas.title = 'ALGUMAS MARCAS QUE TRABALHAMOS';
          objReturn.marcas.desc = 'Sempre procuramos bons parceiros, com produtos interessantes, para você testar e nos dizer o que acha.';

          objReturn.bgHome = 'http://gosteiclub-12bd.kxcdn.com/images/bg_home_revenda.png';

          break;




        case 'videncias':

          objReturn.isVidencias = true;

          objReturn.showDeGraca = true;
          objReturn.showDeGracaImages = true;
          objReturn.showOportunidades = false;
          objReturn.showDepoimentos = false;
          objReturn.showMarcas = false;

          objReturn.main.title = 'Descubra agora o seu futuro, é Grátis!';
          objReturn.main.desc = 'Separamos dentro do nosso Clube de Oportunidades os melhores especialistas para você saber sobre Astrologia, Tarot, Horóscopo, entre outros!';

          objReturn.deGraca.title = 'DE GRAÇA?';
          objReturn.deGraca.desc = 'Sim, de graça. Nosso objetivo é levar as melhores oportunidades para os participantes do nosso clube. Assim, você consegue saber tudo sobre vidências, simpatias, tarot, ciganas, cartomantes, para ajudar a prever o seu futuro.';

          objReturn.deGraca.item1.title = 'Vidência';
          objReturn.deGraca.item1.mark1 = 'Simpatias';
          objReturn.deGraca.item1.mark2 = 'Videntes Grátis';
          objReturn.deGraca.item1.mark3 = 'Astrologia';
          objReturn.deGraca.item1.mark4 = 'Videntes Online';
          objReturn.deGraca.item1.image = 'http://gosteiclub-12bd.kxcdn.com/images/mark1_videncia.jpg';

          objReturn.deGraca.item2.title = 'Tarot';
          objReturn.deGraca.item2.mark1 = 'Consultar Tarot';
          objReturn.deGraca.item2.mark2 = 'Tarot Grátis';
          objReturn.deGraca.item2.mark3 = 'Simpatias poderosas';
          objReturn.deGraca.item2.mark4 = 'Leitura de Tarot';
          objReturn.deGraca.item2.image = 'http://gosteiclub-12bd.kxcdn.com/images/mark2_videncia.jpg';

          objReturn.deGraca.item3.title = 'Melhore sua Vida';
          objReturn.deGraca.item3.mark1 = 'Simpatias poderosas para o amor';
          objReturn.deGraca.item3.mark2 = 'Melhore seus relacionamentos';
          objReturn.deGraca.item3.mark3 = 'Arrume um novo emprego';
          objReturn.deGraca.item3.mark4 = 'Tenha um novo romance';
          objReturn.deGraca.item3.image = 'http://gosteiclub-12bd.kxcdn.com/images/mark3_videncia.jpg';

          objReturn.bgHome = 'http://gosteiclub-12bd.kxcdn.com/images/bg_home_videncia2.png';

          break;

      }

      return objReturn;
    };



    return this;

  });
