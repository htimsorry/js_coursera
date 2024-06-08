(function () {
    "use strict";

    angular.module('public')
        .controller('InfoController', InfoController);

    InfoController.$inject = ['user', 'ApiPath', 'MenuService'];
    function InfoController(user, ApiPath, MenuService) {
        var $ctrl = this;
        $ctrl.category = '';

        // for developing only
        // user.firstName = 'John';
        // user.lastName = 'Smith';
        // user.email = 'abc@example.com';
        // user.phone = '123-456-7890';
        // user.favDish = 'A1';
        // user.category = 'A'

        $ctrl.user = user;
        $ctrl.basePath = ApiPath;
        if (user.favDish) {
            $ctrl.category = user.category;
            
            MenuService.getMenuItem(user.favDish, $ctrl.category).then(function (result) {
                $ctrl.favItem = result;
            });
        }
    }

})();
