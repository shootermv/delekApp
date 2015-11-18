angular.module('delekApp.controllers')
.controller('LoginCtrl', function($scope, $state, Vehicles, ngFB, DBA, $ionicLoading) {
    function afterAuthorized(token) {
		//must insert user into slqLite table for next times 
		getFromSqlite().then(function(result) {
			if(result.rows.length===0){		
		      DBA.insertToken(token);
			}
		})
		if(Vehicles.getDefault()){
			$state.go('tab.stats',{vehicleId:Vehicles.getDefault()});
		}else{//if no default vehicle saved - go to vehicles tab
			$state.go('tab.vehicles');
		}
	}
	function checkAuth(){
		$ionicLoading.show({
            template: 'wait...'
        });
		getFromSqlite().then(function(result) {
			$ionicLoading.hide();
			if(result.rows.length){
				afterAuthorized();
			}else{
				//must authorize with facebook button if not connected
				//check if still connected to facebook
				ngFB.getLoginStatus().then(function(status){			
					if(status.status === 'connected'){
					   afterAuthorized();
					}
				});				
			}
		});
		

    }

	function getFromSqlite(){		
		return DBA.query("SELECT id, token FROM delek_user");        
	}
		
	$scope.facebookLogin = function () {		
		ngFB.login({scope: 'email'}).then(
			function (response) {
				console.log(JSON.stringify(response, null, 5))
				if (response.status === 'connected') {
                    afterAuthorized(response.authResponse.accessToken);
				} else {
					alert('Facebook login failed');
				}
			});
	};
    checkAuth();
})