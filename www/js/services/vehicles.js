angular.module('delekApp.services')
.factory('Vehicles', function($http, $q, mongoLab, $cookies) {
	var service = {
		get:get,
		save:save,
    remove:remove,
    storeDefault:storeDefault,
    getDefault:getDefault
	};
	function get(){
	    var deferr = $q.defer();
      $http.get(mongoLab.baseUrl + 'vehicles?' + mongoLab.keyParam).success(function(vehicles){
        deferr.resolve(vehicles);
      }).error(function(err){
        alert(err);        
      });
      return deferr.promise;
	}
  function save(vehicle){
		var deferr = $q.defer();
    $http.post(mongoLab.baseUrl + 'vehicles?' + mongoLab.keyParam, vehicle).success(function(vehicle){
         deferr.resolve(vehicle);
    }).error(function(err){
         alert(err);        
    });		
		return deferr.promise;
	}
  function remove(vehicle){
    var deferr = $q.defer();
    $http.delete(mongoLab.baseUrl + 'vehicles/'+ vehicle._id.$oid +'?' + mongoLab.keyParam).success(function(vehicles){
          deferr.resolve(vehicles);
    }).error(function(err){
         alert(err);        
    });	
    return deferr.promise;
  }
  function storeDefault(vehicleId){
    if(vehicleId){$cookies.put("vehicleId",vehicleId) ;}
    return $q.when($cookies.get("vehicleId") || null);
  }
  function getDefault(){
    
    return  $cookies.get("vehicleId") || null;
    
  }
	return service;
});