import angular from 'angular';

angular.module('trips').controller('MainController', ($scope, $http, TripService, UserService, AuthenticationService) => {

	$scope.trips = [];
	UserService.GetById(AuthenticationService.globals.currentUser.userid).then((res) => {
		$scope.username = res.username;
	});

	// This function runs itself on init of the controller
	(this.getHomeTrips = async () => {
		$scope.tripsLoading = true;

		try {
			var alltrips = await TripService.GetHome(AuthenticationService.globals.currentUser.userid);
			var alltripsAndusers = await this.convertEmailToUsername(alltrips.slice(0,Math.floor(window.innerWidth / 450)));

			if (alltripsAndusers.length) {
				$scope.trips = alltripsAndusers;
				this.windowresize();
			}
		}
		catch (error) {
			console.error(error);
		}
		finally {
			$scope.tripsLoading = false;
			$scope.$applyAsync();
		}
	})();

	this.convertEmailToUsername = async (arr) => {
		return await Promise.all(arr.map(async (x) => {
			var user = await UserService.GetById(x.userid);
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
		
		this.calcVis();
		$scope.$applyAsync();
	}

	$scope.gotoTrip = (id) => {
		window.location.href = `#!tripView?id=${id}`;
	}

	window.addEventListener('resize', this.windowresize);

	var getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getWeather)
		}
	}

	var getWeather = async (position) => {
		$scope.dataLoading = true;
		var res = await $http.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather',
			{
				params: {
					lat: position.coords.latitude,
					lon: position.coords.longitude,
					units: 'metric',
					APPID: '50e5e552a74c7defcc7607a0fce0fdf6'
				}
			});
		
		$scope.dataLoading = false;
		$scope.temp = res.data.main.temp;
		$scope.$applyAsync();
	}

	this.calcVis = () => {
		$scope.numOfRec = $scope.trips.reduce((total, curr) => {
			return curr.visible ? total + 1: total;
		}, 0);
	}

	getLocation();
});
