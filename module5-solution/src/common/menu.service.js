(function () {
    "use strict";

    angular.module('common')
        .service('MenuService', MenuService);


    MenuService.$inject = ['$http', 'ApiPath'];
    function MenuService($http, ApiPath) {
        var service = this;

        service.getCategories = function () {
            return $http.get(ApiPath + '/categories.json').then(function (response) {
                return response.data;
            });
        };

        service.getMenuItem = function (item, category) {
            var result = null

            return service.getMenuItems(category)
                .then(function (response) {
                    if (response != null && response.hasOwnProperty('menu_items')) {
                        var menuItems = response.menu_items
                        for (let i = 0; i < menuItems.length; i++) {
                            if (menuItems[i].short_name == item) {
                                result = menuItems[i];
                                break;
                            }
                        }
                    }

                    return result;
                })
                .catch(function (error) {
                    console.log(error);
                });

        };


        service.getMenuItems = function (category) {
            return $http.get(ApiPath + '/menu_items/' + category + '.json')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
    }


})();
