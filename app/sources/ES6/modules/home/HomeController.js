(function () {
    var appModule = angular.module('app.module');

    appModule.controller('HomeController',HomeController);
    HomeController.$inject =['$http','UtilityService'];

    function HomeController($http,UtilityService) {
        var vm = this;
        vm.taskList = [];
        vm.deleteTask = deleteTask;
        vm.editTask = editTask;
        vm.showCreateTask = showCreateTask;

        //not hosisted as not needed to be exposed to template
        getAllTasks();

        function getAllTasks(){


            $http({
               "url": "http://localhost:8300/api/tasks",
                "method": 'GET'

            }).then(function success(response){
                vm.taskList = response.data.rows;

            },function failure(error){

            });
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

                    removeTableRows(taskId);
                },function failure(error) {
                    alert("failed");
                });
            }else{
                UtilityService.navigateTo('/login');
            }

        }

        function removeTableRows(itemId){
            for(var item in vm.taskList){
                if(vm.taskList[item]._id == itemId){
                    vm.taskList.splice(item,1);
                }
            }
        }
    }

})();
