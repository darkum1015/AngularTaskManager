"use strict";
(function() {
  var appModule = angular.module('app.module');
  appModule.controller('HomeController', HomeController);
  HomeController.$inject = ['$http'];
  function HomeController($http) {
    var vm = this;
    vm.taskList = [];
    getAllTasks();
    function getAllTasks() {
      $http({
        "url": "http://localhost:8300/api/tasks",
        "method": 'GET'
      }).then(function success(response) {
        vm.taskList = response.data.rows;
      }, function failure(error) {});
    }
  }
})();
//# sourceMappingURL=HomeController.js.map
