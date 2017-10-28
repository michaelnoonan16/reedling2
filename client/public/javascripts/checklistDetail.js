angular.module('REEDLING.CHECKLISTDETAIL', ['ngAnimate', 'ui.bootstrap']);
angular.module('REEDLING.CHECKLISTDETAIL').controller('ChecklistDetailCtrl', function($scope, $http) {

var checklistDetailCtrl = this;
$scope.checklistlist = {};
$scope.selectedChecklist = undefined;
$scope.checklistitems={};
$scope.taxons = {};
$scope.taxon = undefined;
$scope.localName = undefined;


$http.get('/api/v1/checklist')
    .success(function(data) {
        $scope.checklistlist = data;
//        $scope.selectedChecklist = $scope.checklistlist[1];
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });

$http.get('/api/v1/userchecklist')
    .success(function(data) {
 //       $scope.checklistlist = data;
 for (i=0;i<$scope.checklistlist.length;i++) {
  if($scope.checklistlist[i].checklistname==data.checklistname) {
    $scope.selectedChecklist = $scope.checklistlist[i];
}
}


//        $scope.selectedChecklist = data;
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


// Get all checklistitems
$http.get('/api/v1/checklistitems/10462')
    .success(function(data) {
        $scope.checklistitems = data;
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });



  checklistDetailCtrl.post=function(){
    console.log(ChecklistDetailCtrl.visitlists  );
  };

  checklistDetailCtrl.add=function(location,country){
    var value = {taxon:$scope.taxon,checklist:$scope.selectedChecklist,localName:$scope.localName};
    console.log('value:'+value);

    if(typeof $scope.localName === 'undefined'){
        console.log('local name is undefined');
        $scope.localName=$scope.taxon;
    }


    var checklistItem = {commonname:$scope.taxon,name:$scope.localName};
    $scope.checklistitems.push(checklistItem);

    $http.post('api/v1/checklistitems',value)
      .success(function(data){
        console.log("MN data"+data);
      })
      .error(function(error){
        console.log('Error: '+ error);
          });

    $scope.taxon = undefined;
    $scope.localName = undefined;
  };

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.updateChecklist=function(){
    $http.get('/api/v1/checklistitems/'+$scope.selectedChecklist.id)
      .success(function(data) {
        $scope.checklistitems = data;
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });
  };

	checklistDetailCtrl.new = function() {
    console.log('new...');
    $scope.isCollapsed=false;
    locationCtrl.visit.sightings.species=[];
    locationCtrl.visit.location=null;
    locationCtrl.visit.date=new Date();
  };

  $scope.speciesClick = function(index) {
  console.log("speciesClick"+index);
   $scope.checklistitems[index].opened = ! $scope.checklistitems[index].opened;
}


  $scope.selected = undefined;
  $scope.location = undefined;
  $scope.country = undefined;
  $scope.isCollapsed=true;
});

