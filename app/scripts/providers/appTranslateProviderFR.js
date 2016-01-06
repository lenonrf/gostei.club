'use strict';

angular.module('gosteiclubApp')
  .provider('AppTranslateFR', function () {


    this.getTitle = function(){

      return 'Gostei.club - Votre club d’opportunités'

    };




    this.getFields = function(){

      return {
        'BUTTON_ENTER': 'Entrer',
        'BUTTON_ICO_NAME': 'Je souhaite participer',
        'BUTTON_IWANT': 'Je veux!',
        'BUTTON_NEXT': 'Prochain >',
        'BUTTON_FINISH': 'Fin',
        'GENDER_M': 'Homme',
        'GENDER_W': 'Femme',
        'GENDER': 'Civilité',
        'EMAIL': 'Email',
        'FULL_NAME': 'Nom / Prénom',
        'BIRTH': 'Date de Naissance',
        'CELLPHONE': 'Téléphone portable',
        'ZIPCODE': 'Code Postal',
        'NUMBER': 'Numéro',
        'STREET': 'Adresse Postale',
        //'NEIBOR': 'Bairro',
        'COMPL': 'Complément',
        //'STATE': 'Estado',
        'CITY': 'Ville'
      };
    };



    this.getMenuItems = function(){

      return {
        'ITSFREE_NAME': 'Gratuit?',
        'ITSFREE_HREF': '#degraca',
        'FREESAMPLES_NAME': 'Echantillons Gratuits',
        'FREESAMPLES_HREF': '#amostras',
        'OPORTUNITY_NAME': 'Opportunités',
        'OPORTUNITY_HREF': '#oportunidade',
        'TESTIMONIALS_NAME': 'Témoignages',
        'TESTIMONIALS_HREF': '#depoimentos',
        'BRANDS_NAME': 'Marques',
        'BRANDS_HREF': '#marcas'
      };
    };



    this.getItsFree = function(){

      return {

        'TITLE' : 'GRATUIT?',
        'DESC' : 'Oui, gratuit. Notre objectif é de partager votre opinion sur la qualité des produits à tous les membre de notre communauté de testeurs. Nous voulons vous faire découvrir des marques, en toute transparence et vous aidez à mieux acheter au quotidien.',

        'ITEM1.TITLE' : 'Vêtements et accesoires',
        'ITEM1.MARK1' : 'Chemises et t-shirts',
        'ITEM1.MARK2' : 'Robes, jupes, bijoux',
        'ITEM1.MARK3' : 'Casquettes, bonnets, parfums',
        'ITEM1.MARK4' : 'Encore plus...',
        'ITEM1.IMAGE' : 'http://gosteiclub-12bd.kxcdn.com/images/xtra/1.jpg',

        'ITEM2.TITLE' : 'Electronique et gadgets',
        'ITEM2.MARK1' : 'Souris, pad',
        'ITEM2.MARK2' : 'Clavier, Lecteurs MP3',
        'ITEM2.MARK3' : 'Montres, écouteurs',
        'ITEM2.MARK4' : 'Entre autres...',
        'ITEM2.IMAGE' : 'http://gosteiclub-12bd.kxcdn.com/images/xtra/2.jpg',

        'ITEM3.TITLE' : 'Aliments, boissons, produits de ménage',
        'ITEM3.MARK1' : 'Jus de fruits, sodas',
        'ITEM3.MARK2' : 'Désserts',
        'ITEM3.MARK3' : 'Produits domestques',
        'ITEM3.MARK4' : 'E bien plus encore...',
        'ITEM3.IMAGE' : 'http://gosteiclub-12bd.kxcdn.com/images/xtra/3.jpg'
      };
    };







    this.getMain = function(){

          return  {

            'TITLE': 'Recevez vos produits gratuitement chez vous',
            'DESC' : 'Faites partie de notre club d’Opportunités et découvrer toutes les astuces pour gagner de l’argent directement depuis chez vous!',
            'TITLE_LOGIN_BOX' : 'Renseignez votre email pour entrer',
            'CHECKOUT_LINK' : 'ou inscrivez vous',
            'BOX_DESC' : 'Gostei est 100% gratuit. Essayez!',
            'ACCESS_ACCOUNT' : 'Ou accédez à votre compte',
            'AGREE_WITH' : 'J’accepte les ',
            'TERMS_CONDITIONS' : 'conditions générales de vente'
          };
    };




    this.getBrands = function() {

          return {
            'TITLE': 'QUELQUES MARQUES TESTÉES',
            'DESC': 'Nous sommes toujours à la recherche de nouveaux partenaires, avec des produits intéressants, pour que vous puissiez tester et nous donner votre avis.'
          };

    };





    this.getFooter = function(){
      return {
        'DESC' : '2015. Tous Droits Réservés Gostei.club',
        'TERMS_CONDITIONS' : 'Conditions générales de vente',
        'PRIVACY_POLICY' : 'Protection des données',
        'IWANT_PARTICIPATE' : 'Je veux participer!'
      };
    };





    this.getBgHome = function(){
      return 'http://gosteiclub-12bd.kxcdn.com/images/bg_home_videncia2.png';
    };





    this.getOportunity = function (){

      return {
        'TITLE': 'OPPORTUNITÉS DU MOMENT',
        'DESC': 'Jetez un oeil aux produits que nous testons en ce moment et cliquez pour participer:',
        'UNITIES': 'unités',
        'FREE' : 'gratuites'
      };
    };




    this.getTestimonials = function () {

      return {

        'TITLE': 'TÉMOIGNAGES',
        'DESC': 'Plusieurs personnes ont déjà été selectionnées pour recevoir à domicilie, gratuitement, les produits que nous faisons tester. Faites partie vous aussi de notre communauté de testeurs.',

        'ITEM1.NAME': 'Claire Lefebvre',
        'ITEM1.DESC': '“J’ai adore recevoir ces produits directement chez moi”',
        'ITEM1.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p1.jpg',

        'ITEM2.NAME': 'Mathieu Russon',
        'ITEM2.DESC': '“Des produits exclusifs, sans rien payer? On ne peut qu’aimer!”',
        'ITEM2.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p2.jpg',

        'ITEM3.NAME': 'Estelle Maréchal',
        'ITEM3.DESC': '“Contrairement à d’autres sites, les produits ont bien été envoyé. J’ai donc retenté ma chance pour d’autres produits!”',
        'ITEM3.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p6.jpg',

        'ITEM4.NAME': 'Sophie Bouvet',
        'ITEM4.DESC': '“Aussi incroyable que cela puisse paraître, ce n’est pas de l’arnaque, les produits sont bien arrivés chez moi”',
        'ITEM4.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p5.jpg',

        'ITEM5.NAME': 'Helene Lucet',
        'ITEM5.DESC': '“J’ai adoré recevoir des nouveaux produits à essayer gratuitement! Merci :)”',
        'ITEM5.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p7.jpg',

        'ITEM6.NAME': 'Patricia Jorge',
        'ITEM6.DESC': '“J’ai aimé les produits reçus et le concept du site!”',
        'ITEM6.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p8.jpg'
      };
    };

    this.getHall = function(){

      return {

        'QUESTIONS': 'Questions',
        'OPORTUNITIES': 'Opportunités',
        'BUTTON_IWANT': 'Je veux!',
        'FREESAMPLES': 'Echantillons Gratuits',
        'DELIVERY': 'Livraison',

        'COREG_01' : 'Nous souhaitons en savoir davantage sur vous',
        'COREG_02' : 'Aidez nous à mieux cerner vos centres d’intérêts',

        'OPORTUNITY_01' : 'Augmentez vos chances d’être selectionné(e)',
        'OPORTUNITY_02' : 'Choisissez une des opportunités qui vous correspondent et augmentez vos chances d’être selectionné(e)',
        'OPORTUNITY_03' : 'SIM, Eu quero esta Oportunidade!',
        'OPORTUNITY_04' : 'Não tenho interesse',

        'FREESAMPLE_01' : 'Choisissez ce que vous souhaiter recevoir:',
        'FREESAMPLE_02' : 'Dites nous ce que vous souhaiteriez recevoir pour espérer faire partie des selectionés',
        'FREESAMPLE_03' : 'Unidades',
        'FREESAMPLE_04' : 'Grátis',
        'FREESAMPLE_05' : 'ESCOLHIDO',
        'FREESAMPLE_06' : 'EU QUERO!',

        'DELIVERY_01' : 'Complétez vos informations',
        'DELIVERY_02' : 'Nous avons besoin des ces informations pour vous envoyer les produits'
      };
    };



    this.getHome = function(){

      return {

        'HOME_00': 'Bonjour',
        'HOME_01': ', bienvenue à notre Club d’Opportunités',
        'HOME_02': 'Opportunités',
        'HOME_03': 'Nous travaillons pour vous offrir les meilleurs astuces du web.',
        'HOME_04' : 'Oui, je veux cette opportunité!',
        'HOME_05': 'Echantillons Gratuits',
        'HOME_06': 'Retrouvez ci-dessous',
        'HOME_07': ' la liste des produits que vous avez souhaité recevoir. N’hésitez pas à jeter un oeil aux autres opportunités du moment!',
        'HOME_08': 'unités',
        'HOME_09': 'gratuites'

      };
    };



    this.getValidation = function(){

      return {

        'EMAIL_NOT_FOUNT': 'Email pas trouvé',
        'LOGIN_FAILED' : 'Erreur lors de la saisie',
        'SIGNUP_FAILED' : 'Erreur lors de l\'enregistrement',
        'FORM_FAILED' : 'Remplissez le formulaire',
        'USER_FAILED' : 'Remplissez le utilisateur',
        'FULLNAME_FAILED' : 'Remplissez le nom complet',
        'EMAIL_FAILED' : 'Remplissez le email',
        'GENDER_FAILED' : 'Remplissez le Civilité',
        'BIRTH_FAILED' : 'Remplissez la date de naissance',
        'BIRTH_DAY_FAILED' : 'Remplissez un jour valide',
        'BIRTH_MONTH_FAILED' : 'Remplissez un mois valides',
        'CELLPHONE_FAILED' : 'Remplissez le Téléphone portable',
        'ZIPCODE_FAILED' : 'Remplissez le Code Postal',
        'NUMBER_FAILED' : 'Remplissez numéros',
        'CITY_FAILED' : 'Remplissez la ville',
        'STREET_FAILED' : 'Remplissez l\'adresse postale'

      };
    };


    this.$get = [function () {
      return new AppTranslateFR();
    }];

  });
