'use strict';


angular.module('gosteiclubApp')
  .controller('HomeCtrl', function ($scope, $rootScope, $http,$translate, $location, Menu, User, Utils, Product, SessionLanding) {

      
    $rootScope.originTrafficSource = SessionLanding.getOriginTraficSource($location);


    Menu.setMenu('HomeCtrl');
    $rootScope.showFooter = false;

    if(!Utils.isLogged(User.data)){
      $location.path('/main');
    }

    $scope.user = User.getData();
    $scope.campaign = User.getCampaing($location, $rootScope.deviceAccess, $rootScope.sessionLanding);

    getProducts();
    getOportunityList();

    $scope.escolhido = $translate.instant('HALL.FREESAMPLE_05');
    $scope.euquero =  $translate.instant('HALL.FREESAMPLE_06');

    /**
     * Salva a opcao de produto escolhido pelo usuario
     * @param product
     */
    $scope.saveProduct = function (product) {


      if( (product.marked === false) || (Utils.isEmpty(product.marked))){

        product.marked = true;
        $scope.user.products.push(product);

      }else{

        product.marked = false;
        $scope.user.products.splice($scope.user.products.indexOf(product), 1);

      }
    };



    /**
     * Retorna os produtos cadastrados
     * @returns {*|{method, isArray}}
     */
    function getProducts() {

      Product.resource.query(function(data){

        $scope.products = data;
        var userProducts = User.getData().products;

        for(var p_index=0; p_index<data.length; p_index++){

          data[p_index].marked = false;

          for(var u_index=0; u_index<userProducts.length; u_index++){

            if(userProducts[u_index]._id === data[p_index]._id){
              data[p_index].marked = true;
            }
          }
        }

      }, function(err){

      });
    }



    /**
     * Rertona uma lista de oportunidades cadastradas
     * @returns {*[]}
     */
    function getOportunityList() {

      if(!$rootScope.sessionLanding){
        return null;
      }

      $http.get('/api/oportunities/user/'+$scope.user._id
      +'?sessionlanding='+$rootScope.sessionLanding._id
      +'&deviceAccess='+$rootScope.deviceAccess).success(function(data){

          $scope.data = data;
          $scope.oportunities = [];

          for(var i=0; i<$scope.data.length; i++){
            if($scope.data[i].status === true){
              $scope.oportunities.push($scope.data[i]);
            }
          }


        }).
        error(function(data, status) {
          console.log('ERROR '+status, data);
        });



    }

  });
