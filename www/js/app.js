// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('index', {
		url: '/index',
        templateUrl: 'templates/manu.html',
		//controller: 'AppCtrl'
	})
		.state('insert',{
		url: '/insert',
		templateUrl: 'templates/insert.html',
	 controller: 'AdminCtrl'

	})

		.state('history', {
		url: '/history',
	    templateUrl: 'templates/history.html',
		//controller: 'AppCtrl'
	})

		.state('home', {
		url: '/home',
	    templateUrl: 'templates/home.html',
		//controller: 'AppCtrl'
	})
		.state('list', {
		url: '/list',
	    templateUrl: 'templates/list.html',
		controller: 'PlaylistCtrl'
	})

		.state('gallery', {
		url: '/gallery',
	    templateUrl: 'templates/gallery.html',
		//controller: 'AppCtrl'
	})
		.state('login', {
		url: '/login',
	    templateUrl: 'templates/login.html',
		controller: 'AppCtrl'
	})
		.state('edit_admin', {
		url: '/edit_admin',
	    templateUrl: 'templates/edit_admin.html',
		controller: 'EditAdminCtrl'
	})
		.state('del', {
		url: '/del',
	    templateUrl: 'templates/del.html',
		controller: 'Ad_delCtrl'
	})


	$urlRouterProvider.otherwise('/login');
})

.controller('AppCtrl',function ($scope,$state,$ionicPopup,$http,$ionicHistory) {
  var url="http://localhost/ionic_php/";
  $scope.login={};

 $scope.doLogin=function(){
      var admin_user=$scope.login.username;
      var admin_password=$scope.login.password;
      console.log(admin_user);
      if(admin_user && admin_password){
          str=url+"login.php?username="+admin_user+"&password="+admin_password;
          $http.get(str)
            .success(function(response){

                $scope.admin=response.records;
                sessionStorage.setItem('loggedin_status',true);
                sessionStorage.setItem('loggedin_id',$scope.admin.admin_id);
                sessionStorage.setItem('loggedin_status',$scope.admin.admin_user);

                $ionicHistory.nextViewOptions({
                  disableAnimate:true,
                  disableBack:true
                })

                $ionicPopup.alert({
                  title:'ล็อกอิน',
                  template:'ยินดีต้อนรับเข้าสู่ระบบ'
                })

                $state.go('gallery',{},{location:"replace",reload:true});
            })
            .error(function(){

              $ionicPopup.alert({
                title:'ล็อกอิน',
                template:'ไม่สามารถล็อกอินได้ กรุณาตรวจสอบ'
              })
            });

      }else{
        $ionicPopup.alert({
          title:'ล็อกอิน',
          template:'กรุณากรอกข้อมูลให้ครบ'
        })

      }

  }
})

.controller('PlaylistCtrl',function($scope,$http) {
 
    $scope.datalist=[];
     $scope.url="http://localhost/ionic_php/loaddata.php";
     $http.get($scope.url)
		 .success(function(data){
		 $scope.datalist=data;
	 })
		 .error(function(data){
		 console.log("error");
});
})
.controller('AdminCtrl',function($scope,$http){
var url="http://localhost/ionic_php/";
	$scope.Admindata=[];
	 $scope.createAdmin=function(){
      var admin_user=$scope.adminData.admin_user;
      var admin_password=$scope.adminData.admin_password;
      console.log(admin_user)
	  str=url+"admin-insert.php?username="+admin_user+"&password="+admin_password;
       $http.get(str)
		.success(function(data){
		if(data==true)
		console.log("OK");
	})
		.error(function(data){
		console.log("Erorr");
	});
	
	
	}
})
.controller('EditAdminCtrl',function($scope,$http){
  var url="http://localhost/ionic_php/";
$scope.EditAdminData=[];
$scope.editadmin=function(){
  var admin_id=$scope.EditAdminData.editadmin.id;
  var admin_user=$scope.EditAdminData.editadmin.username;
  var admin_password=$scope.EditAdminData.editadmin.password;
  console.log(admin_user);
str=url+"admin-edit.php?id="+admin_id+"&username="+ admin_user+"&password="+admin_password;
$http.get(str)
.success(function(data){
  if(data == true){
    console.log("OK");
  }
})
.error(function(data){
  console.log("Error");
});
}
})

.controller('PlaylistCtrl',function($scope){
	$scope.datalist=[
	{fname:"Mai",lname:"Black",pic:"img/1.jpg"},
	{fname:"Chelsae",lname:"cfc",pic:"img/2.jpg"},
	{fname:"Chelsae",lname:"cfc",pic:"img/3.jpg"},
	{fname:"Chelsae",lname:"cfc",pic:"img/4.jpg"},
	{fname:"Chelsae",lname:"cfc",pic:"img/5.jpg"}

];
})

.controller('Ad_delCtrl',function ($scope,$state,$ionicPopup,$http,$ionicHistory) {
  var url="http://localhost/ionic_php/";
  $scope.del={};

    $scope.delAdmin=function(){
    var admin_id = $scope.adminDel.admin_id;



    if( admin_id ){
      str= url + "admin-del.php?user=" + admin_id + "&id=" + admin_id;

      $http.get(str)
      .success(function(response){

        if(response==true){

          $ionicPopup.alert({
            title:'Deleted Completed',
            template:' OK Delete'
          });
          $state.go('tab.admin',[],{location:"replace",reload:true});

        }else{

          $ionicPopup.alert({
            title:'Can not delete data',
            template:'NOT Delete'
          });
          $state.go('tab.admin-admin',[],{location:"replace",reload:true});

        }

      }).error(function(){

        $ionicPopup.alert({
          title:'ข้อมูลผู้ดูแลระบบ',
          template:'ไม่สามารถทำการติดต่อเซิร์ฟเวอร์ได้'
        });

      })

    }else{

      $ionicPopup.alert({
        title:'ข้อมูลผู้ดูแลระบบ',
        template:'กรุณากรอกข้อมูลให้ครบ'
      });

    }

  };
  })