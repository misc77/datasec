/* Main Controller */
var app = angular.module('datasec', ['ngMessages']);
app.value('appdata', { msg: '', content: 'default', submenu: 'default', object: undefined, user:null, show_static_data:false, show_data:false, show_status:false});

app.factory("DataService", function($http){
    var standorte = {};
    var daten = {};
    var statusliste = {};
    var zutrittsmittelliste = {};
    var mitarbeiterliste = {};
    var aufgabenliste = {};
    var mitarbeiterstatusliste = {};
    var rollenliste = {};
    var beschaeftigungliste = {};
    var musterrollen = {};
    var tresorliste = {};
    var raumliste = {};
    var fahrzeugliste = {};
    var dokumentliste = {};
    var hardwareliste = {};
    var ressourcentypliste = {};
    var rechteliste = {};
    var ressourcenliste = {};
    var is_init = true;
    var fading_time;
    
    return {
        is_init : function() { return is_init; },
        set_is_init: function(val) { is_init = val; },
        standorte: function() { return standorte; },
        set_standorte: function(val) { standorte = val; },
        daten : function() { return daten; },
        set_daten: function(val) {daten = val; },
        statusliste: function() { return statusliste; },
        set_statusliste: function(val) { statusliste = val; },
        zutrittsmittelliste: function() { return zutrittsmittelliste; },
        set_zutrittsmittelliste: function(val) { zutrittsmittelliste = val; },
        mitarbeiterliste: function() { return mitarbeiterliste; },
        set_mitarbeiterliste: function(val) { mitarbeiterliste = val; },
        aufgabenliste: function() { return aufgabenliste; },
        set_aufgabenliste: function(val) { aufgabenliste = val; },
        mitarbeiterstatusliste: function() { return mitarbeiterstatusliste; },
        set_mitarbeiterstatusliste: function(val) { mitarbeiterstatusliste = val; },
        rollenliste: function() { return rollenliste; },
        set_rollenliste: function(val) { rollenliste = val; },
        beschaeftigungliste: function() { return beschaeftigungliste; },
        set_beschaeftigungliste: function(val) { beschaeftigungliste = val; },
        musterrollen: function() { return musterrollen; },
        set_musterrollen: function(val) { musterrollen = val; },
        tresorliste: function() { return tresorliste; },
        set_tresorliste: function(val) { tresorliste = val; },
        raumliste: function() { return raumliste; },
        set_raumliste: function(val) { raumliste = val; },
        fahrzeugliste: function() { return fahrzeugliste; },
        set_fahrzeugliste: function(val) { fahrzeugliste = val; },
        dokumentliste: function() { return dokumentliste; },
        set_dokumentliste: function(val) { dokumentliste = val; },
        hardwareliste: function() { return hardwareliste; },
        set_hardwareliste: function(val) { hardwareliste = val; },
        ressourcentypliste: function() { return ressourcentypliste; },
        set_ressourcentypliste: function(val) { ressourcentypliste = val; },
        rechteliste: function() { return rechteliste; },
        set_rechteliste: function(val) { rechteliste = val; },
        ressourcenliste: function() { return ressourcenliste; },
        set_ressourcenliste: function(val) { ressourcenliste = val; },
        fading_time: function() { return fading_time; },
        
        init: function() {
            if (is_init){
                // loading data
                $http.get('/api/standort/list_active').then( function(res) { standorte = res.data; });
                $http.get('/api/daten/list').then( function(res) { daten = res.data; });
                $http.get('/api/zutrittsmittelstatus/list').then( function(res) { statusliste = res.data; });
                $http.get('/api/zutrittsmittel/list').then( function(res) { zutrittsmittelliste = res.data; });
                $http.get('/api/mitarbeiter/list').then( function(res) { mitarbeiterliste = res.data; });
                $http.get('/api/aufgabe/list').then( function(res) { aufgabenliste = res.data; });
                $http.get('/api/mitarbeiterstatus/list').then( function(res) { mitarbeiterstatusliste = res.data; });
                $http.get('/api/rolle/list').then( function(res) { rollenliste = res.data; });
                $http.get('/api/beschaeftigung/list').then( function(res) { beschaeftigungliste = res.data; });
                $http.get('/api/musterrolle/list').then( function(res) { musterrollen = res.data; });
                $http.get('/api/tresor/list').then( function(res) { tresorliste = res.data; });
                $http.get('/api/raum/list').then( function(res) { raumliste = res.data; });
                $http.get('/api/fahrzeug/list').then( function(res) { fahrzeugliste = res.data; });
                $http.get('/api/hardware/list').then( function(res) { hardwareliste = res.data; });
                $http.get('/api/ressourcentyp/list').then( function(res) { ressourcentypliste = res.data; });
                $http.get('/api/ressourcen/list').then( function(res) { ressourcenliste = res.data; });
                $http.get('/api/rechte/list').then( function(res) { rechteliste = res.data; });
                this.is_init = false;
                fading_time = 750;
            }
        },
        
        update : function() {
            this.is_init(true);
            this.init();
        }
    };
});

