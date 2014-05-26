angular.module('starter.controllers', ['ngRoute','ngCookies','firebase'])

.factory('Page', function($firebase) {
    var title = 'http://192.168.0.15:8180';
    var menu = '';
    var friendRef = new Firebase("https://ewom.firebaseio.com/friends");
    var friend = $firebase(friendRef);
    var feedsRef = new Firebase("https://ewom.firebaseio.com/feeds");
    var feeds = $firebase(feedsRef);
    var key = '';
    var friendId = '';
    var firedonce = 'false';
    return {
      title: function() { return title; },
      setTitle: function(newTitle) { title = newTitle },
      menu: function() { return menu; },
      setMenu: function(newMenu) {  menu = newMenu },
      friend: function() { return friend; },
      setFriend: function(newFriend) {  friend = newFriend },
      feeds: function() { return feeds; },
      setFeeds: function(newFeeds) {  feeds = newFeeds },
      key: function() { return key; },
      setKey: function(newKey) {  key = newKey },
      firedonce: function() { return firedonce; },
      setFiredonce: function(newFiredonce) {  firedonce = newFiredonce },
      friendId: function() { return friendId; },
      setfriendId: function(newfriendId) {  friendId = newfriendId }
    };
 })

.controller('AppCtrl', function($scope,$cookieStore,$location) {
   $scope.logout =function() {
  localStorage.clear();
var chatRef = new Firebase('https://ewom.firebaseio.com/');
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {    
      auth.logout();
    localStorage.clear();
    $location.path('/app/login');
  } else {
        localStorage.clear();
        $location.path('/app/login');
  }
});
        auth.logout();
     }

})
.controller('ProfileCtrl', function($scope, $http, $window, $location, Page, $cookieStore, $firebase) {
   
   $scope.user = JSON.parse(localStorage.getItem("user"));
   $scope.home= function() {
      $location.path('/');
    }

    
})


.controller('UserCommentsCtrl', function($scope, $http, $window, $location, Page, $cookieStore, $firebase) {
   $scope.home= function() {
      $location.path('/');
    }
  var url=Page.title()+'/movielist';
  $http({method: 'GET', url: url}).
     success(function(data, status, headers, config) {
      $scope.movieslist=data;
      
     }).
     error(function(data, status, headers, config) {
      console.log("fail");
      });
   $scope.showdetail = function(movie) {
      //$cookieStore.put("movie",movie);
      localStorage.setItem("movie", JSON.stringify(movie));
      $location.path('/app/moviedetails');
   };
})


.controller('SignupCtrl', function($scope, $http, $window, $location, Page, $cookieStore, $firebase) {
     if(JSON.parse(localStorage.getItem("user"))!=null){
    $location.path('/app/usercomments');
   }
    $scope.signup = function() {
    if($scope.password==$scope.password2){
      $scope.user = {
        username:$scope.username,
        fullname:$scope.fullname,
        password:$scope.password,
        email:$scope.email
    }; 
     var user = 'user='+JSON.stringify( $scope.user);
      var url=Page.title()+'/users';
    $http({method: 'POST', url: url, data:user, headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).
      success(function(data, status, headers, config) {
         console.log(data);
         //$cookieStore.put("user",data);
         localStorage.setItem("user", JSON.stringify(data));
         $location.path('/app/usercomments');
      }).
      error(function(data, status, headers, config) {
        console.log("fail");
        });

    }
    
    }
    $scope.login= function() {  
     $location.path('/app/login');
  }
})


.controller('LoginCtrl', function($scope, $http, $window, $location, Page, $cookieStore, $firebase) {
   if(JSON.parse(localStorage.getItem("user"))!=null){
    $location.path('/app/usercomments');
   }
   
var chatRef = new Firebase('https://ewom.firebaseio.com/');
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {
    // user authenticated with Firebase
    console.log(user.thirdPartyUserData);
     $scope.provideruser = {
        username:user.displayName,
        fullname:user.thirdPartyUserData.name,
        provider:user.provider,
        providerid:user.thirdPartyUserData.id,
        providerdetail:user.thirdPartyUserData
    }; 
    // if($cookieStore.get("user")!=null){
    //     console.log("user in session");
    //       console.log($cookieStore.get("user"));
    // }else{
    var user = JSON.stringify($scope.provideruser);
     var url=Page.title()+'/socialusers';
     $http({method: 'POST', url: url, data:user, headers: {'Content-Type': 'application/json'},
    }).
      success(function(data, status, headers, config) {
         localStorage.setItem("user", JSON.stringify(data));
         $location.path('/app/usercomments');
      }).
      error(function(data, status, headers, config) {
        console.log("fail");
        });
    //}

  } else {
    // user is logged out
  }
});
  $scope.changetwitter = function() {
      if($scope.twitterlogin==true){
        auth.login('twitter');
      }
    }
 $scope.changefacebook = function() {
      if($scope.facebooklogin==true){
        auth.login('facebook');
      }
  }


    $scope.login = function() {
      $scope.user = {
        email:$scope.email,
        password:$scope.password
     }; 
     var user = JSON.stringify($scope.user);
     var url=Page.title()+'/users/session';
    $http({method: 'POST', url: url, data:user, headers: {'Content-Type': 'application/json'},
      }).
      success(function(data, status, headers, config) {
         console.log(data);
         $localStorage.setItem("user", JSON.stringify(data));
         $location.path('/app/usercomments');
      }).
      error(function(data, status, headers, config) {
        console.log("fail");
        });
    }

  $scope.signup = function() {  
     $location.path('/app/signup');
  }
$scope.qr = function() { 
  $location.path('/app/qrcode');
  }

// setTimeout(function(){
// $scope.$apply(function() {
//   function onBodyLoad()
//             {
//                 document.addEventListener("deviceready", onDeviceReady, false);
//             }

//         function success(resultArray) {

//         alert("Scanned " + resultArray[0] + " code: " + resultArray[1]);
//             }

//             function failure(error) {
//                 alert("Failed: " + error);
//             }

//             function scan() {
//                 // See below for all available options. 
//                 cordova.exec(success, failure, "ScanditSDK", "scan",
//                              ["mG161NvLEeOVWNHHllUiX3YjGNnHygyhu6dK8msMkZE",
//                               {"beep": true,
//                               "1DScanning" : true,
//                               "2DScanning" : true}]);
//             }

//             app.initialize();
//   });
//  });
})


