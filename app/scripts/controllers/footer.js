'use strict';


angular.module('gosteiclubApp')
  .controller('FooterCtrl', function ($scope, $rootScope, Menu) {


    $scope.showPoliticaPrivacidade = function(){

      $rootScope.titleModal = 'Política de Privacidade';
      $rootScope.textModal = '<p>Todas as suas informações pessoais recolhidas, serão usadas para o ajudar a tornar a sua visita no nosso site o mais produtiva e agradável possível.</p>' +
      '<p>A garantia da confidencialidade dos dados pessoais dos utilizadores do nosso site é importante para o gostei.club.</p>' +
      '<p>O uso do gostei.club pressupõe a aceitação deste Acordo de privacidade. A equipa do gostei.club reserva-se ao direito de alterar este acordo sem aviso prévio. Deste modo, recomendamos que consulte a nossa política de privacidade com regularidade de forma a estar sempre atualizado.</p>' +
      '</br></br>' +
      '<p><b>Ligações a Sites de terceiros</b></p>' +
      '<p>O gostei.club possui ligações para outros sites, os quais, a nosso ver, podem conter informações / ferramentas úteis para os nossos visitantes. A nossa política de privacidade não é aplicada a sites de terceiros, pelo que, caso visite outro site a partir do nosso deverá ler a politica de privacidade do mesmo. </p>' +
      '<p>Não nos responsabilizamos pela política de privacidade ou conteúdo presente nesses mesmos sites. </p>';

    };


    $scope.showTermos = function(){

      $rootScope.titleModal = 'Termos e Condições';

      $rootScope.textModal = '<p>Gostei.club é um Clube de Oportunidades que oferece aos seus participantes de forma 100% gratuita produtos e serviços para avaliação. O Participante do Clube indica sempre as oportunidades que deseja participar, recebendo em casa apenas o que gostaria de testar.</p><br /> ' +
      '<p>1) As avaliações de produtos e serviços serão divulgados no site com o percentual de aprovação de cada produto por cada usuário que participou do teste. Serão escolhidos o mínimo de 20 pessoas e o máximo de 1000 pessoas por teste.</p><br /> ' +
      '<p>2) As chances de escolha para avaliação de produtos aumenta se o participante estiver sempre com os dados completos e demonstrar interesse em nossos testes, divulgando na redes sociais o recebimentos dos produtos/amostras e indicando o site para amigos e familiares.</p><br /> ' +
      '<p>3) Os produtos não podem ser trocados ou substituídos. Serão enviados através dos correios para o local indicado pelo participante. É proibida a comercialização dos produtos recebidos para teste.</p><br /> ' +
      '<p>4) Estamos sempre abertos no nosso canal fale conosco para qualquer sugestão de produto e de melhorias para nosso Clube de Oportunidades.</p><br />' +
      '<p>5) Parceiros/Patrocinadores e suas áreas de atuação: Ao clicar em aceitar estes termos, declaro que autorizo a transmissão dos meus dados pessoais para o Parceiro/Patrocinador selecionado. Neste caso, o gostei.club selecionará para mim no máximo 3 Parceiros/Patrocinadores que melhor se adéqüem ao meu perfil de consumo </p>';



    };

  });
