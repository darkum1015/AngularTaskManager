"use strict";
(function() {
  var appModule = angular.module("app.module", ["ngRoute", "ui.bootstrap"]);
  appModule.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: "app/js/modules/home/home.html",
      controller: "HomeController as homeCtrl"
    }).when('/login', {
      templateUrl: "app/js/modules/login/login.html",
      controller: "LoginController as loginCtrl"
    }).otherwise({
      templateUrl: "app/js/modules/home/home.html",
      controller: "HomeController as homeCtrl"
    });
  }]);
  appModule.run(RunApp);
  RunApp.$inject = [];
  function RunApp() {
    console.log("Welcome to the Serviceconsume");
  }
})();
//# sourceMappingURL=app.js.map