.controller('PlaylistCtrl', function($scope, $stateParams, $http, $window, $location, Page, $cookieStore, $firebase) {
     //$scope.movie=$cookieStore.get("movie");
     $scope.movie = JSON.parse(localStorage.getItem("movie"));
     $scope.home= function() {
      $location.path('/');
    }

     $scope.postComment = function(movie_id) {
      $location.path('/app/postcomment');
   };
   var url=Page.title()+'/movie/listbymovie/'+$scope.movie._id;
   $http({method: 'GET', url: url}).
     success(function(data, status, headers, config) {
      $scope.myreviews=data.reverse();
       console.log(data); 
     }).
     error(function(data, status, headers, config) {
      console.log("fail");
      });

      $scope.getNumber = function(num) {

    return new Array(parseInt(num));   
  }
})


.controller('MyCommentsCtrl', function($scope, $stateParams, $http, $window, $location, Page, $cookieStore, $firebase) {
  var userId=JSON.parse(localStorage.getItem("user"))._id;

    $scope.home= function() {
      $location.path('/');
    }

    $scope.getNumber = function(num) {

    return new Array(parseInt(num));   
  }
  var url=Page.title()+'/movie/listbyuser/'+userId;
  $http({method: 'GET', url: url}).
     success(function(data, status, headers, config) {
      $scope.myreviews=data.reverse(); 
     }).
     error(function(data, status, headers, config) {
      console.log("fail");
      });
})


.controller('FeedsCtrl', function($scope, $stateParams, $http, $window, $location, Page, $cookieStore, $firebase) {
  //var userId='53669ebb57c2d12b1b316897';

    $scope.home= function() {
      $location.path('/');
    }
    $scope.getNumber = function(num) {
      return new Array(parseInt(num));   
    }
    $scope.feeds= Page.feeds();

    $scope.showdetail = function(movie) {
      //$cookieStore.put("movie",movie);
      //window.localStorage['movie']=movie;
      localStorage.setItem("movie", JSON.stringify(movie));
      $location.path('/app/moviedetails');
   };
 
})

.controller('PostCommentCtrl', function($scope, $stateParams, $http, $window, $location, Page, $cookieStore, $firebase) {
   //$scope.movie=$cookieStore.get("movie");
   $scope.movie = JSON.parse(localStorage.getItem("movie"));
    $scope.home= function() {
      $location.path('/');
    }
    
    $scope.change = function() {
      if($scope.rating >1 && $scope.rating < 20){
        $scope.experience='Much less than expected';
      }
      if($scope.rating > 20 && $scope.rating < 40){
        $scope.experience='Less than Expected';
      }
      if($scope.rating >40 && $scope.rating < 60){
        $scope.experience='As expected';
      }
      if($scope.rating >60 && $scope.rating < 80){
        $scope.experience='More than expected';
      }
      if($scope.rating > 80){
        $scope.experience='Much more than expected';
      }
    };
   $scope.postreview = function() {
    
    $scope.review = {
        movieId:$scope.movie._id,
        rating:$scope.rating,
        comments:$scope.comment,
        userId: $scope.movie = JSON.parse(localStorage.getItem("user"))._id
    }; 
    var jdata = 'mydata='+JSON.stringify($scope.review);  
     var url=Page.title()+'/movie/addcomment';
    $http({method: 'POST', url: url, data:jdata, headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).
      success(function(data, status, headers, config) {
         console.log(data);
         $scope.feeds= Page.feeds();
         $scope.feednews = data;
         $scope.feednews.movie=$scope.movie = JSON.parse(localStorage.getItem("movie"));
         $scope.feednews.user=$scope.movie = JSON.parse(localStorage.getItem("user"));
         $scope.feeds.$add($scope.feednews);
         $location.path('/app/moviedetails');
      }).
      error(function(data, status, headers, config) {
        console.log("fail");
        });

   };
})

.filter('reverse', function() {
    function toArray(list) {
       var k, out = [];
       if( list ) {
          if( angular.isArray(list) ) {
             out = list;
          }
          else if( typeof(list) === 'object' ) {
             for (k in list) {
                if (list.hasOwnProperty(k)) { out.push(list[k]); }
             }
          }
       }
       return out;
    }
    return function(items) {
       return toArray(items).slice().reverse();
    };
 })

