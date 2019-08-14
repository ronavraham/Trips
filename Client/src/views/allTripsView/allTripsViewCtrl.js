import angular from 'angular';

import './allTripsView.less';

angular.module('trips').controller('AllTripsViewController', ($scope, $http, TripService, UserService, AuthenticationService) => {
    
    $scope.regions = ['Europe', 'Asia', 'South America', 'North America', 'Middle East', 'Africa'];
    $scope.types = ['Exotic', 'City', 'Trekk'];
    $scope.trips = [];
    $scope.allTrips = [];
    $scope.videoUrl = require('@/assets/Sri Lanka.mp4');
    $scope.searchData = {};
    $scope.searchState = undefined;

	// This function runs itself on init of the controller
	(this.getAllTrips = async () => {
		$scope.dataLoading = true;

		try {
            var alltrips = await TripService.GetAll();
            
            alltrips.forEach(x => {
                if (x.userid === AuthenticationService.globals.currentUser.userid){
                    x.canUpdateOrDel = true;
                }
            });

			if (alltrips.length) {
                $scope.trips = alltrips;
                $scope.allTrips = alltrips;
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

    
    $scope.openTripView = (id) => {
        window.location.href = `#!tripView?id=${id}`;
        $scope.ws.close();
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

    $scope.searchA = async () => {
        $scope.searchLoad = true;
        var alltrips = await TripService.GetByNameTypeRegion($scope.searchData.name, $scope.searchData.type, $scope.searchData.region);
        alltrips.forEach(x => {
            if (x.userid === AuthenticationService.globals.currentUser.userid){
                x.canUpdateOrDel = true;
            }
        });
        $scope.trips = alltrips;
        $scope.searchLoad = false;
        $scope.searchState = 'A';
        $scope.$applyAsync();
    }

    $scope.searchB = async () => {
        $scope.searchLoad = true;
        var alltrips = await TripService.GetByDescViewDate($scope.searchData.desc, $scope.searchData.viewsFrom, $scope.searchData.viewsTo, $scope.searchData.fromDate, $scope.searchData.toDate);
        alltrips.forEach(x => {
            if (x.userid === AuthenticationService.globals.currentUser.userid){
                x.canUpdateOrDel = true;
            }
        });
        $scope.trips = alltrips;
        $scope.searchLoad = false;
        $scope.searchState = 'B';
        $scope.$applyAsync();
    }

    $scope.clearSearch = () => {
        $scope.trips = $scope.allTrips;
        $scope.searchState = undefined;
    }

    $scope.ws = new WebSocket('ws://localhost:3001/');

    $scope.ws.onopen = () => {
        console.log('ws connected');
    };

    $scope.ws.onmessage = async (msg) => {
        if(!$scope.searchState)
        {
            var res = await TripService.GetAll();
            res.forEach(x => {
                if (x.userid === AuthenticationService.globals.currentUser.userid){
                    x.canUpdateOrDel = true;
                }
            });
            $scope.trips = res;
        }
        else if ($scope.searchState === 'A'){
            var alltrips = await TripService.GetByNameTypeRegion($scope.searchData.name, $scope.searchData.type, $scope.searchData.region);
            alltrips.forEach(x => {
                if (x.userid === AuthenticationService.globals.currentUser.userid){
                    x.canUpdateOrDel = true;
                }
            });
            $scope.trips = alltrips;
        }
        else {
            var alltrips  = await TripService.GetByDescViewDate($scope.searchData.desc, $scope.searchData.viewsFrom, $scope.searchData.viewsTo, $scope.searchData.fromDate, $scope.searchData.toDate);
            alltrips.forEach(x => {
                if (x.userid === AuthenticationService.globals.currentUser.userid){
                    x.canUpdateOrDel = true;
                }
            });
            $scope.trips = alltrips;
        }
        $scope.$applyAsync();
    };

    $scope.ws.onclose = () => {
        console.log('ws closed');
    };
});
