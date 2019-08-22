(function () {
    'use strict';
    var app = angular.module('bookmgmtApp');
    app.controller('loginCtrl', ['$scope', '$rootScope', '$http', '$q', 'BOOKMGMTService', '$location', '$window', function ($scope, $rootScope, $http, $q, BOOKMGMTService, $location, $window) {
	
	$scope.authUser=function()
	{
		var encpwd=$scope.encryptPwd($scope.userpass);		
		
		BOOKMGMTService.postService({ key: 'authUser', username: $scope.username, password: encpwd }).
                    success(function(data, status) {
                        if (data!='error')
                            {
                                $scope.authdata = data.authUserOutput;
								if(!$scope.authdata[0].username)
								{
									alert("Invalid Credentials!");
								}
								else
								{
									$scope.loginSuccess();
									$scope.updateUsrName($scope.authdata[0].username);
									$scope.updateSession($scope.authdata[0].sessionid);
									$scope.createMain();
								}
                                
                        }
                    }).
                    error(function(data, status) {
                        console.log("error");
                    });
	}
	
	$scope.valLoginFields=function()
	{
		if($scope.username.length>0&&$scope.userpass.length>0)
		{
			$scope.fillloginform=0;
		}
		else
		{
			$scope.fillloginform=1;
		}
	}
	
	$scope.createUser=function()
	{
		$scope.setLoadScreen("Loading ...");
		
		$scope.initSignUp();
	}
	
	$scope.createMain=function()
	{
		$scope.setLoadScreen("Loading ...");
		
		$scope.initMainMenu();
	}
	
	$scope.resetData=function()
	{
		$scope.fillloginform=1;
		$scope.username="";
		$scope.userpass="";
	}
	
    $scope.init = function ()
	{
		$scope.resetData();
		
		$scope.unsetLoadScreen();
		
		setTimeout(function () { document.getElementById("usernameinp").focus(); }, 500);

    }

    $scope.init();
		
    }]);

})();