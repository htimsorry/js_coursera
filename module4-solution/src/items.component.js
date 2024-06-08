(function () {
    'use strict';

    angular.module('Data')
        .component('items', {
            templateUrl: 'templates/items.template.html',
            bindings: {
                items: '<'
            }
        });

})();