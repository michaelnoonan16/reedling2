angular.module('REEDLING.OBSERVATION', ['ngAnimate','ngRoute', 'ui.bootstrap']);
angular.module('REEDLING.OBSERVATION').controller('ObservationCtrl', function($routeParams,$scope, $http,$location,$window) {

var observationCtrl = this;

var observationId = $routeParams.observationId;
if(typeof observationId ==="string") {
  console.log("observation id="+observationId);
  $scope.observationId=observationId;
}
$scope.date = undefined;
$scope.notes = undefined;
$scope.name = undefined;
$scope.commonname = undefined;
$scope.heardonly = undefined;
$scope.checklistlist={};
$scope.selectedChecklist = undefined;
$scope.selectedId=undefined;
$scope.locations = {};
$scope.taxons = {};


if(typeof observationId ==='string') {
      console.log('Observation'+$scope.observationId);
  $http.get('/api/v1/observation/'+$scope.observationId)
    .success(function(data) {
      $scope.date=new Date(data[0].date);
      $scope.name=data[0].name;
      $scope.nates=data[0].notes;
      $scope.commonname=data[0].commonname;
      $scope.heardonly=data[0].heardonly;
    })
    .error(function(error) {
      console.log('Error: ' + error);
    });          
} 

$scope.format = 'dd-MMMM-yyyy';

 $scope.dateOptions = {
 //   dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(1970,1,1),
    startingDay: 1
  };
  
 $scope.open1 = function() {
    console.log('In open1');
    $scope.popup1.opened = true;
  };

  $scope.popup1 = {
    opened: false
  };


if(typeof observationId ==='string') {
      console.log('Observation'+$scope.observationId);
  $http.get('/api/v1/observation/'+$scope.observationId)
    .success(function(data) {
      $scope.date=new Date(data[0].date);
      $scope.notes=data[0].notes;
      $scope.name=data[0].name;
      $scope.commonname=data[0].commonname;
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

observationCtrl.cancel=function() {
  console.log("User details cancel");
  $location.path("/");
}

    // Get all locations
$http.get('/api/v1/locations')
    .success(function(data) {
        $scope.locations = data;
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });

$http.get('/api/v1/taxon')
  .success(function(data){
    $scope.taxons = data;
  })
  .error(function(error) {
    console.log('Error: ' + error);
  });

observationCtrl.deleteObservation=function(observation){
  $http.delete('api/v1/observation/'+$scope.observationId)
    .success(function(data){
    })
    .error(function(error){
      console.log('Error: '+ error);
    });
    $window.location.href="/";
  };


observationCtrl.update=function(observation){
  console.log("in update");
  var observationValue={date:$scope.date,name:$scope.name,commonname:$scope.commonname,heardonly:$scope.heardonly};
  $http.put('api/v1/observation/'+$scope.observationId,observationValue)
    .success(function(data){
        console.log("in sucess");
    })
    .error(function(error){
        console.log("in error");
      console.log('Error: '+ error);
    });
    $window.location.href="/#reports";
  };
});

