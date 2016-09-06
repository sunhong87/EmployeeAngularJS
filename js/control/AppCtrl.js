var mainApp = angular.module("main_app", ['ngRoute']);

mainApp.controller('app_ctrl', ['$scope', '$route', '$location', 'EmployeeService', function app_ctrl($scope, $route, $location, EmployeeService) {

	$scope.$on( "$routeChangeSuccess", function(event) {
		$scope.curTitle = $route.current.action;
	});

	$scope.$on( "$locationChangeStart", function(event, next) {
		if(EmployeeService.isExecuted) {
			if(!confirm("Current view has been changed. Do you want to exit?")) {
				event.preventDefault();
			} else {
				EmployeeService.isExecuted = false;
			}
		}
	});
}])
	
mainApp.config(function($routeProvider) {
    $routeProvider
    .when("/index", {
        templateUrl : "index.html",
		controller : "emp_ctrl",
		action: "Home"
    })
    .when("/employee", {
        templateUrl : "employee.html",
		controller : "emp_ctrl",
		action: "Employee",
		EmployeeService : "EmployeeService"
    })
	.otherwise("/index", {
        templateUrl : "index.html",
		controller : "emp_ctrl",
		action: "Home"
    });
});