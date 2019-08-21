(function () {
    'use strict';
    var app = angular.module('bookmgmtApp');
    app.controller('errorCtrl', ['$scope', '$rootScope', '$http', '$q', '$location', '$window', '$routeParams', '$filter', '$interval', 'BOOKMGMTService', function ($scope, $rootScope, $http, $q, $location, $window, $routeParams, $filter, $interval, BOOKMGMTService) {
            

        $scope.init=function()
        {
            var host = $location.host();
            $window.location.href = 'http://' + host + ':5000/';
        }

        $scope.init();

    }]);

})();