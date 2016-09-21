var customerControllers = angular.module('customerControllers', []);

customerControllers.controller('ListCustomerController', ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
	$http.get('http://tidy-api-test.herokuapp.com:80/api/v1/customer_data').then(function(response) {
		$rootScope.listCustomers = response.data;
    });

	$scope.del = function(id) {
		var delConfirm = confirm('Are you sure?');
		if(delConfirm === true) {
			var index = getSelectedIndex(id);
			$http.delete('http://tidy-api-test.herokuapp.com:80/api/v1/customer_data/'+id);
			$scope.listCustomers.splice(index, 1);
		}
	};
}]);

customerControllers.controller('AddCustomerController', ["$scope", "$routeParams", "$http", "$location", function($scope, $routeParams, $http, $location) {
	var id = $routeParams.id,
        has = typeof (id) !== 'undefined',
        model = has ? $scope.id : null;


	window.getSelectedIndex = function(id) {
		for(var i = 0; i < $scope.listCustomers.length; i++) {
			if($scope.listCustomers[i].id == id) {
				return i;
			}
		}
		return -1;
	};

    if(has) {
		var index = getSelectedIndex(id);
		var costumer = $scope.listCustomers[index];

		$scope.id = costumer.id;
		$scope.name = costumer.name;
		$scope.email = costumer.email;
		$scope.phone = costumer.phone;
		$scope.address = costumer.address;
		$scope.city = costumer.city;
		$scope.state = costumer.state;
		$scope.zipcode = costumer.zipcode;
    }

	$scope.save = function() {
		if($scope.validForm.$valid) {
			var dataObj = {
				id: $scope.id, name: $scope.name, email: $scope.email, phone: $scope.phone, address: $scope.address, city: $scope.city, state: $scope.state, zipcode: $scope.zipcode
			};

			if(has) {
				var index = getSelectedIndex($scope.id);
				$http.put('http://tidy-api-test.herokuapp.com:80/api/v1/customer_data/'+$scope.id, dataObj).success(function(result) {
					$scope.listCustomers[index].name = $scope.name;
					$scope.listCustomers[index].email = $scope.email;
					$scope.listCustomers[index].phone = $scope.phone;
					$scope.listCustomers[index].address = $scope.address;
					$scope.listCustomers[index].city = $scope.city;
					$scope.listCustomers[index].state = $scope.state;
					$scope.listCustomers[index].zipcode = $scope.zipcode;
				});
			} else {
				var res = $http.post('http://tidy-api-test.herokuapp.com:80/api/v1/customer_data', dataObj);
			}

			$location.path('/');
		}
	};
}]);