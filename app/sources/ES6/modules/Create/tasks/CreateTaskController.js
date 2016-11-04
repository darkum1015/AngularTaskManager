(function () {

    var appModule = angular.module('app.module');

    appModule.controller('CreateTaskController',CreateTaskController);
    CreateTaskController.$inject = ['$http','$q','$location'];

    function CreateTaskController($http,$q,$location){
        var vm = this;


    }

})();