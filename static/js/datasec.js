var app = angular.module('datasec', []);
app.controller('myController', ['$scope', '$http', function($scope, $http) {
        $scope.msg = 'No Message';
        $scope.submenu = 'default';
        $scope.content = '';
        $scope.standortListe = '';
        $scope.bezeichnung = '';
        $scope.land = '';
        $scope.hauptstandort = '';
        $scope.gruendungs = '';
        $scope.schliessung = '';
        
        $scope.call_submenu = function($name){
            if ($name === undefined | $name === null) {
                $name = 'default';
            };            
            if ($name === 'standort'){
                $http.get('/api/standort/list').then( 
                           function(res) { $scope.standortListe = res.data; $scope.msg = res.data;});
            }
            $scope.submenu = $name;
        };
        
        $scope.call_content = function($content){
            if ($content === undefined | $content === null) {
                $content = 'default';
            }; 
            $scope.content = $content;
        };
        
        /* Standort */
        //Create Form
        $scope.save_standort = function(){
                       
            var data = { 'bezeichnung' : $scope.bezeichnung, 'land' : $scope.land, 'hautpstandort' : $scope.hauptstandort, 'gruendung' : $scope.gruendung, 'schliessung' : $scope.schliessung};
            $scope.msg = data;
            
//            $http.post('/api/standort/create', data).success( function(data, status, headers, config){
//                $scope.msg = 'Standort gespeichert!';
//                $scope.content = 'default';
//            }).error(function(data, status, headers, config){
//                alert("Fehler beim Speichern: " + data);
//            });
        };
        
        /* Mitarbeiter */
        //save new Mitarbeiter
        $scope.save_mitarbeiter = function(){
             $http.post('/api/mitarbeiter/create').success(function(data, status, headers, config){
                $scope.msg = 'Mitarbeiter angelegt!';
            }).error(function(data, status, headers, config){
                //error
            });
        };
}]);



