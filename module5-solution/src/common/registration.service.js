(function () {
    "use strict";

    angular.module('common')
        .service('RegistrationService', RegistrationService);

    function RegistrationService() {
        var service = this;
        var thisUser = {};

        service.setUser = function (user) {
            thisUser.firstName = user.firstName;
            thisUser.lastName = user.lastName;
            thisUser.email = user.email;
            thisUser.phone = user.phone;
            thisUser.favDish = user.favDish;
            thisUser.category = user.category;
        };

        service.getUser = function () {
            return thisUser;
        };
    }

})();
