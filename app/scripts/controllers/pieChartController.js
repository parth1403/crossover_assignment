angular.module('angularApp').controller('PieChartCtrl',
  ['$scope', '$http', '$log', 'GridDataService',
  function ($scope, $http, $log, GridDataService) {

    $scope.init = function init( rowData, facet ){
      renderChart( rowData, facet, $scope);
    }


    function renderChart( chartData, facet, scope ){
      var succeed = chartData.details_data[facet].succeed
        ,failed   = chartData.details_data[facet].total - succeed
        ;

      scope.options = {
          chart: {
              type: 'pieChart',
              height: 170,
              width: 150,
              x: function(d){return d.key;},
              y: function(d){return d.y;},
              showLabels: true,
              showLegend: false,
              duration: 500,
              labelSunbeamLayout: false,
              color: ['#EB7D3B','#72AC4D'],
              startAngle: function(d) {
                return d.startAngle + Math.PI/4;

              },
              endAngle: function(d){
                return d.endAngle + Math.PI / 4;
              }
          }
      };

      scope.data = [
          {
              key: failed,
              y: failed
          },
          {
              key: succeed,
              y: succeed
          }
      ];
    }
}]);
