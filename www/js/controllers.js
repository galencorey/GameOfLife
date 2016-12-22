angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


})

.controller('PlayCtrl', function($scope, $interval) {
  console.log('entered play ctrl')
  $scope.isPlaying = false;
  var interval = null;

  $scope.step = function(){
    $scope.$broadcast('update state');
  }

  $scope.play = function(){
    if (!$scope.isPlaying) {
      interval = $interval($scope.step, 500);
    } else {
      $interval.cancel(interval);
      interval = null;
    }
    $scope.isPlaying = !$scope.isPlaying;
  }

  $scope.clear = function(){
    console.log("clear button pressed")
    if ($scope.isPlaying){
      $interval.cancel(interval);
      interval = null;
      $scope.isPlaying = false;
    }
    $scope.$broadcast('clear board');
  }
  $scope.$on('board cleared', function(){
    if (interval){
      $interval.cancel(interval);
      interval = null;
    }
    $scope.isPlaying = false;
  })

})


