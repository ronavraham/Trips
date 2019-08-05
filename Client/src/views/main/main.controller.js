import angular from 'angular';

angular.module('trips').controller('MainController', ($scope, $location, TripService) => {

	// This function runs itself on init of the controller
	(this.getAllTrips = async () => {
		$scope.dataLoading = true;
		$scope.trips = [];

		try {
			var x = await TripService.GetAll();

			if (x.length) {
				$scope.trips = x;
			}
		}
		catch (error) {
			console.error(error);
		}
		finally {
			$scope.dataLoading = false;
			$scope.$applyAsync();
		}
	})();
});
