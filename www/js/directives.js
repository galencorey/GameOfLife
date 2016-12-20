angular.module('starter.directives', [])
.directive('grid', function(GridFactory){
  return {
    restrict: 'E',
    templateUrl: '/templates/grid.html',
    link: function(scope){
      scope.grid = GridFactory.makeGrid(20,20);
      scope.alive = [];

      scope.cellClick = function(cell){
        if (scope.alive.map(c => c.marker).includes(cell.marker)){
          scope.alive = scope.alive.filter(aliveCell => aliveCell.marker !== cell.marker);
        } else {
          scope.alive.push(cell)
        }
      }

      scope.isAlive  = function(cellMarker){
        return scope.alive.map(cell => cell.marker).includes(cellMarker);
      }

      scope.$on('update state', function(){
         scope.alive = GridFactory.getNextState(scope.alive, scope.grid)
      })

      scope.$on('clear board', function(){
        scope.alive = [];
      })

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
          const neighbors =[[i - 1, j - 1], [i - 1, j], [i - 1, j + 1], [i , j + 1], [i , j - 1], [i + 1 , j + 1], [i + 1, j], [i + 1, j - 1]]
          .filter(([a, b]) => a >= 0 && b >=0)
          .map(([a, b]) => `${a}-${b}`)

          row.push({marker: `${i}-${j}`, neighbors})
        }
        grid.push(row);
      }
      return grid;
    },

    getNextState: function(currState, grid){
      let nextState = [];
      grid.forEach(function(row){
        row.forEach(function(cell){
          const livingNeighborsCount = cell.neighbors.filter((neighbor)=>{
            return currState.map(cell => cell.marker).includes(neighbor)
          }).length;
          if (livingNeighborsCount === 3){
            nextState.push(cell)
          } else if (livingNeighborsCount === 2 && currState.includes(cell)) {
            nextState.push(cell)
          }
        })
      })
      return nextState;
    }

  }
})
