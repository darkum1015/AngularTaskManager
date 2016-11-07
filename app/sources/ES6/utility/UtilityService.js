(function () {
    var appModule = angular.module('app.module');

    appModule.service('UtilityService',UtilityService);
    UtilityService.$inject = ['$location'];
    function UtilityService($location){

            this.navigateTo = function(path){
                if(path){
                    $location.path(path);
                }
            }

            this.isAuthorized = function(){
                var authToken = localStorage.getItem('authToken');

                if(!authToken){
                    //this.navigateTo('/login');
                    return false;
                }
                return true;
            }



    }
})();
