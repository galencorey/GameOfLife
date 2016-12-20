angular.module('starter.directives', [])
.directive('grid', function(GridFactory){
  return {
    restrict: 'E',
    templateUrl: '/templates/grid.html',
    link: function(scope){
      scope.grid = GridFactory.makeGrid(20,20);
      scope.alive = [];

      scope.cellClick = function(cellMarker){
        console.log("cell click called")
        if (scope.alive.includes(cellMarker)){
          scope.alive = scope.alive.filter(marker => marker !== cellMarker);
        } else {
          scope.alive.push(cellMarker)
        }
        console.log(scope.alive)
      }

      scope.isAlive  = function(cellMarker){
        return scope.alive.includes(cellMarker);
      }

    } //end link fn
  }
})
.directive('cell', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/cell.html',
    scope: {
      marker: '=',
      isAlive: '=',
      cellClick: '&'
    },
    link: function(scope){
    }
  }
})
.factory('GridFactory', function(){
  return {
    makeGrid: function(width, height){
      let grid = [];
      for (let i = 0; i < height; i++){
        let row = [];
        for (let j = 0; j < width; j ++){
          row.push(`${i}-${j}`)
        }
        grid.push(row);
      }
      return grid;
    }
  }
})
