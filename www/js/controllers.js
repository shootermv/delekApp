angular.module('delekApp.controllers', [])

.controller('MainCtrl', function($scope, Vehicles) {
    $scope.$on('$ionicView.enter', function(e) {
       $scope.defaultVehicle = Vehicles.getDefault();
    });
    $scope.$on('default-vehilce', function(e, vehileId) {        
        $scope.defaultVehicle = vehileId;
    })
})
.controller('ChartCtrl', function($scope, Fuel) {
  
   $scope.loading = true;
   Fuel.all().then(function(records){ 
     $scope.loading = true;   
     $scope.records = records;
   });
  
});
