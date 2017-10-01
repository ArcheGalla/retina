angular
  .module("app")
  .directive("session", [function () {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "app/session/session.html",
      link: function ($scope, element) {
        element.bind("click", function (event) {
          event.stopPropagation();
          event.preventDefault();
          var $anchor = $(this);
          $('html, body')
            .stop()
            .animate({
              scrollTop: $($anchor.attr('href'))
                .offset()
                .top()
            }, 1500, 'easeInOutExpo');
        });
      }
    };
  }]);
