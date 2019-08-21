(function () {
    'use strict';
    var app = angular.module('bookmgmtApp');
    app.controller('signupCtrl', ['$scope', '$rootScope', '$http', '$q', 'BOOKMGMTService', '$location', '$window', function ($scope, $rootScope, $http, $q, BOOKMGMTService, $location, $window) {
	
	$scope.registerUser=function()
	{
		var encpwd=$scope.encryptPwd($scope.usersupass);
		
		BOOKMGMTService.postService({ key: 'addUser', username: $scope.usersuname, password: encpwd }).
                    success(function(data, status) {
                        if (data!='error')
                            {
                                $scope.registerdata = data;
								if($scope.registerdata=="Success")
								{
									$scope.resetData();
									alert("Successfully Registered!");
								}
								else if($scope.registerdata=="Duplicate")
								{
									alert("Already Registered!");
								}
								else if($scope.registerdata=="Failed")
								{
									alert("Error!");
								}
                                
                        }
                    }).
                    error(function(data, status) {
                        console.log("error");
                    });
	}
	
	$scope.returnLogin=function()
	{
		$scope.setLoadScreen("Loading ...");
		
		$scope.initLogin();
	}
	
	$scope.valSignupFields=function()
	{
		if($scope.usersuname.length>0&&$scope.usersupass.length>0&&$scope.usersurepass.length>0)
		{
			if($scope.usersupass == $scope.usersurepass)
			{
				$scope.fillsignupform=0;
			}
			else
			{
				$scope.fillsignupform=1;
			}
		}
		else
		{
			$scope.fillloginform=1;
		}
	}
	
	$scope.resetData=function()
	{
		$scope.fillsignupform=1;
		$scope.usersuname="";
		$scope.usersupass="";
		$scope.usersurepass="";
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