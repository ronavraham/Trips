import angular from 'angular';
import 'reset-css';
import mainComp from './components/main/mainComp';

const MODULE_NAME = 'trips';
angular.module(MODULE_NAME, [require('angular-route'), require('angular-material')]);
mainComp();

require('angular-material/angular-material.min.css');
require('./views/mainView/mainViewCtrl');

angular.module(MODULE_NAME).config(($routeProvider) => {
	$routeProvider.when('/', {
		template: require('./views/mainView/mainView.html'),
		controller: 'mainViewCtrl'
	});
});
