var mainApp = angular.module("main_app");

mainApp.service('EmployeeService', function ($http) {
	this.isExecuted = false;
	this.DetailsCache = [];
	
	this.doQuerySize = function (params) {
		params['action'] = "doQuerySize";
		result = 0;
		this.isExecuted = true;
		return $http({
			url: 'http://127.0.0.1:8080/EmployeeService/servlet/Employee',
			method: "POST",
			params: params,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			timeout : 5000
		}).then(function success(resp) {
				console.log("doQuerySize SUCCESS");
				return resp.data;
			},
			
			function fail(resp) {
				console.log("doQuerySize FAIL");
				return 0;
			}
		);
	},
	
	this.doQueryList=function (params) {
		params['action'] = "doQueryList";
		this.isExecuted = true;
		return $http({
			url: 'http://127.0.0.1:8080/EmployeeService/servlet/Employee',
			method: "POST",
			params: params,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			timeout : 10000
		}).then(
			function success(resp) {
				console.log("doQueryList SUCCESS");
				return resp.data;
			},
			
			function fail(resp) {
				console.log("doQueryList FAIL");
				return 0;
			}
		);
	},
	
	this.doQueryDetails=function (params) {
		params['action'] = "doQueryDetails";
		this.isExecuted = true;
		this.DetailsCache = [];
		
		return $http({
			url: 'http://127.0.0.1:8080/EmployeeService/servlet/Employee',
			method: "POST",
			params: params,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			timeout : 10000
		}).then(
			function success(resp) {
				console.log("doQueryDetails SUCCESS");
				this.DetailsCache = resp.data;
				//console.log(this.DetailsCache);
				return resp.data;
			},
			
			function fail(resp) {
				console.log("doQueryDetails FAIL");
				return 0;
			}
		);
	}
	
	this.getDetailsCache=function() {
		return this.DetailsCache;
	}
});