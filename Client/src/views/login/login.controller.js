import angular from 'angular';

angular.module('trips').controller('LoginController', ($scope, $location, AuthenticationService) => {

	$scope.userExists = true;
	AuthenticationService.ClearCredentials();

	$scope.login = async () => {
		$scope.dataLoading = true;
		$scope.userExists = true;
		try {
			var x = await AuthenticationService.Login($scope.username, $scope.password);
			if (x.data.length) {
				AuthenticationService.SetCredentials($scope.username, $scope.password);
				$location.path('/');
			}
			else {
				$scope.userExists = false;
			}
		}
		catch (error) {
			console.error(error);
		}
		finally {
			$scope.dataLoading = false;
			$scope.$applyAsync();
		}
	};
});
