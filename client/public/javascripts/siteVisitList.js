angular.module('REEDLING.SITEVISITLIST', ['ngAnimate', 'ui.bootstrap']);
angular.module('REEDLING.SITEVISITLIST').controller('SiteVisitCtrl', function($scope, $http) {
  var reportQueryCtrl = this;

$scope.siteVisitList = {};
$scope.locations = {};
$scope.countries = {};

$scope.fromDate = new Date(1970,0,1);
$scope.toDate = new Date();
$scope.location = undefined;
$scope.country = undefined;

$scope.getReport = function(){
    console.log('In getReport');
    console.log($scope.fromDate);
    console.log($scope.toDate);
    console.log($scope.location);
    console.log($scope.country);
    var value = {fromDate:JSON.stringify($scope.fromDate),toDate:JSON.stringify($scope.toDate),location:$scope.location,country:$scope.country};
    console.log(value);
        $http.post('api/v1/report',value)
      .success(function(data){
        $scope.speciesList=data;
      })
      .error(function(error){
        console.log('Error: '+ error);
      });
}

$scope.showTable = function() {
  console.log('In showTable');
  if(typeof speciesList !=='undefined')
    return true;
  else
    return false;
};


 $scope.open1 = function() {
    console.log('In open1');
    $scope.popup1.opened = true;
  };

  $scope.popup1 = {
    opened: false
  };


$scope.open2 = function() {
    console.log('In open2');
    $scope.popup2.opened = true;
  };

  $scope.popup2 = {
    opened: false
  };


 $scope.dateOptions = {
 //   dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

   // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.format = 'dd-MMMM-yyyy';

    // Get all locations
    $http.get('/api/v1/sitevisit')
        .success(function(data) {
            $scope.siteVisitList = data;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });






  reportQueryCtrl.post=function(){
    console.log('ho from post');
 //   console.log(typeahead.visit.sightings.species);
//    console.log($scope.selected);
//    typeahead.visit.sightings.species.push({name:$scope.selected});
    console.log(reportQueryCtrl.visit);
 
  };

  reportQueryCtrl.add=function(location,country){
    console.log($scope.selected);
    console.log($scope.location);
    console.log($scope.country);
    var value = {locname:$scope.location,cname:$scope.country};
    $scope.locations.push(value);

    $http.post('api/v1/location',value)
      .success(function(data){
        console.log("MN data"+data);
      })
      .error(function(error){
        console.log('Error: '+ error);
      });

    $scope.selected = undefined;
    $scope.country = undefined;
  };


 $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();



  $scope.selected = undefined;
  $scope.location = undefined;
  $scope.country = undefined;
  $scope.isCollapsed=true;
});

