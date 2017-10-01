(function(){

angular
  .module("app")
  .directive("registration", [ "$http",
    function ($http) {
      return {
        restrict: "E",
        templateUrl: "app/registration/registration.html",
        link: function ($scope, element, attrs) {
          $scope.btnText = "SUBMIT_BTN";


          function setFormDefault() {
            $scope.form = {
              name: "",
              sname: "",
              email: "",
              phone: undefined,
              message: "",
              intern: "NO",
              city: ""
            };
          }

          $scope.isActive = function () { return $scope.form === 'yes'; };

          $scope.submit = function (form, isValid) {
            if (isValid) {
              $http
                .post("/register", {
                  name: form.name,
                  sname: form.sname,
                  email: form.email,
                  phone: form.phone,
                  message: form.message,
                  intern: form.intern,
                  city: form.city
                })
                .then(function (response) {
                  if (response.status === 200) { setFormDefault(); $scope.btnText = "SUBMIT_BTN_SUCCESS"; }
                })
                .catch(function (err) { $log.error(err) });

            } // end if valid

          }
        }
      }
    }]);
}());
