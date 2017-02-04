(function(angular) {
  'use strict';
  angular.module('moviecat.directives.auto_fouse', [])
    .directive('autoFouse', ['$location', function($location) {
      // var path = $location.path();
      return {
        link: function($scope, iElm, iAttrs, controller) {
          $scope.$location = $location;
          $scope.$watch('$location.path()', function(now) {
            var alink = iElm.children().attr('href');
            var type = alink.replace(/#(\/.+?)\/\d+/, '$1');
            // console.log(now);
            if (now.startsWith(type)) {
              iElm.parent().children().removeClass('active');
              iElm.addClass('active');
            };
          });
          // iElm.on('click', function() {
          //   iElm.parent().children().removeClass('active');
          //   iElm.addClass('active');
          // });
        }
      }

    }]);
})(angular);