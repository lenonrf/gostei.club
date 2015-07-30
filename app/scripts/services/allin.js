'use strict';

angular.module('gosteiclubApp')
  .service('Allin', function (Utils) {


    this.enviarDadosAllin = function(data){

      var allin = {
        evento : 'Novo Cadastro',
        nm_email: data.email,
        lista:{
          nm_lista: 'gostei.club',
          nome: data.name,
          sexo: data.gender,
          dt_cadastro: Utils.getDateFormated(null)
        }
      };

      try{
        lc.sendData(allin);
      }catch (e){
        console.log('erro', e);
      }

    };

  });
