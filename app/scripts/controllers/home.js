'use strict';


angular.module('gosteiclubApp')
  .controller('HomeCtrl', function ($scope, $rootScope, $http, $location, Menu, User, Utils, Product) {

    Menu.setMenu('HomeCtrl');
    $rootScope.showFooter = false;

    if(!Utils.isLogged(User.data)){
      $location.path('/main');
    }

    Utils.setFixedMenu();

    //if(Utils.isEmpty($rootScope.products)){
      getProducts();
    //}

    getOportunityList();

    $scope.user = User.getData();
    $scope.campaign = User.getCampaing($location);



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

      console.log('Email', User.data.email);
      console.log('$scope.user', $scope.user.products);

      //var user = {}
      //user.products = $scope.user.products;
      //console.log('user', user);
      //User.resource.put({'email'  : User.data.email}, user.products, onSuccess, onError);

    };

    function onSuccess(data) {
      console.log('SUCESS', data);

    }

    function onError(data) {
      console.log('ERROR', data);

    }


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

        console.log('data', data);
        console.log('$scope.products', $scope.products);

      }, function(err){

      });
    }



    /**
     * Rertona uma lista de oportunidades cadastradas
     * @returns {*[]}
     */
    function getOportunityList() {


      $http.get('/api/oportunities/sorteios').
        success(function(data) {

          $scope.data = data;
          $scope.oportunities = [];

          for(var i=0; i<$scope.data.length; i++){
            if($scope.data[i].status === true){
              $scope.oportunities.push($scope.data[i]);
            }
          }

          //console.log('oportunities', $scope.oportunities);

        }).
        error(function(data, status) {
          console.log('ERROR '+status, data);
        });




      $http.get('/api/oportunities/cupons').
        success(function(data, status, headers, config) {

          $scope.data = data;
          $scope.cupons = [];

          for(var i=0; i<$scope.data.length; i++){
            if($scope.data[i].status === true){
              $scope.cupons.push($scope.data[i]);
            }
          }

          //console.log('cupons', $scope.cupons);
        }).
        error(function(data, status, headers, config) {
          console.log('ERROR '+status, data);
        });
    }

  });
