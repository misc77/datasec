var app = angular.module('datasec', []);
app.value('appdata', { msg: '', content: 'default', submenu: 'default', object: undefined});
app.controller('myController', ['$scope', '$http', 'appdata', function($scope, $http, appdata) {
        $scope.appdata = appdata;
        $scope.list = '';
        
        $scope.call_submenu = function($name){
            if ($name === undefined | $name === null) {
                $name = 'default';
            };            
            if ($name === 'standort'){
                $http.get('/api/'+$name+'/list').then( 
                     function(res) { $scope.list = res.data; });
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
            appdata.content = $content;
        };
        
        /* Mitarbeiter */
        //save new Mitarbeiter
//        $scope.save_mitarbeiter = function(){
//             $http.post('/api/mitarbeiter/create').success(function(data, status, headers, config){
//                appdata.msg = 'Mitarbeiter angelegt!';
//            }).error(function(data, status, headers, config){
//                //error
//            });
//        };
}]);

/* Standort */
app.controller('standortCtrl', ['$scope', '$http', 'appdata', function($scope, $http, appdata) {
    $scope.formData = {};
    $scope.object_id = undefined;
    $scope.title = 'anlegen';
    
    // init
    $scope.init = function(){
        if (appdata.object !== undefined | appdata.object !== $scope.object_id) {
            $http.get('/api/standort/get',{params: { id : appdata.object}}).success( 
              function(data) { 
                  $scope.formData = data.standort[0];
                  $scope.title = 'ändern'; 
                  $scope.object_id = appdata.object;
            });
        } else {
            $scope.formData = '';
            $scope.object_id = undefined;
            $scope.title = 'anlegen';
        }
    };
    
    //reset
    $scope.reset = function(){
        appdata.object = undefined;
        appdata.content = 'default';
        appdata.submenu = 'standort';
        $scope.init();
    };
        
    //Create Form
    $scope.save_standort = function(){
        if ($scope.object_id === undefined) {
            $http.post('/api/standort/create', $scope.formData).success( function(data, status, headers, config){
                appdata.msg = 'Standort gespeichert!';
                $scope.reset();
            }).error(function(data, status, headers, config){
                alert("Fehler beim Speichern: " + data);
            });
        } else {
           $http.post('/api/standort/save', $scope.formData).success( function(data, status, headers, config){
                appdata.msg = 'Standort gespeichert!';
                $scope.reset();
            }).error(function(data, status, headers, config){
                alert("Fehler beim Speichern: " + data);
            }); 
        }
    };
    
    $scope.init();
}]);



