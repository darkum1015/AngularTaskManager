"use strict";
(function () {
    var appModule = angular.module('app.module');

    appModule.controller('CreateUserController',CreateUserController);
    CreateUserController.$inject = ['UtilityService','$http'];

    function CreateUserController(UtilityService,$http){
        var vm = this;
        vm.newUser = null;
        vm.userObj ={};
        vm.userObj.displayName="";
        vm.userObj.name="";
        vm.userObj.password="";
        vm.userObj.admin=false;
        vm.createUser = createUser;

        class User{
            constructor(userObj){
                this.displayName = userObj.displayName;
                this.name = userObj.name;
                this.password = userObj.password;
                this.admin = userObj.admin;
            }
        }

        function createUser(){
            vm.newUser = new User(vm.userObj)

            $http({
                url: "http://localhost:8300/api/users",
                method:"PUT",
                hearders:{
                    "content-type":"application/json"
                },
                data:{
                    "displayName":vm.newUser.displayName,
                    "name":vm.newUser.name,
                    "password":vm.newUser.password,
                    "admin":vm.newUser.admin

                }

            }).then(function success(response){

            },function failure(error){

            });
        }
    }

})();