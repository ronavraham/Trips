import angular from 'angular';

angular.module('trips')
	.controller('RegisterController', (UserService, $location, $scope) => {
		$scope.register = () => {
			$scope.dataLoading = true;
			UserService.Create($scope.user)
				.then(function (response) {
					$location.path('/login');
				}, function (error) {
					$scope.dataLoading = false;
					$scope.$applyAsync();
					console.error(error);
				});
		}
	});
