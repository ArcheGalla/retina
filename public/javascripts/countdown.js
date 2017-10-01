angular.module("app").directive("countdown", function () {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "app/countdown/countdown.html",
    link: function ($scope, element, attrs) {

      var end = Math.floor((new Date("04/02/2016")).getTime() / 1000);
      var start = Math.floor((new Date("9/04/2015")).getTime() / 1000);
      var now = Math.floor((new Date).getTime() / 1000);

      $(".countdown").final_countdown({
        'start': start,
        'end': end,
        'now': now
      }, function () {
        console.log("finish call back");
      });
    }
  }
});
