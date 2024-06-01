(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                isNothing: '<',
                onRemove: '&'
            },
            controller: 'NarrowItDownController as menuCtl',
            bindToController: true
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctl = this;
        ctl.queryStr = '';
        ctl.found = [];
        ctl.isNothing = false;

        ctl.find = function () {
            const lowerQueryStr = ctl.queryStr.toLowerCase();
            if (lowerQueryStr == ''){
                setNothingResult();
            }
            else {
                MenuSearchService.getMatchedMenuItems(lowerQueryStr).then(function (result) {
                    if (result.length == 0)
                        {
                            setNothingResult();
                        }
                    else {
                        setFoundResult(result);
                    }
                }).catch(function (error) {
                    console.log(error);
                    setNothingResult();
                });
                
            }
            
        };

        function setNothingResult () {
            ctl.found = [];
            ctl.isNothing = true;
        }

        function setFoundResult (result){
            ctl.found = result
            ctl.isNothing = false;
        }

        ctl.removeItem = function (itemIndex) {
            ctl.found.splice(itemIndex, 1);
            if (ctl.found.length < 1) {
                setNothingResult();
            }
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                var foundItems = [];
                const data = result.data;
                for (const category in data) {
                    const result = data[category].menu_items.filter(function (item) {
                        return item.description.toLowerCase().includes(searchTerm)
                    });
                    if (result.length >= 1) {
                        foundItems = foundItems.concat(result)
                    }
                }
                return foundItems;
            }).catch(function (error) {
                console.log(error);
                return [];
            });
        };
    }

})();