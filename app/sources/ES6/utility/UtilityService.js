(function () {
    var appModule = angular.module('app.module');

    appModule.service('UtilityService', UtilityService);
    UtilityService.$inject = ['$location', '$q', '$http'];
    function UtilityService($location, $q, $http) {

        this.navigateTo = function (path) {
            if (path) {
                $location.path(path);
            }
        }

        this.isAuthorized = function () {
            var authToken = localStorage.getItem('authToken');

            if (!authToken) {
                //this.navigateTo('/login');
                return false;
            }
            return true;
        }

        this.removeTableRows = function (itemId, itemList) {
            for (var item in itemList) {
                if (itemList[item]._id == itemId) {
                    itemList.splice(item, 1);
                }
            }
        }

        this.resolveUsernameFromId = function (uniqueId, userList) {
            for (var user in userList) {
                if (userList[user]._id == uniqueId) {
                    return userList[user].name;
                }
            }
        }

        this.getAllUsers = function () {
            var deferred = $q.defer();
            var userList = [];
            $http({
                url: "http://localhost:8300/api/users",
                method: "GET"
            }).then(function success(response) {
                userList = response.data;
                deferred.resolve(userList);
            }, function failure(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        this.getAllProjects = function(){
            var deferred = $q.defer();
            var projectList =[];
            $http({
                url:"http://localhost:8300/api/projects",
                method:"GET"
            }).then(function success(response) {
               projectList = response.data;
                deferred.resolve(projectList);

            },function failure(error){
                deferred.reject(error);
            });

            return deferred.promise;
        }

    }
})();
