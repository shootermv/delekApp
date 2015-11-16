angular.module('delekApp.services', [])

.factory('Fuel', function($http, $q, mongoLab) {

  var service = {    
    all: all,
    deleteVehicleStats: deleteVehicleStats,    
    getSummary: getSummary,
    save: save     
  };
  
  return service;
  
  //PRIVATE
  //---------------------------------------------
  //getting all stats of some vehicle
  function all(vehicleId) {
      var params = '{"vehicleId":"' + vehicleId + '"}';
      
      var deferr = $q.defer();
      $http.get(mongoLab.baseUrl + 'fuel?q='+ params + '&' + mongoLab.keyParam).success(function(fuelRecords){
        deferr.resolve(fuelRecords);
      }).error(function(err){
        alert(err);        
      });
      return deferr.promise;
   }
   

    //get fuel summary of some vehicle
    function getSummary(vehicleId){
      var summary = {
        mileage:0,
        fuel:0,
        totalCost:0
      };
      var deferr = $q.defer();
      if(!vehicleId){
        deferr.resolve(summary);
      }
      else{
        this.all(vehicleId).then(function(records){
          if(records.length){

            angular.forEach(records, function(rec){
              summary.fuel += (rec.fuel && parseInt(rec.fuel) ) || 0;          
              summary.totalCost += rec.fuel ? (rec.cost && parseInt(rec.cost) || 0) * rec.fuel : 0;
            })
            //calculate mileage
            summary.mileage = records[records.length-1].mileage - records[0].mileage;
          }
          deferr.resolve(summary);
        });
      }
      return deferr.promise;
     }
     
    //delete Stats of Vehicle
    function deleteVehicleStats(vehicleId){
      var params = '{"vehicleId":"' + vehicleId + '"}';
      var deferr = $q.defer();
       $http.delete(mongoLab.baseUrl + 'fuel?q='+ params + '&' + mongoLab.keyParam).success(function(fuelRecords){
        deferr.resolve(fuelRecords);
       }).error(function(err){
        alert(err);        
       });
       return deferr.promise;
     } 
      

    //adding new fuel entry 
    function save(newFuelEntry) {
      //must add date
      newFuelEntry.date = new Date().getTime();
      var deferr = $q.defer();
      $http.post(mongoLab.baseUrl + 'fuel?' + mongoLab.keyParam, newFuelEntry).success(function(fuelEntry){       
        deferr.resolve(fuelEntry);
      }).error(function(err){
        alert(err);        
      });
      return deferr.promise;
    }   
});