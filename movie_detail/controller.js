(function(angular) {
  'use strict';
  var module = angular.module('moviecat.movie_detail', [
    'ngRoute',
    'moviecat.service.http'
  ]);

  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/detail/:id/:city?', {
      templateUrl: 'movie_detail/view.html',
      controller: 'movieDetailController'
    });
  }])

  .controller('movieDetailController', [
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',
    'AppConfig',
    function($scope, $route, $routeParams, HttpService, AppConfig) {
      $scope.movie = {};
      $scope.movie.title = "loading...";
      var id = $routeParams.id;
      $scope.loading = true;
      HttpService.jsonp(
        AppConfig.deatilApiAddress + id,
        function(data) {
          $scope.movie = data;
          $scope.loading = false;
          $scope.$apply();
        });



    }
  ]);

})(angular);