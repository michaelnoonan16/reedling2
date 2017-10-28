angular.module('REEDLING.SITEVISIT', ['ngAnimate','ngRoute', 'ui.bootstrap']);
angular.module('REEDLING.SITEVISIT').controller('TypeaheadCtrl', function($routeParams,$scope, $http) {

var typeahead = this;

var siteVisitId = $routeParams.sitevisitId;
if(typeof siteVisitId ==="string") {
  console.log("site visit id="+siteVisitId);
  $scope.visitId=siteVisitId;
  typeahead.visitId=siteVisitId;
}
$scope.checklistitems = {};
$scope.locations = {};

    // Get all checklistitems
$http.get('/api/v1/checklistitems')
    .success(function(data) {
        $scope.checklistitems = data;
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });

    // Get all locations
$http.get('/api/v1/locations')
    .success(function(data) {
        $scope.locations = data;
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });

if(typeof siteVisitId ==='string') {
  $http.get('/api/v1/sitevisit/'+siteVisitId)
    .success(function(data) {
      console.log('loading sitevisit');
      typeahead.visit.sightings.species = data;
      console.log('locname='+data[0].locname);
      typeahead.visit.location=data[0].locname;
      console.log('visit date:'+data[0].date)
      typeahead.visit.date=new Date(data[0].date);
      console.log('end');
      typeahead.visit.showNew=false;
    })
    .error(function(error) {
      console.log('Error: ' + error);
    });          
} 

typeahead.post=function(){
    console.log('ho from post');
    console.log(typeahead.visit);
};

typeahead.add=function(selected){
    console.log($scope.selected);
    console.log($scope.heardOnly);
    typeahead.visit.visitId=$scope.visitId;
    typeahead.visit.heardOnly=$scope.heardOnly==true?true:false;
    console.log(typeahead.visit.visitId);
    typeahead.visit.sightings.species.push({speciesname:$scope.selected});
    typeahead.sendObs();
    $scope.selected = undefined;
    $scope.heardOnly = undefined;
};

   typeahead.visit={
    date: new Date(),
    showNew: true,
    location: 'Stepaside Area',
    sightings:
    {
      species:[
//        {speciesname:'Pied-billed Grebe'},
//        {speciesname:'Little Grebe'}
        ] 
    }
  };

$scope.today = function() {
    $scope.dt = new Date();
};
$scope.today();

typeahead.showSpeciesDetails=function(selected) {
  console.log('showSpeciesDetails'+selected);
  typeahead.visit.sightings.species[selected].opened = ! typeahead.visit.sightings.species[selected].opened;
}

  $scope.showSpeciesDetails = {
    opened: false
  };

typeahead.sendObs=function(){
    console.log('ho from post');
    console.log(typeahead.visit);
    $http.post('api/v1/observation',typeahead.visit)
      .success(function(data){
        console.log(data);
//        typeahead.visit=data;
      })
      .error(function(error){
        console.log('Error: '+ error);
      });
};


typeahead.deleteSiteVisit=function(){
    console.log('Delete site visit'+siteVisitId);
    console.log(typeahead.visit);
    $http.delete('api/v1/sitevisit/'+siteVisitId)
      .success(function(data){
        console.log(data);
      })
      .error(function(error){
        console.log('Error: '+ error);
      });
       $window.location.href="/";
};



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

	typeahead.new = function() {
		console.log('new...');
		$scope.isCollapsed=false;
		typeahead.visit.sightings.species=[];
		typeahead.visit.location=null;
    typeahead.visit.date=new Date();
	};

typeahead.saveVisit = function() {
    console.log('saveVisit...');
    $scope.isCollapsed=true;
    $http.post('api/v1/sitevisit',typeahead.visit)
  .success(function(data){
    console.log("Data Back"+data);
     $scope.visitId=data[0].id;
  })
  .error(function(error){
    console.log('Error: '+ error);
  });
  };

  $scope.selected = undefined;
  $scope.location = undefined;
  $scope.heardOnly = undefined;
  $scope.isCollapsed=true;
  //
 $scope.open1 = function() {
    console.log('In open1');
    $scope.popup1.opened = true;
  };

  $scope.popup1 = {
    opened: false
  };
});

