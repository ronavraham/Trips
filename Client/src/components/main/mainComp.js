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
			scope: {},
			link (scope, element, attrs, tabsCtrl) {
				scope.filter = {};
				scope.onSearchClick = ($e) => {
					Object.keys(scope.filter).forEach(key => {
						if (scope.filter[key] === '') {
							delete scope.filter[key];
						}
					});

					window.location.href = `#!games?filter=${JSON.stringify(scope.filter)}`;
				};
			}
		};
	});
}
