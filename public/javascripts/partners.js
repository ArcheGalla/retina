angular
  .module("app")
  .directive("partners", [function () {
    return {
      restrict: "E",
      templateUrl: "app/partners/partners.html"
    }
  }])
  .directive('partnerScroll', function () {
    return function (scope, element) {
      $(element).carouFredSel({
        items: 4,
        width: '100%',
        height: 375,
        direction: "left",
        transition: true,
        scroll: {
          items: 2,
          easing: "elastic",
          duration: 500,
          pauseOnHover: false
        }
      });
    }
  });
