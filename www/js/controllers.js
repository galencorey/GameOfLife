angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


})

.controller('PlayCtrl', function($scope) {
  const GRID_WIDTH = 20;
  const GRID_HEIGHT = 20;

  $scope.grid = [];

  for (let i = 0; i < GRID_HEIGHT; i++){
    let row = [];
    for (let j = 0; j < GRID_WIDTH; j ++){
      row.push(`${i}=${j}`)
    }
    $scope.grid.push(row);
  }


})


