angular.module('REEDLING.LOCATION', ['ngAnimate', 'ui.bootstrap']);
angular.module('REEDLING.LOCATION').controller('LocationCtrl', function($scope, $http) {
  var locationCtrl = this;

$scope.checklistitems = {};
$scope.locations = {};
$scope.parents = {};
$scope.countries = {};

    // Get all checklistitems
    $http.get('/api/v1/checklistitems')
        .success(function(data) {
            $scope.checklistitems = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

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


  locationCtrl.post=function(){
    console.log('ho from post');
 //   console.log(typeahead.visit.sightings.species);
//    console.log($scope.selected);
//    typeahead.visit.sightings.species.push({name:$scope.selected});
    console.log(locationCtrl.visit);
 
  };

  locationCtrl.add=function(location,country){
    console.log($scope.selected);
    console.log($scope.location);
    console.log($scope.country);
    var value = {locname:$scope.location,cname:$scope.country,parent:$scope.parent};
    $scope.locations.push(value);

    $http.post('api/v1/location',value)
      .success(function(data){
        console.log("MN data"+data);
      })
      .error(function(error){
        console.log('Error: '+ error);
      });

    $scope.selected = undefined;
    $scope.location = undefined;
    $scope.country = undefined;
    $scope.parent = undefined;
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

locationCtrl.sendObs=function(){
    console.log('ho from post');
    console.log(locationCtrl.visit);
    $http.post('api/v1/sitevisit',locationCtrl.visit)
      .success(function(data){
        console.log(data);
      })
      .error(function(error){
        console.log('Error: '+ error);
      });
  };


      // Create a new todo
    $scope.createTodo = function(todoID) {
        $http.post('/api/v1/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todoData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };


	
	locationCtrl.new = function() {
		console.log('new...');
		$scope.isCollapsed=false;
		locationCtrl.visit.sightings.species=[];
		locationCtrl.visit.location=null;
    locationCtrl.visit.date=new Date();
	};

  $scope.selected = undefined;
  $scope.location = undefined;
  $scope.country = undefined;
  $scope.isCollapsed=true;
});

