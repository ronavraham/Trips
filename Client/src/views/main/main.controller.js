import angular from 'angular';

angular.module('trips').controller('MainController', ($scope, $location, TripService, UserService) => {

	$scope.trips = [];

	// This function runs itself on init of the controller
	(this.getAllTrips = async () => {
		$scope.dataLoading = true;

		try {
			var alltrips = await TripService.GetAll();
			var alltripsAndusers = await this.convertEmailToUsername(alltrips);

			if (alltripsAndusers.length) {
				$scope.trips = alltripsAndusers;
				this.windowresize();
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
			x.visible = true;
			return x;
		}));
	}

	this.windowresize = () => {
		var numOfItems = Math.floor(window.innerWidth / 450);

		$scope.trips.forEach((e, i) => {
			e.visible = i < numOfItems;
		});

		$scope.$applyAsync();
	}

	$scope.gotoTrip = (id) => {
		window.location.href = `#!tripView?id=${id}`;
	}

	window.addEventListener('resize', this.windowresize);
});
