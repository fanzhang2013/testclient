
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html",
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('app.mycomments', {
      url: "/mycomments",
      views: {
        'menuContent' :{
          templateUrl: "templates/mycomments.html",
          controller: 'MyCommentsCtrl'
        }
      }
    })
    .state('app.signup', {
      url: "/signup",
      views: {
        'menuContent' :{
          templateUrl: "templates/signup.html",
          controller: 'SignupCtrl'
        }
      }
    })
    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })
    .state('app.feeds', {
      url: "/feeds",
      views: {
        'menuContent' :{
          templateUrl: "templates/feeds.html",
          controller: 'FeedsCtrl'
        }
      }
    })
    .state('app.pcomments', {
      url: "/usercomments",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'UserCommentsCtrl'
        }
      }
    })
    .state('app.postcomments', {
      url: "/postcomment",
      views: {
        'menuContent' :{
          templateUrl: "templates/postcomment.html",
          controller: 'PostCommentCtrl'
        }
      }
    })
    .state('app.qrcode', {
      url: "/qrcode",
      views: {
        'menuContent' :{
          templateUrl: "templates/qrcode.html",
          controller: 'QRCtrl'
        }
      }
    })
    .state('app.single', {
      url: "/moviedetails",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  $urlRouterProvider.otherwise('/app/login');
});

