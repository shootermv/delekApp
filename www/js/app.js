// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('delekApp', ['ionic', 'delekApp.controllers', 'delekApp.services', 'ngMessages', 'ngOpenFB', 'ngCookies', 'ngCordova'])

.run(function($ionicPlatform, ngFB, $cookies) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
    //fb
    ngFB.init({
      appId: '138458469846435',
      oauthRedirectURL:'http://localhost:8100/templates/oauthcallback.html',
      tokenStore:$cookies
     });
     
     
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q) {
        return {
            request: function (config) {
                config.timeout = 2000;
                return config;
            },
            responseError: function (rejection) {
                switch (rejection.status){
                    case 408 :
                        alert('no network connection!');
                        break;
                }
                return $q.reject(rejection);
            }
        }
    })
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  //if there is stored preferenes - should redirected to default vehicle
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.stats', {
    url: '/stats/:vehicleId',
    views: {
      'tab-stats': {
        templateUrl: 'templates/tab-stats.html',
        controller: 'StatsCtrl'
      }
    }
  })

  .state('tab.addentry', {
      url: '/addentry',
      views: {
        'tab-addentry': {
          templateUrl: 'templates/tab-addEntry.html',
          controller: 'AddEntryCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/addentry/:chatId',
      views: {
        'tab-addentry': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-vehicles.html',
        controller: 'VehiclesCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
