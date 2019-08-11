import angular from 'angular';

angular.module('trips').controller('MainController', ($scope, $location, TripService, UserService) => {

	// This function runs itself on init of the controller
	(this.getAllTrips = async () => {
		$scope.dataLoading = true;
		$scope.trips = [];

		try {
			var alltrips = await TripService.GetAll();
			var alltripsAndusers = await this.convertEmailToUsername(alltrips);

			if (alltripsAndusers.length) {
				$scope.trips = alltripsAndusers;
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

	this.convertEmailToUsername = async (arr) => {
		return await Promise.all(arr.map(async (x) => {
			var user = await UserService.GetByEmail(x.email);
			x.username = user.username;
			return x;
		}));
	}
});
