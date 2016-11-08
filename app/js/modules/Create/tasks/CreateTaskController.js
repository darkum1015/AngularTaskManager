"use strict";
(function() {
  var appModule = angular.module('app.module');
  appModule.controller('CreateTaskController', CreateTaskController);
  CreateTaskController.$inject = ['$http', '$q', 'UtilityService'];
  function CreateTaskController($http, $q, UtilityService) {
    var vm = this;
    vm.taskObj = [];
    vm.taskObj.name = "";
    vm.taskObj.description = "";
    vm.taskObj.state = "";
    vm.taskObj.priority = "";
    vm.taskObj.project = "";
    vm.taskObj.created = "";
    vm.taskObj.createdBy = "";
    vm.taskObj.assignedTo = "";
    vm.taskObj.startDate = "";
    vm.taskObj.duration = "";
    vm.createTask = createTask;
    vm.authToken = localStorage.getItem('authToken');
    function createTask() {
      if (vm.authToken) {
        if (vm.taskObj) {
          $http({
            url: "http://localhost:8300/api/tasks",
            method: "POST",
            headers: {
              "x-access-token": vm.authToken,
              "Content-Type": "application/json"
            },
            data: [{
              "duration": vm.taskObj.duration,
              "startDate": vm.taskObj.startDate,
              "assignedTo": vm.taskObj.assignedTo,
              "createdBy": "Darshan",
              "created": "7thNov",
              "project": vm.taskObj.project,
              "priority": vm.taskObj.priority,
              "state": vm.taskObj.state,
              "description": vm.taskObj.description,
              "name": vm.taskObj.name
            }]
          }).then(function success(response) {
            if (response.data.success) {
              UtilityService.navigateTo('/home');
            } else {
              alert("Token expired");
              UtilityService.navigateTo('/login');
            }
          }, function failure(error) {
            alert(error.message);
          });
        } else {
          alert("Insufficient data!");
        }
      } else {
        UtilityService.navigateTo('/login');
      }
    }
  }
})();
//# sourceMappingURL=CreateTaskController.js.map
