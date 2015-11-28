angular.module('delekApp.controllers')

.controller('AddEntryCtrl', function($scope, Fuel, $state, Vehicles) {

  $scope.entry = {};
  
  $scope.save = function(entry, entryForm) {
    //lets set the fileds "touched" so errors will show when submit empty form    
    entryForm.fuel.$setTouched();
    entryForm.cost.$setTouched();
    
    //retrieve vehicleId
    var vehicleId = $state.params.vehicleId;
    if(entryForm.$valid && vehicleId){    
     entry.vehicleId = vehicleId;   
     Fuel.save(entry).then(function(){
       $scope.entry = {};
       entryForm.$setUntouched();/*prevent form validation*/
       entryForm.$setPristine();
       $state.go('tab.stats',{vehicleId:vehicleId});
     },function(){
       alert('failed to save entry')
     });

    }
  };
})
