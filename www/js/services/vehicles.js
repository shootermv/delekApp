angular.module('delekApp.services')
.factory('Vehicles', function($http, $q, mongoLab, $cookies, Fuel) {
	var service = {
		get:get,
		save:save,
    remove:remove,
    storeDefault:storeDefault,
    getDefault:getDefault
	};
  
  //get all vehicles
	function get(){
	    var deferr = $q.defer();
      $http.get(mongoLab.baseUrl + 'vehicles?' + mongoLab.keyParam).success(function(vehicles){
        deferr.resolve(vehicles);
      }).error(function(err){
        alert(err);        
      });
      return deferr.promise;
	}
  //add new vehicle
  function save(vehicle){
		var deferr = $q.defer();
    $http.post(mongoLab.baseUrl + 'vehicles?' + mongoLab.keyParam, vehicle).success(function(vehicle){
         deferr.resolve(vehicle);
    }).error(function(err){
         alert(err);        
    });		
		return deferr.promise;
	}
  //remove single vehicle
  function remove(vehicle){
    var deferr = $q.defer();
    $http.delete(mongoLab.baseUrl + 'vehicles/'+ vehicle._id.$oid +'?' + mongoLab.keyParam).success(function(vehicles){
        deferr.resolve(vehicles);
    }).error(function(err){
        alert(err);        
    });	
    return deferr.promise;
  }
  //remove vehicle and its fuel stats 
  function removeVehicle(){
    var self = this;
    var deferr = $q.defer();
    self.remove().then(Fuel.deleteVehicleStats).then(function(){
       deferr.resolve();
    });
    return deferr.promise;
  }
  //store default vehicle in cookie
  function storeDefault(vehicleId){
    if(vehicleId){$cookies.put("vehicleId",vehicleId) ;}
    return $q.when($cookies.get("vehicleId") || null);
  }
  //get default vehicle from cookie
  function getDefault(){    
    return  $cookies.get("vehicleId") || null;    
  }
	return service;
});