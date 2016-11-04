"use strict";
(function() {
  var appModule = angular.module('app.module');
  appModule.controller('LoginController', LoginController);
  LoginController.$inject = ['$http', '$q', '$location'];
  function LoginController($http, $q, $location) {
    var vm = this;
    vm.loginFailed = false;
    vm.loginFailureMessage = "";
    vm.authData = {};
    vm.authData.name = "";
    vm.authData.password = "";
    vm.initLogin = initLogin;
    function initLogin() {
      if (vm.authData.name && vm.authData.password) {
        authenticate().then(function(response) {
          var data = response.data;
          if (data.success) {
            localStorage.setItem('authToken', data.token);
            vm.loginFailed = false;
            $location.path('/home');
          } else {
            vm.loginFailed = true;
            vm.loginFailureMessage = data.message;
          }
        }, function(error) {
          vm.loginFailed = true;
          vm.loginFailureMessage = error.message;
        });
      } else {
        alert("Insufficient data to check");
      }
    }
    function authenticate() {
      var deferred = $q.defer();
      $http({
        "url": "http://localhost:8300/api/authenticate",
        "method": "POST",
        "headers": {"content-type": "application/x-www-form-urlencoded"},
        "data": "name=" + vm.authData.name + "&password=" + vm.authData.password
      }).then(function success(response) {
        deferred.resolve(response);
      }, function failure(error) {
        deferred.reject("Failed");
      });
      return deferred.promise;
    }
  }
})();
//# sourceMappingURL=LoginController.js.map
