angular.module('REEDLING.REPORTQUERY', ['ngAnimate', 'ui.bootstrap']);
angular.module('REEDLING.REPORTQUERY').controller('ReportQueryCtrl', function($scope, $http) {
  var reportQueryCtrl = this;

$scope.speciesList = {};
$scope.locations = {};
$scope.countries = {};
$scope.taxons = {};
$scope.taxon = undefined;
$scope.reportOptions = ['First Observation Only','All Observations'];
$scope.selectedOption = 'First Observation Only';

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
    var value = {fromDate:JSON.stringify($scope.fromDate),toDate:JSON.stringify($scope.toDate),location:$scope.location,country:$scope.country,taxon:$scope.taxon,option:$scope.selectedOption};
    console.log(value);
        $http.post('api/v1/report',value)
      .success(function(data){
        console.log('success');
        $scope.speciesList=data;
      })
      .error(function(error){
        console.log('Error: '+ error);
      });
}

$scope.setThisYear = function(){
    console.log('In setThisYear');
    $scope.fromDate = new Date(2017,0,1);
}


$scope.speciesClick = function(index) {
  console.log("speciesClick"+index);
   $scope.speciesList[index].opened = ! $scope.speciesList[index].opened;
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
    minDate: new Date(1970,1,1),
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
    $http.get('/api/v1/locations')
        .success(function(data) {
            $scope.locations = data;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });



    $http.get('/api/v1/countries')
        .success(function(data) {
            $scope.countries = data;
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


  reportQueryCtrl.post=function(){
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


  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.selected = undefined;
  $scope.location = undefined;
  $scope.country = undefined;
  $scope.isCollapsed=true;
});

