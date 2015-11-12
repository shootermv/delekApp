angular.module('delekApp.controllers')

.controller('AddEntryCtrl', function($scope, Fuel, $state, Vehicles) {

  $scope.entry = {};
  
  $scope.save = function(entry, entryForm) {
    //lets set the fileds "touched" so errors will show when submit empty form
    entryForm.fuel.$setTouched();
    entryForm.cost.$setTouched();
    if(entryForm.$valid){    
     entry.vehicleId = Vehicles.getDefault();   
     Fuel.save(entry).then(function(){
       $scope.entry = {};
       entryForm.$setUntouched();/*prevent form validation*/
       entryForm.$setPristine();
       $state.go('tab.stats');
     },function(){
       alert('failed to save entry')
     });

    }
  };
})
