angular.module('starter.directives', [])
.directive('grid', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/grid.html',
    link: function(scope){
      const GRID_WIDTH = 20;
      const GRID_HEIGHT = 20;

      scope.grid = [];

      for (let i = 0; i < GRID_HEIGHT; i++){
        let row = [];
        for (let j = 0; j < GRID_WIDTH; j ++){
          row.push(`${i}-${j}`)
        }
        scope.grid.push(row);
      }
    }
  }
})
.directive('cell', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/cell.html',
    scope: {
      marker: '=',
      isAlive: '='
    },
    link: function(scope){
    }
  }
})
