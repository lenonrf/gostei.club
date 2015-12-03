'use strict';


angular.module('gosteiclubApp')
  .service('TermsConditions', function () {


    this.getTermsConditionsText = function(){

      return '<p>Gostei.club é um Clube de Oportunidades que oferece aos seus participantes de forma 100% gratuita produtos e serviços para avaliação. O Participante do Clube indica sempre as oportunidades que deseja participar, recebendo em casa apenas o que gostaria de testar.</p><br /> ' +
      '<p>As avaliações de produtos e serviços serão divulgados no site com o percentual de aprovação de cada produto por cada usuário que participou do teste. Serão escolhidos o mínimo de 20 pessoas e o máximo de 1000 pessoas por teste.</p><br /> ' +
      '<p>As chances de escolha para avaliação de produtos aumenta se o participante estiver sempre com os dados completos e demonstrar interesse em nossos testes, divulgando na redes sociais o recebimentos dos produtos/amostras e indicando o site para amigos e familiares.</p><br /> ' +
      '<p>Os produtos não podem ser trocados ou substituídos. Serão enviados através dos correios para o local indicado pelo participante. É proibida a comercialização dos produtos recebidos para teste.</p><br /> ' +
      '<p>Estamos sempre abertos no nosso canal fale conosco para qualquer sugestão de produto e de melhorias para nosso Clube de Oportunidades.</p><br />' +
        '' +
        '<br>' +
        '<p>Gostei.club respeita e protege a privacidade dos seus membros (a seguir “Usuários”) e, de acordo com a legislação Brasileira, e descreve a seguir todas as informações relativas ao tratamento de dados pessoais fornecidos por usuários que interagem com os serviços oferecidos pelo site http://gostei.club/ </p>' +
        '<br>' +
        '<p><b>1. Objetivo do tratamento:</p></b>' +
        '<p>Os seus dados pessoais são coletados através de formulário especial no site e utilizado para os seguintes fins: </p>' +
        '<p>a) Inscrição no site: os dados serão utilizados para finalizar o cadastro no site; </p>' +
        '<p>b) A prestação de serviços Site: os dados serão utilizados para prestar os serviços oferecidos pelo site e que você tenha solicitado. O fornecimento de seus dados pessoais para os fins referidos nas alíneas a) e b) é necessário se você quiser usar os serviços oferecidos pelo site e qualquer recusa de fornecê-los tornará inviável a prestação dos serviços em questão. </p>' +
        '<br>' +
        '<p><b>2. Outros finalidades de tratamento:</b></p>' +
        '<p>c) Marketing, marketing direto, sorteios, pesquisas, comunicações comerciais: com o seu consentimento, os seus dados podem também ser tratados pelo titular, para efeitos de envio de material publicitário para vendas diretas, pesquisas de mercado, sorteios , inquéritos, envio de publicidade e informativo, mesmo em relação a outras empresas. O consentimento para a utilização para esses fins é opcional e qualquer recusa não afeta a prestação de serviços necessários. Lembramos que você pode se descadastrar a qualquer momento, tendo como consequência o fim do tratamento dos seus dados para os fins previamente descritos.</p>' +
        '<p>d) Comunicação a terceiros com o seu consentimento expresso e voluntário, suas informações pessoais podem ser divulgadas a terceiros (definidos abaixo enquanto “Patrocinadores”) que procederão a um tratamento de dados similar porém independente, para os mesmos fins de comercialização referidas na alínea c): envio de materiais publicitários, vendas diretas, pesquisas de mercado, sorteios, pesquisas e comunicações comerciais, também por e-mail, sobre os produtos e serviços . Mais uma vez, o consentimento para utilizar para esses fins é opcional e qualquer recusa será prejudicial à prestação dos serviços do site.</p>' +
        '<br>' +
        '<p><b>3. Método de tratamento</b></p>' +
        '<p>Em conexão com os efeitos acima mencionados, os dados transitarão por via eletrônica ou suporte físico, tanto em papel como em qualquer caso, com a utilização de instrumentos que garantam a segurança e a confidencialidade através da adoção de medidas de segurança prescritas pelo Código. Informamos que os seus dados pessoais serão mantidos nas instalações dos titulares dos dados ou empresas de terceiros que oferecem os chamados serviços de “hospedagem”, que são processadores de dados nomeados e autorizados. </p>' +
        '<br>' +
        '<p><b>4. Os dados processados</b></p>' +
        '<p>Dados pessoais: Os titulares deste website recolherão e tratarão os dados voluntariamente fornecidos por você no momento da inscrição ou em estágios mais avançados para aproveitar os serviços oferecidos pelo Site; em seguida: a) Nome b) Sobrenome c) Data de nascimento d) Sexo e) E-mail f) Endereço g) CEP h) Cidade i) Estado j) CEP k) DDD l) País Navegação dados: procedimentos de software e sistemas de informação no comando a operação de sites pode adquirir, durante o seu funcionamento normal, alguns dados cuja transmissão está implícita nos protocolos de comunicação da Internet. Esta informação não é recolhida por nós para ser associado com identificado, mas por sua própria natureza poderia, através de elaborações e associações com dados mantidos pelo titular ou por terceiros, para identificar usuários. Esta categoria de dados inclui endereços IP ou nomes de domínio dos computadores utilizados pelos usuários que se conectam ao site, URI (Uniform Resource Identifier) dos recursos solicitados, a hora do pedido, o método usado para enviar a pedido ao servidor, o tamanho do arquivo obtido em resposta, o código numérico que indica o estado de resposta a partir do servidor (bem sucedida, erro, etc.) e outros parâmetros para o sistema operacional o computador e navegador. Estes dados, potencialmente adquiridos durante a utilização do site, pode ser usado pelo proprietário com a única finalidade de obter informações estatísticas anônimas sobre o local para identificar as suas páginas preferidas pelos usuários para fornecer um conteúdo mais adequado e para verificar a operação correta. Os dados podem ser utilizados para determinar a responsabilidade no caso de crimes contra o computador local. Qualquer identificação exata dos usuários com esses dados só será possível se for solicitado e obtido o consentimento prévio. </p>' +
        '<br>' +
        '<p><b>5. Divulgação de dados</b></p>' +
        '<p>Teremos acesso a informações pessoais de nossos funcionários encarregados do tratamento, e os funcionários e gerentes fora da empresa responsável pela realização das operações de aperfeiçoamento. Depois de obter o seu consentimento, os seus dados poderão ser comunicados, mesmo fora do Brasil e da União Europeia, para empresas controladas/coligadas ou controladoras da Gostei.club, sujeitos a cessionários de empresa ou unidade de negócios, a empresa resultante de possíveis fusões ou cisões do Gostei.Club, bem como outras empresas envolvidas nas áreas de marketing e vendas diretas de produtos e serviços pela Internet e outras tecnologias de comunicação na distância. Em particular, com o seu consentimento, os seus dados pessoais podem ser transferidos para fora do Brasil e da União Europeia, e transferidos a terceiros para o seu tratamento para fins comerciais e de publicidade. Essas empresas vão atuar como controladores de dados independentes e assumem toda a responsabilidade pelo conteúdo de sua publicidade e do respeito das regras sobre o tratamento de dados pessoais, nomeando os controladores devem confiar o tratamento dos seus dados em “outsourcing”. </p>' +
        '<p>Os patrocinadores autorizados a realizar processamento autônomo são: </p>' +
        '<p><a>Caloga: <a href="http://www.caloga.br.com/html/dperso.php/" target="_blank">link para a sua política de privacidade; </a></p>' +
        '<br>' +
        '<p><b>6. O tratamento responsável</b></p>' +
        '<p>O proprietário dos dados fornecidos pelos usuários é Gostei.club. O processador de dados é a pessoa responsável pela empresa de gestão de banco de dados. Em seu pedido, o proprietário vai fornecer o nome do seu processador de dados. </p>' +
        '<br>' +
        '<p><b>7. Direitos de artigo 7 do Código</b></p>' +
        '<p>Os indivíduos cujos dados pessoais são recolhidos e processados têm o direito a qualquer momento de obter a confirmação da existência desses dados e de conhecer o conteúdo e a origem, além de verificar sua exatidão ou solicitar sua integração, atualização, correção.</p>' +
        '<br><br><br><br><br>';
    };

    return this;

  });
