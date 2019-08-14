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
        service.GetHome = GetHome;
        service.GetByNameTypeRegion = GetByNameTypeRegion;
        service.GetByDescViewDate = GetByDescViewDate;

        return service;

        function GetAll() {
            return $http.get('http://localhost:3000/api/trips').then(handleSuccess, handleError('Error getting all trips'));
        }
        
        function GetHome(userId) {
            return $http.get('http://localhost:3000/api/trips/getHomeTrips/' + userId).then(handleSuccess, handleError('Error getting all trips'));
        }

        function GetByNameTypeRegion(name, type, region){
            return $http.post('http://localhost:3000/api/trips/getByNTR', {name, type, region}).then(handleSuccess, handleError('Error geting search results'));
        }

        function GetByDescViewDate(desc, viewsFrom, viewsTo, fromDate, toDate){
            return $http.post('http://localhost:3000/api/trips/getByDVD', {desc, viewsFrom, viewsTo, fromDate, toDate}).then(handleSuccess, handleError('Error geting search results'));
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
