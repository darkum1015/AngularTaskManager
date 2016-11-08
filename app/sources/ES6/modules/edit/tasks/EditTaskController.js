(function () {
    var appModule = angular.module('app.module');

    appModule.controller('EditTaskController',EditTaskController);
    EditTaskController.$inject = ['$http','UtilityService','$routeParams'];
    function EditTaskController($http,UtilityService,$routeParams) {
        var vm = this;
        vm.taskId = "";
        vm.taskObj = [];

        vm.authToken=null;
        vm.saveTask = saveTask;

        if(UtilityService.isAuthorized()){
            vm.authToken = localStorage.getItem('authToken');
            getTaskById();

        }else{
            UtilityService.navigateTo('/login');
        }

        function getTaskById(){
            if($routeParams.id){
                vm.taskId = $routeParams.id;
            }

            $http({
                url: "http://localhost:8300/api/tasks/"+vm.taskId,
                method: "GET",
                headers: {
                    "x-access-token": vm.authToken,
                    "Content-Type": "application/json"
                }
            }).then(function success(response){
                if(response.data.success){
                    vm.taskObj = response.data.rows;
                }else{
                    alert("Token expired");
                    UtilityService.navigateTo('/login');
                }

            },function failure(error){
                alert("failed");
            });
        }

        function saveTask(){
            if(UtilityService.isAuthorized()){
                if(vm.taskObj){
                    $http({
                        url: "http://localhost:8300/api/tasks/"+vm.taskId,
                        method: "PUT",
                        headers: {
                            "x-access-token": vm.authToken,
                            "Content-Type": "application/json"
                        },
                        data: [{"duration": vm.taskObj.duration,"startDate": vm.taskObj.startDate,"assignedTo": vm.taskObj.assignedTo,"createdBy": "Darshan","created": "7thNov", "project":  vm.taskObj.project, "priority": vm.taskObj.priority,"state":vm.taskObj.state,"description": vm.taskObj.description,"name": vm.taskObj.name}]

                    }).then(function success(response){
                        if(response.data.success){
                            UtilityService.navigateTo('/home');
                        }else{
                           alert("Token expired");
                            UtilityService.navigateTo('/login');
                        }
                    },function failure(error) {
                        alert("failure");
                    });
                }

            }else{
                UtilityService.navigateTo('/login');
            }
        }

    }
})();