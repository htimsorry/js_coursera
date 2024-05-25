(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope){
        $scope.input = ''
        $scope.message = ''
        $scope.color = ''
        $scope.checkItem = function () {
            const arr = $scope.input.split(',');
            var count = 0;
            
            // Count element and ignore null string
            arr.forEach(element => {
                if (element.trim() != ''){
                    count += 1;
                }
            });
            
            if (count == 0){
                $scope.message = 'Please enter data first';
                $scope.color = '';
            }
            else if (count <= 3){
                $scope.message = 'Enjoy!';
                $scope.color = 'green';
            }
            else {
                $scope.message = 'Too much!';
                $scope.color = 'red';
            }

        }

    };
}
)();