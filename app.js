'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
  'ngRoute',
  'moviecat.movie_detail',
  'moviecat.movie_list',

  'moviecat.directives.auto_fouse',
])
.constant('AppConfig', {
  pageSize: 6,
  listApiAddress:'https://api.douban.com/v2/movie/',
  deatilApiAddress:'https://api.douban.com/v2/movie/subject/',

})

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/in_theaters/1'
    });
  }])
.controller('SearchController', [
  '$scope',
  '$route', 
  // 'AppConfig',
  function($scope,$route,AppConfig){
    // console.log(AppConfig);
  $scope.input= '';
  $scope.search = function() {
    $route.updateParams({category:'search',q:$scope.input});
  }

}])
  // .controller('NavController', [
  //   '$scope',
  //   '$location',
  //   function($scope, $location) {
  //     $scope.$location = $location;
  //     console.log($location.path());
  //     $scope.$watch('$location.path()', function(now) {
  //       if (now.startsWith('/in_theaters')) {
  //         $scope.type = 'in_theaters';
  //       } else if (now.startsWith('/coming_soon')) {
  //         $scope.type = 'coming_soon';
  //       } else if (now.startsWith('/top250')) {
  //         $scope.type = 'top250';
  //       }
  //     });
  //   }
  // ])
  ;