angular.module('REEDLING.LOGIN', ['ngAnimate', 'ui.bootstrap']);
angular.module('REEDLING.LOGIN').controller('LoginCtrl', function($scope, $http) {
  var loginCtrl = this;

$scope.userList = {};
$scope.checklists = {};
$scope.checklist = undefined;

// Get all locations
$http.get('/api/v1/user')
    .success(function(data) {
        $scope.userList = data;
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });

});

