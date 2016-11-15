(function () {
    var appModule = angular.module('app.module');

    appModule.controller('CreateProjectController',CreateProjectController);
    CreateProjectController.$inject = ['UtilityService','$http'];

    function CreateProjectController(UtilityService,$http) {
        var vm = this;
        vm.newProjectObj = {
            "name":"",
            "duration":"",
            "tasks": [0]
        };

        vm.createProject = createProject;

        function createProject(){
           /* if(vm.authToken){
                if(vm.taskObj){
*/
                    $http({
                        url: "http://localhost:8300/api/projects",
                        method: "POST",
                        headers: {
                           /* "x-access-token": vm.authToken,*/
                            "Content-Type": "application/json"
                        },
                        data: vm.newProjectObj

                    }).then(function success(response){
                        if(response.data.success){
                            UtilityService.navigateTo('/home');
                        }else{
                            alert("Token expired");
                            UtilityService.navigateTo('/login');
                        }

                    },function failure(error){
                        alert(error.message);
                    });

               /* }else{
                    alert("Insufficient data!");
                }
            }else{
                UtilityService.navigateTo('/login');
            }*/

        }
    }

})();
