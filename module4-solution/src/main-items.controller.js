(function () {
    'use strict';

    angular.module('Data')
        .controller('MainItemsController', MainItemsController);

    MainItemsController.$inject = ['items'];
    function MainItemsController(items) {
        var mainItems = this;
        mainItems.categoryName = items['category']['name'];
        mainItems.items = items['menu_items'];
    }

})();

