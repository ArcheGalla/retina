angular.module("app").directive("schedule", [function () {
  return {
    restrict: "E",
    templateUrl: "app/schedule/schedule.html",
    link: function ($scope, element, attrs) {
      $scope.schedule = [
        {
          icon: "fa-pencil-square-o",
          text: "SCHEDULE_1",
          time: "9:00"
        },
        {
          icon: "fa-university",
          text: "SCHEDULE_2",
          time: "9:45"
        },
        {
          icon: "fa-microphone",
          text: "SCHEDULE_3",
          time: "10:00 - 11:30"
        },
        {
          icon: "fa-coffee",
          text: "SCHEDULE_4",
          time: "11:30 - 12:00"
        }
        ,
        {
          icon: "fa-microphone",
          text: "SCHEDULE_5",
          time: "12:00 - 13:45"
        }
        ,
        {
          icon: "fa-cutlery",
          text: "SCHEDULE_6",
          time: "13:45 - 14:45"
        }
        ,
        {
          icon: "fa-microphone",
          text: "SCHEDULE_7",
          time: "14:45 - 15:15"
        }
        ,
        {
          icon: "fa-microphone",
          text: "SCHEDULE_8",
          time: "15:30 - 17:00"
        }
        ,
        {
          icon: "fa-coffee",
          text: "SCHEDULE_9",
          time: "17:00 - 17:30"
        }
        ,
        {
          icon: "fa-microphone",
          text: "SCHEDULE_10",
          time: "17:30-19:00 "
        }
        ,
        {
          icon: "fa-university",
          text: "SCHEDULE_11",
          time: "19:00-19:15"
        }
        ,
        {
          icon: "fa-glass",
          text: "SCHEDULE_12",
          time: "20:30"
        }
      ];
    }
  }
}]);
