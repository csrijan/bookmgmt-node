(function () {
    'use strict';
    var app = angular.module('bookmgmtApp');
    app.controller('createCtrl', ['$scope', '$rootScope', '$http', '$q', 'BOOKMGMTService', '$location', '$window', function ($scope, $rootScope, $http, $q, BOOKMGMTService, $location, $window) {
		
		$scope.createBookCommit=function()
		{
			
			BOOKMGMTService.postService({ key: 'createBook', username: $scope.usrname, sessionid: $scope.sessionid, bookname : $scope.crbookname, authors : $scope.crauthorarr, genres : $scope.crgenrearr }).
						success(function(data, status) {
							if (data!='error')
								{
									if(data=="Success")
									{
										$scope.init();
										alert("Book created successfully!");
									}
									else
									{
										alert("Failed!");
									}
							}
						}).
						error(function(data, status) {
							console.log("error");
					});
		}
		
		$scope.clrModVars=function()
		{
			$scope.modauthorlist=[];
			$scope.modgenrelist=[];
		}
		
		$scope.valCreFields=function()
		{
			
			if($scope.crbookname.length>0&&$scope.crauthorarr.length>0&&$scope.crgenrearr.length>0)
			{
				$scope.fillcreateform=0;
			}
			else
			{
				$scope.fillcreateform=1;
			}
			
		}
		
		$scope.addAuthorToForm=function()
		{
			
			$('#selauthorbox').select2({
				tags:true,
				data:$scope.modauthorlist
			});
			
		};
		
		$scope.addGenreToForm=function()
		{
			
			$('#selgenrebox').select2({
				tags:true,
				data:$scope.modgenrelist
			});
			
		};
		
		$scope.formatAuthorData=function()
		{
			$scope.modauthorlist=[];
			$scope.authorlist.forEach(function(author)
			{
				
				var tid=author.authorid;
				var tname=author.authorname;
				
				$scope.modauthorlist.push({id: tid, text: tname});
				
			});
			
			$scope.addAuthorToForm();
		}
		
		$scope.formatGenreData=function()
		{
			$scope.modgenrelist=[];
			$scope.genrelist.forEach(function(genre)
			{
				
				var tid=genre.genreid;
				var tname=genre.genre;
				
				$scope.modgenrelist.push({id: tid, text: tname});
				
			});
			
			$scope.addGenreToForm();
		}
	
		$scope.popAuthors=function()
		{
			
			BOOKMGMTService.postService({ key: 'listAuthors', username: $scope.usrname, sessionid: $scope.sessionid }).
						success(function(data, status) {
							if (data!='error')
								{
									$scope.authorlist = data.listAuthorsOutput;
									
									$scope.formatAuthorData();
							}
						}).
						error(function(data, status) {
							console.log("error");
					});
		}
	
		$scope.popGenres=function()
		{
			
			BOOKMGMTService.postService({ key: 'listGenres', username: $scope.usrname, sessionid: $scope.sessionid }).
						success(function(data, status) {
							if (data!='error')
								{
									$scope.genrelist = data.listGenresOutput;
									
									$scope.formatGenreData();
							}
						}).
						error(function(data, status) {
							console.log("error");
					});
		}
		
		$scope.initCrVars=function()
		{
			$scope.fillcreateform=1;
			$scope.crbookname="";
			$scope.crauthorarr=[];
			$scope.crgenrearr=[];
		}

		$scope.init=function()
		{
			
			$scope.initCrVars();
			
			$scope.popAuthors();
			$scope.popGenres();
			
			$scope.unsetLoadScreen();
			
		}
		
		$scope.init();

    }]);

})();