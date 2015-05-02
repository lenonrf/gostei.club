'use strict';


angular.module('gosteiclubApp')
  .controller('SucessoCtrl', function ($scope, $location, User, Utils, Product) {

    if(!Utils.isLogged(User.data)){
      $location.path('/main');
    }

    Utils.setFixedMenu();
    getProducts();

    console.log('USER', User.getData());

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

        //console.log('USER', userProducts);
        //console.log('DATA', data);

      }, function(err){

      });
    }

  });
