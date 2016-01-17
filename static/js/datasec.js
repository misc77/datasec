/* Main Controller */
var app = angular.module('datasec', []);
app.value('appdata', { msg: '', content: 'default', submenu: 'default', object: undefined});
app.controller('myController', ['$scope', '$http', 'appdata', function($scope, $http, appdata) {
        $scope.appdata = appdata;
        $scope.list = '';
        
        //Call Submenu
        $scope.call_submenu = function($name){
            if ($name === undefined | $name === null) {
                $name = 'default';
            };            
            $http.get('/api/'+$name+'/list').then( function(res) { $scope.list = res.data; });
            appdata.submenu = $name;
            appdata.content = 'default';
            appdata.msg = $name;
        };
        
        //Call Content
        $scope.call_content = function($content, $object){
            if ($content === undefined | $content === null) {
                $content = 'default';
            };
            if ($object !== undefined) {
                appdata.object = $object;
            }
            appdata.content = $content;
        };
        
        //Reset Content
        $scope.reset = function(){
            appdata.object = undefined;
            $scope.call_submenu(appdata.submenu);
        };
}]);

/* Stammdaten Controller*/
app.controller('staticDataCtrl', ['$scope', '$http', 'appdata', function($scope, $http, appdata) {
    $scope.formData = {};
    $scope.object_id = undefined;
    $scope.title = appdata.submenu + ' anlegen';
    $scope.standorte = {};
    $scope.daten = {};
    $scope.statusliste = {};
    $scope.zutrittsmittelliste = {};
        
    //INIT
    $scope.init = function(){
        $http.get('/api/standort/list_active').then( function(res) { $scope.standorte = res.data; });
        $http.get('/api/daten/list').then( function(res) { $scope.daten = res.data; });
        $http.get('/api/zutrittsmittelstatus/list').then( function(res) { $scope.statusliste = res.data; });
        $http.get('/api/zutrittsmittel/list').then( function(res) { $scope.zutrittsmittelliste = res.data; });
        if (appdata.object !== undefined | appdata.object !== $scope.object_id) {
            $http.get('/api/'+appdata.submenu+'/get',{params: { id : appdata.object}}).success( 
              function(data) { 
                  $scope.formData = data.object[0];
                  if (appdata.content === 'delete' ){
                      $scope.title = appdata.submenu + ' löschen';
                  } else{
                      $scope.title = appdata.submenu + ' ändern'; 
                  }
                  $scope.object_id = appdata.object;
            });
        } else {
            $scope.formData = '';
            $scope.object_id = undefined;
            $scope.title = appdata.submenu + ' anlegen';
        }
    };
    
    //Reset
    $scope.reset = function(){
        appdata.object = undefined;
        $scope.call_submenu(appdata.submenu);
        $scope.init();
    };
        
    //Create or Update
    $scope.save = function(){
        if ($scope.object_id === undefined) {
            $http.post('/api/' + appdata.submenu + '/create', $scope.formData).success( function(data, status, headers, config){
                appdata.msg = appdata.submenu + ' gespeichert!';
                $scope.reset();
            }).error(function(data, status, headers, config){
                alert("Fehler beim Speichern: " + data);
            });
        } else {
           $http.post('/api/' + appdata.submenu + '/save', $scope.formData).success( function(data, status, headers, config){
                appdata.msg = appdata.submenu + ' gespeichert!';
                $scope.reset();
            }).error(function(data, status, headers, config){
                alert("Fehler beim Speichern: " + data);
            }); 
        }
    };
    
    //Delete
    $scope.delete = function(){
        if (appdata.object !== undefined){
            $http.post('/api/' + appdata.submenu + '/delete', $scope.formData).success( function(data, status, headers, config){
                appdata.msg = appdata.submenu + ' gelöscht!';
                $scope.reset();
            }).error(function(data, status, headers, config){
                alert("Fehler beim Löschen: " + data);
            });
        }
    };
    
    $scope.init();
}]);



