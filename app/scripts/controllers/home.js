'use strict';


angular.module('gosteiclubApp')
  .controller('HomeCtrl', function ($scope, $http, $location, User, Utils, Product, Question) {

    if(!Utils.isLogged(User.data)){
      $location.path('/main');
    }

    Utils.setFixedMenu();
    getProducts();
    getOportunityList();

    $scope.user = User.getData();


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
