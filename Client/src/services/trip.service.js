import angular from 'angular';

(function () {
    'use strict';

    angular
        .module('trips')
        .service('TripService', TripService);

    TripService.$inject = ['$http'];
    function TripService($http) {
        var service = {};

        service.GetAll = GetAll;

        return service;

        function GetAll() {
            return $http.get('http://localhost:3000/api/trips').then(handleSuccess, handleError('Error getting all users'));
		}

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
