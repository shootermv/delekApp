angular.module('delekApp.controllers', [])

.controller('MainCtrl', function($scope, Vehicles, $rootScope) {
    $scope.$on('$ionicView.enter', function(e) {
       $scope.defaultVehicle = Vehicles.getDefault();
    });
    $rootScope.$on('default-vehilce', function(e) {        
        $rootScope.defaultVehicle = Vehicles.getDefault();
    })
})
.controller('ChartCtrl', function($scope, Fuel) {
  
   $scope.loading = true;
   Fuel.all().then(function(records){ 
     $scope.loading = true;   
     $scope.records = records;
   });
  
});
