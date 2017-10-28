angular.module('REEDLING.LOCATIONEDIT', ['ngMap','ngAnimate','ngRoute', 'ui.bootstrap']);
angular.module('REEDLING.LOCATIONEDIT').controller('LocationEditCtrl', function(NgMap,$routeParams,$scope, $http,$location,$window) {

var locationEditCtrl = this;
console.log("Loading LocationEdit");

var locationEditId = $routeParams.locationId;
if(typeof locationEditId ==="string") {
  console.log("location id="+locationEditId);
  $scope.locationEditId=locationEditId;
}
$scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 9 };
$scope.location = undefined;
$scope.parent = undefined;
$scope.country = undefined;
$scope.lat = undefined;
$scope.long = undefined;
$scope.locations = {};
$scope.parents = {};
$scope.countries = {};
$scope.mapCentre = undefined;
$scope.zoom = 9;
$scope.marker=undefined;

var vm = this;
NgMap.getMap().then(function(map) {
  vm.map = map;
});

vm.placeMarker = function(e) {
  if($scope.marker){
    $scope.marker.setMap(null);
  }
  $scope.marker = new google.maps.Marker({position: e.latLng, map: vm.map});
  vm.map.panTo(e.latLng);
  $scope.zoom=vm.map.getZoom();
  console.log("POS:"+e.latLng+"lat"+e.latLng.lat()+"lng"+e.latLng.lng());
  $scope.lat=e.latLng.lat();
  $scope.long=e.latLng.lng();
//  $scope.$apply();
 };

vm.zoomChanged = function (e) {
  console.log("In zoomChanged");
  $scope.zoom=vm.map.getZoom();
}

// Get all locations
$http.get('/api/v1/locations')
    .success(function(data) {
        $scope.locations = data;
        console.log(data);
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });

// Get all patent locations
$http.get('/api/v1/parents')
    .success(function(data) {
        $scope.parents = data;
        console.log(data);
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });

// Get all countries
$http.get('/api/v1/countries')
    .success(function(data) {
        $scope.countries = data;
        console.log(data);
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });

if(typeof locationEditId ==='string') {
      console.log('Location '+$scope.locationEditId);
  $http.get('/api/v1/location/'+$scope.locationEditId)
    .success(function(data) {
      $scope.location=data[0].locname;
      $scope.parent=data[0].pname;
      $scope.country=data[0].cname;
      $scope.lat=data[0].latitude;
      $scope.long=data[0].longitude;
      $scope.zoom=data[0].mapzoom;
      $scope.mapCentre = $scope.lat+", "+$scope.long;
    })
    .error(function(error) {
      console.log('Error: ' + error);
    });          
} 


locationEditCtrl.Cancel=function() {
  console.log("User details cancel");
  $window.location.href="/#location";
}

locationEditCtrl.open=function() {
  console.log("open");
  $location.path("/#location");
}



    // Get all locations
$http.get('/api/v1/locations')
    .success(function(data) {
        $scope.locations = data;
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });


locationEditCtrl.update=function(){
  console.log("in update");
  var locationValue={locName:$scope.location,pname:$scope.parent,cname:$scope.country,latitude:$scope.lat,longitude:$scope.long,mapzoom:$scope.zoom};
  $http.put('api/v1/location/'+$scope.locationEditId,locationValue)
    .success(function(data){
        console.log("in sucess");
    })
    .error(function(error){
        console.log("in error");
      console.log('Error: '+ error);
    });
    $window.location.href="/#location";
  };
});

