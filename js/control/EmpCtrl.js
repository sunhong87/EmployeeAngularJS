var mainApp = angular.module("main_app");

mainApp.controller('emp_ctrl', ['$scope', '$route', '$injector', function emp_ctrl($scope, $route, $injector, $routeParams) {
	
	EmployeeService = $injector.get("EmployeeService");
	
	
	
	$scope.maxSize = ($scope.inputEmpID != null ? 1 : 50);
	$scope.is_doing_something1 = false;
	$scope.is_doing_something2 = false;
	$scope.tempDetails = {};
	
	$scope.$on( "$routeChangeSuccess", function(event) {
		$scope.curTitle = $route.current.action;
	});	
	
	$scope.paginate = function (flag) {
		$scope.is_doing_something1 = true;
		if(flag === "next") {
			$scope.currentPage = $scope.currentPage + $scope.maxSize;
			$scope.currentSize = ($scope.currentSize + $scope.maxSize > $scope.data_size ? $scope.data_size : $scope.currentSize + $scope.maxSize);
		} else {
			$scope.currentPage = $scope.currentPage - $scope.maxSize;
			$scope.currentSize = $scope.currentSize - $scope.maxSize;
		}
		
		EmployeeService.doQueryList({input_emp: $scope.inputEmpID, offet : $scope.currentPage, next_size : $scope.maxSize})
		.then(function(result) {
			$scope.empList = result;
			$scope.is_doing_something1 = false;
		});
	};

	$scope.searchData = function () {
		$scope.is_doing_something1 = true;
		$scope.empList = [];
		EmployeeService.doQuerySize({input_emp: $scope.inputEmpID})
		.then(function(result) {
			$scope.data_size = result;
			if($scope.data_size > 0) {
				$scope.currentPage = 0;
				$scope.currentSize = ($scope.data_size > $scope.maxSize ? $scope.maxSize : $scope.data_size);
				EmployeeService.doQueryList({input_emp: $scope.inputEmpID, offet : 0, next_size : $scope.maxSize})
				.then(function(result) {
					$scope.empList = result;
					$scope.is_doing_something1 = false;
				});
			}
		});
	};
	
	$scope.selectEmp = function(emp) {
		$scope.selectedEmp = emp;
		EmployeeService.doQueryDetails({input_emp: emp.empNo})
		.then(function(res){
			$scope.details = res;
		});
	};
}]);