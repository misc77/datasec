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
    $scope.mitarbeiterliste = {};
    $scope.aufgabenliste = {};
    $scope.mitarbeiterstatusliste = {};
    $scope.rollenliste = {};
    $scope.beschaeftigungliste = {};
    $scope.musterrollen = {};
    $scope.tresorliste = {};
    $scope.raumliste = {};
    $scope.fahrzeugliste = {};
    $scope.papierdokumentliste = {};
    $scope.hardwareliste = {};
    $scope.ressourcentypliste = {};
    $scope.is_init = false;
        
    //INIT
    $scope.init = function(){
        // loading data
        $http.get('/api/standort/list_active').then( function(res) { $scope.standorte = res.data; });
        $http.get('/api/daten/list').then( function(res) { $scope.daten = res.data; });
        $http.get('/api/zutrittsmittelstatus/list').then( function(res) { $scope.statusliste = res.data; });
        $http.get('/api/zutrittsmittel/list').then( function(res) { $scope.zutrittsmittelliste = res.data; });
        $http.get('/api/mitarbeiter/list').then( function(res) { $scope.mitarbeiterliste = res.data; });
        $http.get('/api/aufgabe/list').then( function(res) { $scope.aufgabenliste = res.data; });
        $http.get('/api/mitarbeiterstatus/list').then( function(res) { $scope.mitarbeiterstatusliste = res.data; });
        $http.get('/api/rolle/list').then( function(res) { $scope.rollenliste = res.data; });
        $http.get('/api/beschaeftigung/list').then( function(res) { $scope.beschaeftigungliste = res.data; });
        $http.get('/api/musterrolle/list').then( function(res) { $scope.musterrollen = res.data; });
        $http.get('/api/tresor/list').then( function(res) { $scope.tresorliste = res.data; });
        $http.get('/api/raum/list').then( function(res) { $scope.raumliste = res.data; });
        $http.get('/api/fahrzeug/list').then( function(res) { $scope.fahrzeugliste = res.data; });
        $http.get('/api/papierdokument/list').then( function(res) { $scope.papierdokumentliste = res.data; });
        $http.get('/api/hardware/list').then( function(res) { $scope.hardwareliste = res.data; });
        $http.get('/api/ressourcentyp/list').then( function(res) { $scope.ressourcentypliste = res.data; });

        // setting formdata
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
        $scope.is_init = true;
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
        $scope.is_init = false;
    };
    
    $scope.inc_tresor_zuo = function(){
        alert('in inc: ' + appdata.content + ' subment: ' + appdata.submenu + ' scope: ' + $scope.object_id);
        if ($scope.formData.tresor_zuo !== null & $scope.formData.tresor_zuo !== undefined) {
            $scope.$apply($scope.formData.tresor_zuo.push({ tresor : null, zutrittlsmittel: null }));          
        }
    };
  
    if($scope.is_init !== true) {
        $scope.init();
    }
}]);



