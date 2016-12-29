angular.module('starter.directives', [])
.directive('grid', function(GridFactory){
  return {
    restrict: 'E',
    templateUrl: 'templates/grid.html',
    link: function(scope){
      var gridWidth = 5;
      var gridHeight = 8;

      scope.grid = GridFactory.makeGrid(gridWidth, gridHeight);
      scope.alive = [];

      scope.cellClick = function(cell){
        console.log("cell was clicked")
        if (scope.alive.map(function(c){return c.marker}).includes(cell.marker)){
          scope.alive = scope.alive.filter(function(aliveCell){return aliveCell.marker !== cell.marker});
        } else {
          scope.alive.push(cell)
        }
        console.log(scope.alive)
      }

      scope.isAlive  = function(cellMarker){
        return scope.alive.map(function(cell){return cell.marker}).includes(cellMarker);
      }

      scope.$on('update state', function(){
         scope.alive = GridFactory.getNextState(scope.alive, scope.grid)
         if (scope.alive.length === 0){
          scope.$emit('board cleared');
         }
      })

      scope.$on('reset random', function(){
        var rand = [];
        scope.grid.forEach(function(row){
          row.forEach(function(cell){
            if (Math.random() > .7) rand.push(cell)
          })
        })
        scope.alive = rand;
      })

      scope.$on('clear board', function(){
        scope.alive = [];
      })

    } //end link fn
  }
})
.directive('cell', function($ionicGesture){
  return {
    restrict: 'E',
    templateUrl: 'templates/cell.html',
    scope: {
      marker: '=',
      isAlive: '=',
      cellClick: '&'
    },
    link: function(scope){
      console.log('inside the cell directive')

    }
  }
})
.factory('GridFactory', function(){
  return {
    makeGrid: function(width, height){
      var grid = [];
      for (var i = 0; i < height; i++){
        var row = [];
        for (var j = 0; j < width; j ++){
          var neighbors =[[i - 1, j - 1], [i - 1, j], [i - 1, j + 1], [i , j + 1], [i , j - 1], [i + 1 , j + 1], [i + 1, j], [i + 1, j - 1]]
          .filter(function(pair){
            return pair[0] >= 0 && pair[1] >=0
          })
          .map(function(pair){ return pair[0]+ '-'+ pair[1] })

          row.push({marker: i+'-'+j, neighbors})
        }
        grid.push(row);
      }
      return grid;
    },

    getNextState: function(currState, grid){
      var nextState = [];
      grid.forEach(function(row){
        row.forEach(function(cell){
          var livingNeighborsCount = cell.neighbors.filter(function(neighbor){
            return currState.map(function(cell){ return cell.marker}).includes(neighbor)
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

