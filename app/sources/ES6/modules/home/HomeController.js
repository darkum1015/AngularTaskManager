(function () {
    var appModule = angular.module('app.module');

    appModule.controller('HomeController',HomeController);
    HomeController.$inject =['$http','UtilityService'];

    function HomeController($http,UtilityService) {
        var vm = this;
        vm.taskList = [];
        vm.userList =[];
        vm.deleteTask = deleteTask;
        vm.editTask = editTask;
        vm.showCreateTask = showCreateTask;

        UtilityService.getAllUsers().then(function success(userList){
            vm.userList = userList;
        },function failure(error) {
            alert("error");
        });
        //not hosisted as not needed to be exposed to template
        getAllTasks();

        function getAllTasks(){


            $http({
               "url": "http://localhost:8300/api/tasks",
                "method": 'GET'

            }).then(function success(response){
                /*vm.taskList = response.data.rows;*/
                vm.taskList = normaliseTaskList(response.data.rows);
            },function failure(error){
                alert("error");
            });
        }

        function normaliseTaskList(taskList) {
            for(var task in taskList){
                if(taskList[task].assignedTo){
                    taskList[task].resolvedUser = UtilityService.resolveUsernameFromId(taskList[task].assignedTo,vm.userList);
                }
            }
            return taskList;
        }

        function showCreateTask() {
            if(UtilityService.isAuthorized()){
                UtilityService.navigateTo('/create/task');
            }else{
                UtilityService.navigateTo('/login');
            }

        }

        function editTask(taskId){
            if(UtilityService.isAuthorized()){
               UtilityService.navigateTo('/edit/task/'+taskId);
            }else{
                UtilityService.navigateTo('/login');
            }
        }

        function deleteTask(taskId) {

            if(UtilityService.isAuthorized()){
                var taskId= taskId;
                $http({
                    url: "http://localhost:8300/api/tasks/"+taskId,
                    method:"DELETE"

                }).then(function success(response){

                    UtilityService.removeTableRows(taskId,vm.taskList);
                },function failure(error) {
                    alert(error.data.message);
                });
            }else{
                UtilityService.navigateTo('/login');
            }

        }


    }

})();
