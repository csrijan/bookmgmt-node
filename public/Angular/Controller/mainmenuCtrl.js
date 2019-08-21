(function () {
    'use strict';
    var app = angular.module('bookmgmtApp');
    app.controller('mainmenuCtrl', ['$scope', '$rootScope', '$http', '$q', 'BOOKMGMTService', '$location', '$window', function ($scope, $rootScope, $http, $q, BOOKMGMTService, $location, $window) {
		
		$scope.createBook=function()
		{
			
			$scope.setLoadScreen("Loading ...");
			
			$scope.setBackBtn();
			
			$scope.initCreate();
			
		}
		
		$scope.editBook=function()
		{
			
			$scope.setLoadScreen("Loading ...");
			
			$scope.setBackBtn();
			
			$scope.initEdit();
			
		}
		
		$scope.listBook=function()
		{
			
			$scope.setLoadScreen("Loading ...");
			
			$scope.setBackBtn();
			
			$scope.initList();
			
		}
		
		$scope.deleteBook=function()
		{
			
			$scope.setLoadScreen("Loading ...");
			
			$scope.setBackBtn();
			
			$scope.initDelete();
			
		}
		
		$scope.init=function()
		{
			
			$scope.unsetLoadScreen();
			
			$scope.initBackBtn();
			
		}
		
		$scope.init();

    }]);

})();