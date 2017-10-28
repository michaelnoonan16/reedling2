angular.module('REEDLING.USER', ['ngAnimate','ngRoute', 'ui.bootstrap']);
angular.module('REEDLING.USER').controller('UserCtrl', function($routeParams,$scope, $http,$location,$window) {

var userCtrl = this;

var userId = $routeParams.userId;
if(typeof userId ==="string") {
  console.log("user id="+userId);
  $scope.userId=userId;
}
$scope.email = undefined;
$scope.fullname = undefined;
$scope.isadmin = undefined;
$scope.password = undefined;
$scope.checklistlist={};
$scope.selectedChecklist = undefined;
$scope.selectedId=undefined;

if(typeof userId ==='string') {
      console.log('User'+$scope.userId);
  $http.get('/api/v1/user/'+$scope.userId)
    .success(function(data) {
      $scope.email=data[0].email;
      $scope.fullname=data[0].fullname;
      $scope.isadmin=data[0].isadmin;
      $scope.password=data[0].password;
      $scope.selectedId=data[0].defaultchecklistname_id;
    })
    .error(function(error) {
      console.log('Error: ' + error);
    });          
} 

$http.get('/api/v1/checklist')
    .success(function(clData) {
        $scope.checklistlist = clData;
        var arrayLength = $scope.checklistlist.length;
        var i;
        for(i=0;i<arrayLength;i++)
        {
          if($scope.checklistlist[i].id==$scope.selectedId)
          {
            $scope.selectedChecklist=$scope.checklistlist[i];
          }
        }
  })
    .error(function(error) {
        console.log('Error: ' + error);
  });

userCtrl.cancel=function() {
  console.log("User details cancel");
  $location.path("/users");
}

userCtrl.update=function(user){
  var userValue={id:$scope.userId,email:$scope.email,fullname:$scope.fullname,isadmin:$scope.isadmin,password:$scope.password,defaultchecklistname_id:$scope.selectedChecklist.id};
  $http.put('api/v1/user/'+$scope.userId,userValue)
    .success(function(data){
    })
    .error(function(error){
      console.log('Error: '+ error);
    });
    $window.location.href="/#/users";
  };
});

