(function () {
    'use strict';

    angular.module('Data')
        .component('categories', {
            templateUrl: 'templates/categories.template.html',
            bindings: {
                categories: '<'
            }
        });

})();