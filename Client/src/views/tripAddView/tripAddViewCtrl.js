import './tripAddView.less';
import angular from 'angular';


angular.module('trips')
	.controller('RegisterController', ($scope, $http) => {
		$scope.addGame = () => {
			$http.post('http://localhost:3000/trips/addTrip', { game: $scope.data }).then(() => {
				const ws = new WebSocket('ws://localhost:3001/');
				ws.onopen = (ev) => {
					ws.send('trip added');
					ws.close();
				};

				ws.onclose = () => {
					window.location.href = `#!trips`;
				};
			});
		};
	});
