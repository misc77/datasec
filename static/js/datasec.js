var app = angular.module('datasec', []);
app.controller('myController', ['$scope', '$http', function($scope, $http) {
        $scope.msg = 'No Message';
        $scope.submenu = 'default';
        $scope.content = '';
        $scope.call_submenu = function($name){
            if ($name === undefined | $name === null) {
                $name = 'default';
            };            
            $scope.submenu = $name;
            $scope.content = $name;
        };
        
        $scope.create_mitarbeiter = function(){
            $scope.content = 'Neuanlage Mitarbeiter';
        };
}]);



