var app = angular.module('datasec', []);
app.value('appdata', { msg: '', content: 'default', submenu: 'default', object: ''});
app.controller('myController', ['$scope', '$http', 'appdata', function($scope, $http, appdata) {
        $scope.appdata = appdata;
        $scope.standortListe = '';
        
        $scope.call_submenu = function($name){
            if ($name === undefined | $name === null) {
                $name = 'default';
            };            
            if ($name === 'standort'){
                $http.get('/api/standort/list').then( 
                           function(res) { $scope.standortListe = res.data; });
            }
            appdata.submenu = $name;
            appdata.content = 'default';
            appdata.msg = $name;
        };
        
        $scope.call_content = function($content, $object){
            if ($content === undefined | $content === null) {
                $content = 'default';
            };
            if ($object !== null & $object !== undefined) {
                appdata.object = $object;
            }
            alert('content: ' + $content + ' object: ' + $object);
           appdata.content = $content;
        };
        
        /* Mitarbeiter */
        //save new Mitarbeiter
        $scope.save_mitarbeiter = function(){
             $http.post('/api/mitarbeiter/create').success(function(data, status, headers, config){
                appdata.msg = 'Mitarbeiter angelegt!';
            }).error(function(data, status, headers, config){
                //error
            });
        };
}]);

/* Standort */
app.controller('standortCtrl', ['$scope', '$http', 'appdata', function($scope, $http, appdata) {
    $scope.formData = init();
    
    $scope.init = function(){
        if (appdata.object !== null & appdata.object !== undefined) {
            $http.get('/api/standort/id', appdata.object).then( 
              function(res) { 
                  $scope.formData.bezeichnung = res.data.bezeichnung; 
                  $scope.formData.land = res.data.land;
                  $scope.formData.hauptstandort = res.data.hauptstandort;
                  $scope.formData.gruendung = res.data.gruendung;
                  $scope.formdata.schliessung = res.data.schliessung;
                  $scope.standort = res.data._id;
            });
        } else {
            $scope.formData.bezeichnung = '';
            $scope.formData.land = '';
            $scope.formData.hauptstandort = false;
            $scope.formData.gruendung = '';
            $scope.formData.schliessung = '';
        }
    };
        
    //Create Form
    $scope.save_standort = function(){
        alert('formData: ' + $scope.formData.toString());
        $http.post('/api/standort/create', $scope.formData).success( function(data, status, headers, config){
            appdata.msg = 'Standort gespeichert!';
            appdata.content = 'default';
            appdata.submenu = 'standort';
        }).error(function(data, status, headers, config){
            alert("Fehler beim Speichern: " + data);
        });
    };
}]);



