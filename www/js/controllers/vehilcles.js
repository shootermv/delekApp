/* global $ionicModal */
angular.module('delekApp.controllers')

.controller('VehiclesCtrl', function($scope, Vehicles, $state, $ionicModal, $ionicPopup, $ionicLoading, $timeout) {
    $scope.vehicle = {};
    function activate(){
        $scope.loading = true;
        Vehicles.get().then(function(vehicles){ 
            $scope.loading = false;   
            $scope.vehicles = vehicles;
        });       
    }
    
    //add vehicle modal
    $ionicModal.fromTemplateUrl('templates/modals/addVehicleModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(addModal) {
      $scope.addModal = addModal;
    });
    
    $scope.closeAddModal = function(vehicleForm) {
        
        vehicleForm.name.$setTouched();
        if(vehicleForm.$valid){
           $ionicLoading.show({
            template: 'saving...'
           });
           Vehicles.save($scope.vehicle).then(function(newVehicle) {
             $ionicLoading.hide();
             $scope.addModal.hide();
             $scope.vehicles.push(angular.copy(newVehicle));
           });            
        }

    };
    
    $scope.openAddModal = function() {
      $scope.addModal.show();
    };
    $scope.goToVehicle = function(vehicleId){
       //store last vehicle as default      
       Vehicles.storeDefault(vehicleId); 
       $scope.$emit('default-vehilce');
       $timeout(function() {
           try{
              
              $state.go('tab.stats',{vehicleId: vehicleId}); 
           }
           catch(exxx){
               alert(exxx.message)
           }
       },100);
       
    }
   //confirm deleteVehicle dialog
    $scope.showConfirm = function(vehicle) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Deleting Vehicle',
            template: 'Are you sure you want to delete this vehicle?'
        });
        confirmPopup.then(function(res) {
            if(res) {
               Vehicles.remove(vehicle).then(function() { 
                    $scope.vehicles.splice($scope.vehicles.indexOf(vehicle),1);
               });               
            } else {
                console.log('You are not sure');
            }
        });
    };
        
   activate();
});