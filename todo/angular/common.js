window.App = {}

/*
 *  Create volunteer app common module
 */
App.common = angular.module("common", []);

App.services = angular.module("services", []);

/**
 * Create module that will contain services
 */
App.restServices = angular.module("restServices", []);

/**
 * Create module that contains mock services
 */
App.mockServices = angular.module("mockServices", []);


// define application module
App.app = angular.module("app", ["mockServices", "restServices", "services", "common"]);