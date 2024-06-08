(function () {
    "use strict";

    angular.module('public')
        .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['RegistrationService', 'MenuService'];
    function RegistrationController(RegistrationService, MenuService) {
        var $ctrl = this;

        $ctrl.submit = function () {
            if ($ctrl.user.favDish) {
                
                var dish = $ctrl.user.favDish
                var category = ''
                // Get back category
                for (let i = 0; i < dish.length; i++) {
                    if (/^[a-zA-Z]*$/.test(dish[i])) {
                        category += dish[i]
                    }
                }

                $ctrl.user.category = category

                MenuService.getMenuItem($ctrl.user.favDish, $ctrl.user.category).then(function (response) {
                    if (response != null){
                        RegistrationService.setUser($ctrl.user);
                        $ctrl.status = 'saved';
                    }
                    else {
                        $ctrl.status = 'not found';
                    }
                    
                }).catch(function () {
                    $ctrl.status = 'not found';
                });
            }
            else {
                RegistrationService.setUser($ctrl.user);
                $ctrl.status = 'saved';
            }
        };
    }

})();
