angular.module("app").directive("roadMap", ["$window", "$translate", "$location",
  function ($window, $translate, $location) {
    return {
      restrict: "E",
      templateUrl: "app/roadmap/roadmap.html",
      link: function ($scope, element, attrs) {
        $scope.mailForNewTheme = 'inovytskyy@gmail.com';
        $scope.downloadPromo = function () {
          if ($translate.use() === "en") {
            $window.open($location.$$absUrl + "assets/pdf/RETINA-LVIV-2016_eng.pdf", "_blank");
          } else {
            $window.open($location.$$absUrl + "assets/pdf/RETINA-LVIV-2016.pdf", "_blank");
          }
        }
      }
    }
  }]);