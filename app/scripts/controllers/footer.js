'use strict';


angular.module('gosteiclubApp')
  .controller('FooterCtrl', function ($scope, $location, SessionLanding, $rootScope, TermsConditions) {


    $scope.isFR = (SessionLanding.getLanguageOrigin() === 'fr-FR');
    $scope.isMX = (SessionLanding.getLanguageOrigin() === 'es-MX');


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

      $rootScope.textModal = TermsConditions.getTermsConditionsText();


    };

  });
