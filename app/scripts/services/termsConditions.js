'use strict';


angular.module('gosteiclubApp')
  .service('TermsConditions', function ($rootScope, $location, SessionLanding) {


    this.getTermsConditionsText = function(){

      switch(SessionLanding.getLanguageOrigin()){

      case 'fr-FR':
        return this.getTermsConditionsTextFr();
        break;

      case 'pt-BR':
        return this.getTermsConditionsTextBr();
        break;
      }

    };


    this.getTermsConditionsTextFr = function(){
      return "<p>Conditions Générales d’utilisation</p><p>Présentation du site :</p><p>En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site www.opportunités.club l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi : </p><p>Propriétaire :The Yellow Box - Siège Social: 34 rue de Cléry Paris</p><p>Email :contact@opportunités.com</p><p>Responsable publication : contact@opportunités.com </p><p>Webmaster : contact@opportunités.com</p><br><br><p>Inscription :</p><p>Avant de pouvoir participer aux tests de produits et de recevoir des produits, l’internaute doit créer un compte en entrant ses données personnelles (prénom, nom, adresse postale et électronique, nombre d’enfants, âge, situation professionnelle et statut marital) dans un formulaire d’inscription.Une personne ne peut créer et utiliser qu’un seul compte et un seul compte sera autorisé par adresse postale. Après ouverture du compte, un email est envoyé à l’adresse électronique indiquée lors de l’inscription pour rappeler l’ensemble des identifiants (pseudo et mot de passe). L'internaute doit cliquer sur le lien de confirmation contenu dans cet email pour valider son inscription. Eligibilité pour recevoir un produit :Tout internaute inscrit en tant que membre peut potentiellement recevoir des produits.<br>Certaines règles s’appliquent cependant :<br><br>1. Nous sélectionnons les membres qui recevront un produit en fonction de leur profil et dans la limite du stock de produits disponibles.<br><br> 2. Le nombre de produits disponibles est indiqué pour chaque campagne.<br><br>3. Un membre ne pourra prétendre recevoir un nouveau produit tant qu’il n’aura pas donné son avis sur le produit précédemment testé.<br><br>4. Le membre s’engage à choisir seulement les produits qui l’intéressent.<br><br>5. En cas de sélection, le pseudo choisit par le membre sera publié ici : http://www.opportunités.club/tests-termines Si le pseudo choisit par le membre est le même que son adresse email, c'est cette dernière qui sera publiée sur le site.</p><br><br><p>Condition d’utilisation du service :</p><p>Seules les personnes physiques peuvent devenir membres (pas de sociétés).Pour vous inscrire, vous devez posséder des adresses, électronique et postale, valables et résider en France métropolitaine. Vous devez avoir atteint la majorité civile.De manière générale quand vous vous connectez au site :<br><br>-Vous vous engagez à respecter les présentes conditions d’utilisation,<br><br>-Vous êtes seul responsable des données que vous diffusez et/ou utilisez et/ou transférez.<br><br>-Vous vous engagez à ne pas diffuser des propos, opinions ou informations à caractère diffamatoire, dénigrant, injurieux, obscène, violent, raciste et plus généralement contrevenant aux textes légaux ou réglementaires français en vigueur, aux droits des personnes, à l’ordre public et aux bonnes moeurs.<br><br>-Vous vous engagez à ne pas diffuser de contenus publicitaires à caractère commercial. Lorsque vous êtes amené à fournir des informations, vous vous engagez à :<br><br>-délivrer des informations réelles, exactes, à jour au moment de leur saisie et notamment à ne pas utiliser de faux noms, qualités ou adresses, ou encore des noms, qualités ou adresses sans y être autorisé.<br><br>-maintenir à jour les données d'inscription en vue de garantir en permanence leur caractère réel et exact,-ne pas rendre disponible ou distribuer des informations, des programmes ou des éléments illégaux, répréhensibles ou encore nuisibles (tels que des virus, des logiciels de piratage ou de copie). En cas de violation de ces dispositions, les contenus que vous avez mis en ligne pourront être supprimés sans mise en demeure préalable et votre accès aux services pourra être suspendu ou résilié à vos torts exclusifs, et ce sans préjudice de toute action en responsabilité. Le propriétaire du site se réserve à tout moment le droit de supprimer le compte d’un membre si des informations personnelles trompeuses ou sciemment erronées ont été communiquées. Le propriétaire du site se réserve le droit de modifier, d’interrompre ou d’arrêter une campagne, avec ou sans avertissement à l’adresse des membres. Si ce droit est appliqué, le propriétaire du site ne peut en aucun cas être tenu responsable des préjudices directs ou indirects subis par un membre ou un tiers. <br><br></p><p>Gestion des données personnelles :</p><p>The Yellow Box conserve vos données sur des serveurs hautement sécurisés dont l'accès est réservé à des techniciens Reworld Media. Vos informations personnelles sont stockées de façon à ce qu'aucune personne non autorisée n'y ait accès et sont utilisées par www.opportunités.club uniquement dans le but de vous transmettre les offres qui vous correspondent le plus. <br><br> • www.opportunités.club ne communique pas les informations personnelles vous concernant à des tiers. Vous pouvez néanmoins choisir de leur transmettre lorsque vous recevez une offre de leur part.<br><br> • Le programme www.opportunités.club a fait l’objet d’une déclaration auprès de la Commission Nationale de l’Informatique et des Libertés sous le numéro 1510594. Il est édité par la société The Yellow Box, au capital de 5000,00 €.<br><br> • Le programme www.opportunités.club est basé sur une inscription de l'utilisateur. Vous recevez nos offres uniquement en participant au programme www.opportunités.club.<br><br> • www.opportunités.club se réserve le droit à tout moment de mettre fin à l'adhésion d'un membre. Le profil sera alors immédiatement supprimé. Les membres inscrits sont responsables de la validité de l'adresse email et/ou du numéro de portable communiqués.<br><br> • Les informations que vous nous communiquez et le détail de votre navigation transmis via un cookie sont à destination du programme www.opportunités.club dont vous souhaitez découvrir les offres ainsi que de ses partenaires. Les données que vous nous avez fournies nous permettront de vous faire bénéficier d’offres promotionnelles personnalisées, de gérer le fichier clients / prospects, de vous adresser des messages à des fins de prospection, de sécuriser nos services, de mesurer et analyser la consultation de nos services électroniques, et de céder les données à des tiers.<br><br></p><p>Limitations de responsabilité :</p><p>Les produits envoyés sont destinés au membre, il est donc seul responsable e l’usage qu’il en fait et s’il veut ou non les partager avec sa famille ou relations. Le propriétaire du site et les fabricants des produits envoyés ne sont en aucun cas responsable de l’usage qui sera fait des cadeaux envoyés à ses membres. Il est donc de la responsabilité de chaque membre de respecter l'usage prescrit par la société productrice et/ou distributrice du service ou produit que le propriétaire du site met à disposition du membre.L'utilisation du produit lors de l'essai offert par le propriétaire du site est donc de l'unique et entière responsabilité du membre. Le propriétaire du site s'engage à envoyer des produits aux personnes en âge de l’essayer.Le propriétaire du site ne pourra en aucun cas être porté responsable d'une mauvaise utilisation d'un produit envoyé.Par ailleurs, le propriétaire du site ne pourra être tenu responsable de dommages matériels liés à l’utilisation du site. De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis à jour.Le propriétaire du site ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site, et résultant soit de l’utilisation d’un matériel ne répondant pas aux spécifications indiquées ci-dessus, soit de l’apparition d’un bug ou d’une incompatibilité.Le propriétaire du site ne pourra également être tenu responsable des dommages indirects (tels par exemple qu’une perte de marché ou perte d’une chance) consécutifs à l’utilisation du site www.opportunités.club.Des espaces interactifs sont à la disposition des utilisateurs. Le propriétaire du site se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données. Le cas échéant, Le propriétaire du site se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale de l’utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie…).</p><br><br><p>Fermeture de compte :</p><p>Tous les membres ont, à tout moment, la possibilité de mettre un terme au service, par simple demande à cette adresse : contact@opportunitésLe propriétaire du site décline toute responsabilité vis-à-vis d’un membre ou d’un tiers en cas de fermeture d’un compte.Propriété intellectuelle :Le propriétaire du site est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels.Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable du propriétaire du site.Toute exploitation non autorisée du site ou d’un quelconque élément qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.D’autre part, le membre accepte que le propriétaire du site détienne l’entière propriété des avis consommateurs et commentaires déposés sur le site.Dans ce cadre, en déposant leur avis sur le site opportunités.clun, les utilisateurs consentent expressément et gratuitement à ce que la société The Yellow Box diffuse, reproduise et représente tout ou partie de leurs avis ainsi que leur pseudonyme par tout moyen de reproduction et représentation et sur tous supports dans le monde entier et pour une durée illimitée. Ainsi, le propriétaire du site, peut, si il le souhaite et après acceptation des présentes conditions par le membre, utiliser ces avis à des fins commerciales. </p><br><br><p>Liens hypertextes et cookies :</p><p>Le site www.opportunités.club contient un certain nombre de liens hypertextes vers d’autres sites, mis en place avec l’autorisation du propriétaire du site. Cependant, le propriétaire du site n’a pas la possibilité de vérifier le contenu des sites ainsi visités, et n’assumera en conséquence aucune responsabilité de ce fait.La navigation sur le site www.opportunités.club est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur. Un cookie est un fichier de petite taille, qui ne permet pas l’identification de l’utilisateur, mais qui enregistre des informations relatives à la navigation d’un ordinateur sur un site. Les données ainsi obtenues visent à faciliter la navigation ultérieure sur le site, et ont également vocation à permettre diverses mesures de fréquentation.Le refus d’installation d’un cookie peut entraîner l’impossibilité d’accéder à certains services. L’utilisateur peut toutefois configurer son ordinateur de la manière suivante, pour refuser l’installation des cookies :Sous Internet Explorer : onglet outil / options internet. Cliquez sur confidentialité et choisissez Bloquer tous les cookies. Validez sur Ok.Sous Firefox : onglet Outils / Options. Cliquez sur Vie privée et décochez Accepter les cookies. Validez sur Ok.Droit applicable et attribution de juridiction :Tout litige en relation avec l’utilisation du site www.opportunités.club est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents.</p><br><br><p>Conditions générales d’utilisation du site et des services proposés :</p><p>L’utilisation du site www.opportunités.club implique l’acceptation pleine et entière des conditions générales d’utilisation décrites ci-dessus. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site www.opportunités.club sont donc invités à les consulter de manière régulière.Le propriétaire du site se réserve le droit de modifier les présentes conditions d’utilisation à tout moment. Dans ce cas, les conditions applicables seront celles en vigueur à la date de votre connexion au site. Les présentes conditions d’utilisation sont soumises à la loi française.Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par www.opportunités.club, qui s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention.</p><br><br>";
    };

    this.getTermsConditionsTextBr = function(){

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
        '<p><a>Promoções Imperdiveis: <a href="http://www.promocoesimperdiveis.com.br/" target="_blank">link para a sua política de privacidade; </a></p>' +
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
