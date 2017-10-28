angular.module('REEDLING.COUNTRY', ['ngAnimate', 'ui.bootstrap']);
angular.module('REEDLING.COUNTRY').controller('CountryCtrl', function($scope, $http) {
  
  var countryCtrl = this;

$scope.countries = {};

    // Get all countries
    $http.get('/api/v1/countries')
        .success(function(data) {
            $scope.countries = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

  countryCtrl.add=function(country){
    console.log($scope.country);
    var value = {name:$scope.country};
    $scope.countries.push(value);

    $http.post('api/v1/country',value)
      .success(function(data){
        console.log("MN data"+data);
      })
      .error(function(error){
        console.log('Error: '+ error);
      });

    $scope.country = undefined;
  };
  $scope.country = undefined;
});

