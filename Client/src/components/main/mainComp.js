import angular from 'angular';

export default function () {
	require('./mainCtrl');
	require('./mainStyle');

	angular.module('trips').directive('app', () => {
		return {
			template: require('./mainComponent.html'),
			controller: 'appCtrl',
			controllerAs: 'appa',
			restrict: 'E',
			replace: true,
			scope: {}
		};
	});
}
