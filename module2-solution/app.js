(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyCtl = this;

        toBuyCtl.items = ShoppingListCheckOffService.getToBuyItems();

        toBuyCtl.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        }

        toBuyCtl.isEmpty = function () {
            const arr = toBuyCtl.items;
            return (arr.length === 0);
        };
    }


    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBuyCtl = this;

        alreadyBuyCtl.items = ShoppingListCheckOffService.getAlreadyBuyItems();

        alreadyBuyCtl.isEmpty = function () {
            const arr = alreadyBuyCtl.items;
            return (arr.length === 0);
        };
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
            {name: "Cookies", quantity: 1},
            {name: "Red bull", quantity: 2},
            {name: "Milk", quantity: 3},
            {name: "Donuts", quantity: 4},
            {name: "Coffee", quantity: 5}
        ];

        var alreadyBuyItems = [];

        service.buyItem = function (itemIndex) {
            var item = {
                name: toBuyItems[itemIndex].name,
                quantity: toBuyItems[itemIndex].quantity
            };
            alreadyBuyItems.push(item);
            toBuyItems.splice(itemIndex, 1);
        };

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getAlreadyBuyItems = function () {
            return alreadyBuyItems;
        };
    }

})();