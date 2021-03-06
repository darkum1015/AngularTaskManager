(function () {
    var appModule =angular.module("app.module", ["ngRoute", "ui.bootstrap"]);

    appModule.config(["$routeProvider", function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: "app/js/modules/home/home.html",
            controller: "HomeController as homeCtrl"
        }).when('/login', {
            templateUrl: "app/js/modules/login/login.html",
            controller: "LoginController as loginCtrl"
        }).when('/create/task',{
            templateUrl: "app/js/modules/Create/tasks/create-task.html",
            controller: "CreateTaskController as createTaskCtrl"
        }).when('/edit/task/:id',{
            templateUrl: "app/js/modules/edit/tasks/edit-task.html",
            controller: "EditTaskController as editTaskCtrl"
        }).when('/create/user',{
            templateUrl: "app/js/modules/Create/users/create-user.html",
            controller: "CreateUserController as createUserCtrl"
        }).when('/create/project',{
            templateUrl: "app/js/modules/create/projects/create-project.html",
            controller: "CreateProjectController as createProjectCtrl"
        })
            .otherwise({
                templateUrl: "app/js/modules/home/home.html",
                controller: "HomeController as homeCtrl"
            });
    }]);
    appModule.run(RunApp);
    RunApp.$inject = [];
    function RunApp(){
        console.log("Welcome to the Serviceconsume");

    }

})();