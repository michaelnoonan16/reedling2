angular.module('REEDLING.CHECKLIST', ['ngAnimate', 'ui.bootstrap']);
angular.module('REEDLING.CHECKLIST').controller('ChecklistCtrl', function($scope, $http) {
  var checklistCtrl = this;

$scope.checklists = {};

    $http.get('/api/v1/checklist')
        .success(function(data) {
            $scope.checklists = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

  checklistCtrl.add=function(checklist){
    console.log($scope.checklist);
    var value = {checklistname:$scope.checklist};
    $scope.checklists.push(value);

    $http.post('api/v1/checklist',value)
      .success(function(data){
        console.log("MN data"+data);
      })
      .error(function(error){
        console.log('Error: '+ error);
      });

    $scope.checklist = undefined;
  };

  $scope.checklist = undefined;
});

