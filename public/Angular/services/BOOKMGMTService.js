(function () {
    'use strict';
    var app= angular.module('bookmgmtApp');    

    app.factory("BOOKMGMTService",["$http","$q","$location", function($http,$q,$location) {

	var factory = {}; 
 
    factory.getService = function(inputJson) {
            var protocol=$location.protocol();
            var host=$location.host();
            var port= $location.port() ;           
            return     $http({
                                url: protocol + "://" + host + ":" + port + "/GetGateway", 
                                method: "GET",
                                params: inputJson
                            });        
    }
    
    factory.postService = function(inputJson) { 
            var protocol=$location.protocol();
            var host=$location.host();
            var port= $location.port();
            return     $http({                                
                                url: protocol + "://" + host + ":" + port + "/PostGateway", 
                                method: "POST",
                                data: inputJson
                            });                
     }

    return factory;

  }]);
})();