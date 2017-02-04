(function(angular) {
  'use strict';
  var module = angular.module('moviecat.movie_list', [
    'ngRoute',
    'moviecat.service.http'
  ]);

  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:category/:page', {
      templateUrl: 'movie_list/view.html',
      controller: 'movieListController'
    });
  }])

  .controller('movieListController', [
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',
    'AppConfig',
    function($scope, $route, $routeParams, HttpService, AppConfig) {
      var count = AppConfig.pageSize;
      var page = parseInt($routeParams.page);
      var start = (page - 1) * count;
      $scope.loading = true;
      $scope.subjects = [];
      $scope.message = "";
      $scope.totalCount = 0;
      $scope.totalPages = 0;
      $scope.currentPage = page;
      $scope.title = 'loading...';

      HttpService.jsonp(
        AppConfig.listApiAddress + $routeParams.category, {
          start: start,
          count: count,
          q: $routeParams.q,
          city: '郑州',
        },
        function(data) {
          $scope.subjects = data.subjects;
          $scope.totalCount = data.total;
          $scope.title = data.title;
          $scope.totalPages = Math.ceil($scope.totalCount / count);
          $scope.loading = false;

          $scope.$apply('subjects');
          // $scope.totalCount = data.total;以上数据只能放在apply上面

        });

      $scope.go = function(page) {
        if (page >= 1 && page <= $scope.totalPages) {
          $route.updateParams({
            page: page
          });
        }

      }



      // var doubanApiAddress = 'https://api.douban.com/v2/movie/in_theaters';
      // $http.jsonp(doubanApiAddress+'?callback=JSON_CALLBACK').then(function(res) {
      // 	if (res.status == 200) {
      // 		$scope.subjects = res.data.subjects;
      // 	}else {
      // 		$scope.message = '获取数据错误1';
      // 	}				
      // },function(err) {
      // 	$scope.message = '获取数据错误2'+ err.status;
      // });
    }
  ]);

})(angular);