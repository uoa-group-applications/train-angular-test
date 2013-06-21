App.template = function(templateName, full) {
    return window.template("/", templateName, "app", full);
};


/**
 * Initialize application
 */
App.app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when("/", {
            templateUrl : "angular/views/index.html",
            controller: App.TaskController
        })
        .otherwise({redirectTo : "/"});

}]);


