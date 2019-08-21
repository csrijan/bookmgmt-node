(function () {
    'use strict';
    var app = angular.module('bookmgmtApp');
    app.controller('deleteCtrl', ['$scope', '$rootScope', '$http', '$q', 'BOOKMGMTService', '$location', '$window', function ($scope, $rootScope, $http, $q, BOOKMGMTService, $location, $window) {
		
		$scope.deleteBookCommit=function()
		{
			var decs=confirm("Are you sure you want to delete?");
			if(!decs)
			{
				return;
			}
			BOOKMGMTService.postService({ key: 'deleteBook', username: $scope.usrname, sessionid: $scope.sessionid, bookid : $scope.delbookname }).
						success(function(data, status) {
							if (data!='error')
								{
									if(data=="Success")
									{
										alert("Book deleted successfully!");
										$scope.initDelete();
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
		
		$scope.valDelFields=function()
		{
			
			if($scope.delbookname.length>0&&($scope.delbookname!=$scope.lastbook))
			{
				$scope.popBookDetails();
				$scope.lastbook=$scope.delbookname;
			}
			
			if($scope.delbookname.length>0)
			{
				$scope.filldeleteform=0;
			}
			else
			{
				$scope.filldeleteform=1;
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
			
			BOOKMGMTService.postService({ key: 'listBookDetails', username: $scope.usrname, sessionid: $scope.sessionid, bookid: $scope.delbookname }).
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
				//$scope.delauthorarr.push(bookpart.authorname);
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
		
		$scope.initDelVars=function()
		{
			$scope.filldeleteform=1;
			$scope.delbookname="";
			$scope.delauthorarr=[];
			$scope.delgenrearr=[];
		}

		$scope.init=function()
		{
			
			$scope.initDelVars();
			
			$scope.popAuthors();
			$scope.popGenres();
			$scope.popBooks();
			
			$scope.unsetLoadScreen();
			
		}
		
		$scope.init();

    }]);

})();