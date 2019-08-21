(function () {
    'use strict';
    var app = angular.module('bookmgmtApp');
    app.controller('listCtrl', ['$scope', '$rootScope', '$http', '$q', 'BOOKMGMTService', '$location', '$window', function ($scope, $rootScope, $http, $q, BOOKMGMTService, $location, $window) {
		
		$scope.clrModVars=function()
		{
			$scope.modauthorlist=[];
			$scope.modgenrelist=[];
		}
		
		$scope.valListFields=function()
		{
			
			if($scope.listbookname.length>0&&($scope.listbookname!=$scope.lastbook))
			{
				$scope.popBookDetails();
				$scope.lastbook=$scope.listbookname;
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
		
		$scope.addBookToForm=function()
		{
			
			$('#selbookbox').select2({
				data:$scope.modbooklist
			});
			
		}
		
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
		
		$scope.formatBookData=function()
		{
			$scope.modbooklist=[];
			$scope.booklist.forEach(function(book)
			{
				
				var tid=book.bookid;
				var tname=book.bookname;
				
				$scope.modbooklist.push({id: tid, text: tname});
				
			});
			
			$scope.addBookToForm();
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
		
		$scope.popBooks=function()
		{
			
			BOOKMGMTService.postService({ key: 'listBooks', username: $scope.usrname, sessionid: $scope.sessionid }).
						success(function(data, status) {
							if (data!='error')
								{
									$scope.booklist = data.listBooksOutput;
									
									$scope.formatBookData();
							}
						}).
						error(function(data, status) {
							console.log("error");
					});
		}
		
		$scope.popBookDetails=function()
		{
			
			BOOKMGMTService.postService({ key: 'listBookDetails', username: $scope.usrname, sessionid: $scope.sessionid, bookid: $scope.listbookname }).
						success(function(data, status) {
							if (data!='error')
								{
									$scope.bookdetails = data.listBookDetailsOutput;
									
									$scope.popBookDetailsData();
							}
						}).
						error(function(data, status) {
							console.log("error");
					});
		}
		
		$scope.popBookDetailsData=function()
		{
			
			var tempauthorarr=[];
			var tempgenrearr=[];
			
			$scope.bookdetails.forEach(function(bookpart)
			{
				//$scope.listauthorarr.push(bookpart.authorname);
				if(tempauthorarr.indexOf(bookpart.authorid) == -1)
				{
					tempauthorarr.push(bookpart.authorid);
				}
				if(tempgenrearr.indexOf(bookpart.genreid) == -1)
				{
					tempgenrearr.push(bookpart.genreid);
				}
			});
			
			$('#selauthorbox').val(tempauthorarr);
			setTimeout(function () { $('#selauthorbox').trigger('change'); } , 50 );
			
			$('#selgenrebox').val(tempgenrearr);
			setTimeout(function () { $('#selgenrebox').trigger('change'); } , 50 );
			
		}
		
		$scope.initListVars=function()
		{
			$scope.listbookname="";
			$scope.listauthorarr=[];
			$scope.listgenrearr=[];
		}

		$scope.init=function()
		{
			
			$scope.initListVars();
			
			$scope.popAuthors();
			$scope.popGenres();
			$scope.popBooks();
			
			$scope.unsetLoadScreen();
			
		}
		
		$scope.init();

    }]);

})();