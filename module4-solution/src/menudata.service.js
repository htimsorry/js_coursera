(function () {
    'use strict';

    angular.module('Data')
        .service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var service = this;

        service.getAllCategories = function () {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            }).then(function (result) {
                return result.data;
            }).catch(function (error) {
                console.log(error);
                return [];
            });
        };

        service.getItemsForCategory = function (categoryShortName) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items/" + categoryShortName + '.json')
            }).then(function (result) {
                return result.data;
            }).catch(function (error) {
                console.log(error);
                return [];
            });
        };
    }

})();

