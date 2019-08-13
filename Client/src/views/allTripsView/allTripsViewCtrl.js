import angular from 'angular';

import './allTripsView.less';

angular.module('trips').controller('AllTripsViewController', ($scope, $http, TripService, UserService, AuthenticationService) => {
    
    $scope.trips = [];
    $scope.ws = new WebSocket('ws://localhost:3001/');
    $scope.videoUrl = "https://youtu.be/c9tiHoctyuk?t=19";

	// This function runs itself on init of the controller
	(this.getAllTrips = async () => {
		$scope.dataLoading = true;

		try {
            var alltrips = await TripService.GetAll();
            // We can remove this if all trips automatically have userid:
            var alltripsAndusers = await this.convertEmailToUserID(alltrips);
            
            alltripsAndusers.forEach(x => {
                if (x.userid === AuthenticationService.globals.currentUser.userid){
                    x.canUpdateOrDel = true;
                }
            });

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

    
    this.convertEmailToUserID = async (arr) => {
		return await Promise.all(arr.map(async (x) => {
			var user = await UserService.GetByEmail(x.email);
            x.userid = user._id;
			return x;
		}));
	}
    
    $scope.openTripView = (id) => {
        window.location.href = `#!tripView?id=${id}`;
    };


    $scope.deleteTrip = async (id) => {
        await $http.post('http://localhost:3000/api/trips/deleteTrip', { tripId: id });
        $scope.ws.send('trip deleted');
        this.getAllTrips();
    };

    $scope.updateTrip = (id) => {
        window.location.href = `#!tripUpdate?id=${id}`;
        $scope.ws.close();
    };
});
