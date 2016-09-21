var tidy = angular.module('tidy', ['ngRoute', 'customerControllers']);

tidy.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "_list.html",
        controller 	: "ListCustomerController"
    })
    .when("/customer/:id?", {
        templateUrl : "_customer.html",
        controller 	: "AddCustomerController"
    })
    .otherwise({
    	redirectTo : "/"
    });
}]);