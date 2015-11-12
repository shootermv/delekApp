angular.module('delekApp.controllers')
.controller('StatsCtrl', function($scope, Fuel, $state, Vehicles) {
  
  function loadSummary(){
    $scope.loading = true;
    Fuel.getSummary($state.params.vehicleId).then(function(summary){
      $scope.loading = false;
      $scope.summary = summary;
    });    
  }
  function loadVehicles(){
    Vehicles.get().then(function(vehicles){
      $scope.vehicles = vehicles;
      $scope.selected = {};
      $scope.selected.value  =  $scope.vehicles.filter(function(itm){
        return $state.params.vehicleId === itm._id.$oid; 
      })[0];
    })
  }
  
  $scope.changeVehicle = function(){
    $state.go('tab.stats',{vehicleId: $scope.selected.value._id.$oid}, {reload:true})
  }
  $scope.$on('$ionicView.enter', function(e) {
    loadSummary();
    loadVehicles();
  });
  
})