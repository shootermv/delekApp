angular.module('delekApp.services')

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

   //init db   
   var db = null;
   function initDB(){
      $ionicPlatform.ready(function() {
          if(window.cordova && window.sqlitePlugin) {
            try{
              db = $cordovaSQLite.openDB("delek.db");
            }catch(exx){
              alert(exx.message);
            }
            
            
          } else {
          
            // Ionic serve syntax
            db = window.openDatabase("delek.db", "1.0", "My app", -1);
          }
          $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS delek_user (id integer primary key, token text)");      
      });
   }
   

  //init the DB if not exist:
  initDB();
  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  //insert record with user facebook token
  self.insertToken = function(token) {
    //must insert token if no rows found
    
      
        var query = "INSERT INTO delek_user (token) VALUES (?)";
        $cordovaSQLite.execute(db, query, [token]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
           
  }

  return self;
})