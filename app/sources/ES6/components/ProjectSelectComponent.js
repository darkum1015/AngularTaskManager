(function () {
    var appModule = angular.module('app.module');
    ProjectSelectComponentController.$inject =['UtilityService'];
    function ProjectSelectComponentController(UtilityService){
        var vm = this;
        vm.projectList =[];


        UtilityService.getAllProjects().then(function success(projectList){
            vm.projectList = projectList;
        },function failure(error) {
            alert("error");
        });

        function parseProjecList(projList){
            for(var project in projList){
                
            }
        }
    }
    appModule.component('projectSelect',{
        bindings:{
            model:'='

        },
        templateUrl: 'app/js/components/project-select-component.html',
        controller: ProjectSelectComponentController

    })
})();