(function () {
    //'use strict';
    var app= angular.module('bookmgmtApp');
    app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
        //$locationProvider.html5Mode(true);        
        $routeProvider.
          when('/login', {
	    templateUrl: 'Routes?pg=login',
	    controller: 'loginCtrl'
          }).
		  when('/signup', {
	    templateUrl: 'Routes?pg=signup',
	    controller: 'signupCtrl'
          }).
          when('/mainmenu', {
	    templateUrl: 'Routes?pg=mainmenu',
	    controller: 'mainmenuCtrl'
          }).
          when('/create', {
	    templateUrl: 'Routes?pg=create',
	    controller: 'createCtrl'
          }).
          when('/list', {
	    templateUrl: 'Routes?pg=list',
	    controller: 'listCtrl'
          }).
         when('/delete', {
             templateUrl: 'Routes?pg=delete',
             controller: 'deleteCtrl'
         }).
         when('/edit', {
             templateUrl: 'Routes?pg=edit',
             controller: 'editCtrl'
         }).
         when('/error', {
	        templateUrl: 'Routes?pg=error',
	        controller: 'errorCtrl'
          }).
          otherwise({
	    redirectTo: '/'
          });
          
    }]);

})();

