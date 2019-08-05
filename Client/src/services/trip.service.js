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
        // service.GetById = GetById;
        // service.Create = Create;

        return service;

        function GetAll() {
            return $http.get('http://localhost:3000/api/trips').then(handleSuccess, handleError('Error getting all users'));
        }

        // function GetById(id) {
		// 	return $http.get('http://localhost:3000/api/trip/' + id).then(handleSuccess, handleError('Error getting user by id'));
        // }

        // function Create(user) {
		// 	return $http.post('http://localhost:3000/api/users/adduser', { user: user }).then(handleSuccess, handleError('Error creating user'));
        // }

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
