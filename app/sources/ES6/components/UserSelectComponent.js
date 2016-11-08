(function () {
    var appModule = angular.module('app.module');
    UserSelectComponentController.$inject =['UtilityService'];
    function UserSelectComponentController(UtilityService){
        var vm = this;
        vm.userList =[];


        UtilityService.getAllUsers().then(function success(userList){
            vm.userList = userList;
        },function failure(error) {
            alert("error");
        });


    }
    appModule.component('userSelect',{
        bindings:{
            model:'='

        },
        templateUrl: 'app/js/components/user-select-component.html',
        controller: UserSelectComponentController

    })
})();