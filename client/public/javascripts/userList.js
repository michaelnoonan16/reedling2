angular.module('REEDLING.USERLIST', ['ngAnimate', 'ui.bootstrap']);
angular.module('REEDLING.USERLIST').controller('UserListCtrl', function($scope, $http) {
  var reportQueryCtrl = this;

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