app.controller('myController', ['$scope', '$http', 'appdata', '$log', '$window', 'DataService', '$location', function($scope, $http, appdata, $log, $window, DataService, $location) {
        $scope.appdata = appdata;
        $scope.list = '';
        $scope.dataservice = DataService;        
                
        (function (){
            $http.get('/api/user/loggedIn').then( 
                function(res) { 
                    $http.get('/api/benutzer/get',{params: { id : res.data }}).success( 
                        function (data) { 
                            appdata.user = data.object[0];
                            appdata.show_data = appdata.user.rechte 
                                                    | appdata.user.beschaeftigung 
                                                    | appdata.user.hardware 
                                                    | appdata.user.ressourcen 
                                                    | appdata.user.ressourcentyp 
                                                    | appdata.user.raum 
                                                    | appdata.user.standort 
                                                    | appdata.user.tresor 
                                                    | appdata.user.zutrittsmittel ;
                            appdata.show_static_data = appdata.user.mitarbeiter 
                                                            | appdata.user.musterrolle 
                                                            | appdata.user.dokumente ; 
                            appdata.show_status = appdata.user.mitarbeiterstatus 
                                                        | appdata.user.zutrittsmittelstatus;
                            // init data
                            $scope.dataservice.init();
                        }
                    ).error(
                        function () {
                             alert('Probleme bei der Benutzerauthorisierung!');
                        }
                    );
                }
            );
        })();
        
        //Call Submenu
        $scope.call_submenu = function($name){
//            $http.get('/api/connection/state').success (function(data) { 
//                if(data.state === 1){
                    if ($name === undefined | $name === null) {
                        $name = 'default';
                    };
                    
                    $http.get('/api/'+$name+'/list').then( function(res) { 
                        $scope.list = res.data;
                        $("#content").fadeOut($scope.dataservice.fading_time, function() {
                            appdata.submenu = $name;
                            appdata.content = 'default';
                            $("#submenu").fadeIn($scope.dataservice.fading_time);
                        }); 
                        
                        appdata.msg = $name;
                    });
                   
                    
//                } else {
//                    $window.location.path('/disconnected.html');
//                }
//            });
        };
        
        //Call Content
        $scope.call_content = function($content, $object){
            if ($content === undefined | $content === null) {
                $content = 'default';
            };
            if ($object !== undefined) {
                appdata.object = $object;
            }
            $("#submenu").fadeOut($scope.dataservice.fading_time, function() {
                $("#content").fadeIn($scope.dataservice.fading_time);
            });
            appdata.content = $content;
        };
        
        //Reset Content
        $scope.reset = function(){
            $scope.call_submenu(appdata.submenu);
            appdata.object = undefined;
        };
        
        //Log out user and kill session
        $scope.logout = function(){
            appdata.object = undefined;
            $http.get('/logout').success( 
                function(data, status, headers, config){
                    appdata.msg = 'Erfolgreich abgemeldet!';
                    $window.location.reload();
                }).error(function(data, status, headers, config){
                    alert("Fehler beim Abmelden: " + data);
            }); 
        };
}]);

/* Stammdaten Controller*/
app.controller('staticDataCtrl', ['$scope', '$http', 'appdata', '$log', function($scope, $http, appdata, $log, DataService) {
    $scope.formData = {};
    $scope.object_id = undefined;
    $scope.title = appdata.submenu + ' anlegen';
    $scope.params = {};
    $scope.is_init = false;
     
    //INIT
    $scope.init = function(){
                
        // setting formdata
        if (appdata.object !== undefined | appdata.object !== $scope.object_id) {
            $http.get('/api/'+appdata.submenu+'/get',{params: { id : appdata.object}}).success( 
              function(data) { 
                  if (data.object[0] !== undefined) {
                      $scope.formData = data.object[0];                    
                  } else {
                      $scope.formData = data.object;                   
                  }
                  if (appdata.content === 'delete' ){
                      $scope.title = appdata.submenu + ' löschen';
                  } else{
                      $scope.title = appdata.submenu + ' ändern'; 
                  }
                  $scope.object_id = appdata.object;
            });
        } else {
            $http.get('/api/'+appdata.submenu+'/get_new_obj',$scope.params).success( 
              function (data) { 
                  $log.debug('data: ' + angular.toJson(data.object));
                  $scope.formData = data.object;
                  $scope.title = appdata.submenu + ' anlegen'; 
                  $scope.object_id = undefined;
            }).error(
              function () {
                $scope.formData = '';
                $scope.object_id = undefined;
                $scope.title = appdata.submenu + ' anlegen';
            });
        }
        $scope.is_init = true;
    };
    
    //Reset
    $scope.reset = function(){
        $scope.call_submenu(appdata.submenu);
        appdata.object = undefined;
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
                Materialize.toast(appdata.msg, 4000);
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
    
    $scope.add_entry = function(list, data){
        $log.debug('list: ' + list);
        if (list !== undefined){
            list.push(data);
        } else {
            list = [];
            list.push(data);
        }
    };
  
    $scope.remove_entry = function(list, entry){
        if (list !== null & list !== undefined & angular.isArray(list)){
            var index = list.indexOf(entry);
            list.splice(index,1);
        }
    };
    
    $scope.signup = function(){
        $http.post('/signup', $scope.formData).success( function(data, status, headers, config){
                appdata.msg = 'User registriert!';
                $scope.reset();
            }).error(function(data, status, headers, config){
                alert("Fehler beim Registrieren: " + data);
            }); 
    };
  
    if($scope.is_init !== true) {
        $scope.init();
    }
}]);



