var metricsCellTmpl = '<div class="ui-grid-cell-contents"><div class="status-block {{row.entity.metrics.class}}"><div class="progress-bar" style="width: {{row.entity.metrics.progress}}%"></div></div></div>';
var buildCellTmpl = '<div class="ui-grid-cell-contents"><div class="status-block {{row.entity.build.class}}"><div class="progress-bar" style="width: {{row.entity.build.progress}}%"></div></div></div>';
var utCellTmpl = '<div class="ui-grid-cell-contents"><div class="status-block {{row.entity.ut.class}}"><div class="progress-bar" style="width: {{row.entity.ut.progress}}%"></div></div></div>';
var ftCellTmpl = '<div class="ui-grid-cell-contents"><div class="status-block {{row.entity.ft.class}}"><div class="progress-bar" style="width: {{row.entity.ft.progress}}%"></div></div></div>';
var changeListCellTmpl = '<div class="ui-grid-cell-contents"><div class="build-type-icon {{row.entity.req_type}}"></div><span class="build-type-label">{{row.entity.req_name}}</span>';




angular.module('angularApp').controller('GridCtrl',
  ['$scope', '$http', '$log', '$templateCache', 'GridDataService', 'uiGridConstants', '$uibModal',
  function ($scope, $http, $log, $templateCache, GridDataService, uiGridConstants, $uibModal) {

    'use strict';

    $templateCache.put('ui-grid/expandableRow',
      "<div ui-grid-expandable-row ng-if=\"expandableRow.shouldRenderExpand()\" class=\"expandableRow\" ng-class=\"[row.entity.stateInfo.type]\" style=\"float:left; margin-top: 0px; margin-bottom: 1px\" ng-style=\"{width: (grid.renderContainers.body.getCanvasWidth()) + 'px', height: row.expandedRowHeight + 'px'}\"></div>"
    );

    $templateCache.put('ui-grid/uiGridViewport',
      "<div role=\"rowgroup\" class=\"ui-grid-viewport\" ng-style=\"colContainer.getViewportStyle()\"><!-- tbody --><div class=\"ui-grid-canvas\"><div ng-repeat=\"(rowRenderIndex, row) in rowContainer.renderedRows track by $index\" class=\"ui-grid-row\" ng-class=\"{'row-expanded': row.isExpanded}\" ng-style=\"Viewport.rowStyle(rowRenderIndex)\"><div role=\"row\" ui-grid-row=\"row\" row-render-index=\"rowRenderIndex\"></div></div></div></div>"
    );

    $scope.gridOptions = {
      enableSorting: false,
      enableColumnMenus: false,
      expandableRowTemplate: 'views/rowexpandtmpl.html',
      expandableRowHeight: 210,
      selectionRowHeaderWidth: 35,
      enableExpandableRowHeader: false,
      enableMinHeightCheck: false,
      enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
      enableVerticalScrollbar : uiGridConstants.scrollbars.NEVER,
      rowHeight: 45,
      onRegisterApi: function (gridApi){
        $scope.gridApi = gridApi;
      },
      appScopeProvider: {
        onClick : function(grid, row) {
          grid.api.expandable.toggleRowExpansion(row.entity);
        }
      },
      rowTemplate: "<div ng-click=\"grid.appScope.onClick(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"[{ 'ui-grid-row-header-cell': col.isRowHeader, 'row-expanded': row.isExpanded }, row.entity.stateInfo.type]\" ui-grid-cell ></div></div>"
    }

    $scope.$on('metrics_box_clicked', function(e) {
      e.stopPropagation();

      var row = e.targetScope.row;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/detailsviewmodaltmpl.html',
        controller: 'DetailViewCtrl',
        resolve: {
          data: function(){
            return {
              box: 'Metrics',
              row: row
            }
          }
        }
      });

    });

    $scope.$on('build_box_clicked', function(e) {
      e.stopPropagation();

      var row = e.targetScope.row;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/detailsviewmodaltmpl.html',
        controller: 'DetailViewCtrl',
        resolve: {
          data: function(){
            return {
              box: 'Build',
              row: row
            }
          }
        }
      });
    });

    $scope.$on('ut_box_clicked', function(e) {
      e.stopPropagation();

      var row = e.targetScope.row;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/detailsviewmodaltmpl.html',
        controller: 'DetailViewCtrl',
        resolve: {
          data: function(){
            return {
              box: 'Unit Test',
              row: row
            }
          }
        }
      });
    });
    $scope.$on('ft_box_clicked', function(e) {
      e.stopPropagation();

      var row = e.targetScope.row;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/detailsviewmodaltmpl.html',
        controller: 'DetailViewCtrl',
        resolve: {
          data: function(){
            return {
              box: 'Functional Test',
              row: row
            }
          }
        }
      });
    });
    $scope.gridOptions.columnDefs = [
      {
        name: 'Changelist / Build',
        field: 'req_name',
        cellTemplate: changeListCellTmpl,
        cellClass: 'req-name-cell',
        width: 200
      },
      {
        name: 'Owner',
        field: 'ownerName'
      },
      {
        name: 'Time Started',
        field: 'time_started',
        type: 'date',
        cellClass: 'time-started-cell',
        cellFilter: 'date:"MM/dd/yyyy HH:mma"',
        width:200
      },
      {
        name: 'State',
        field: 'stateName',
        cellClass: 'state-cell'
      },
      {
        name: 'Metrics',
        field: 'metrics',
        width: 100,
        cellTemplate: metricsCellTmpl
      },
      {
        name: 'Build',
        field: 'build',
        width: 100,
        cellTemplate: buildCellTmpl
      },
      {
        name: 'Unit Test',
        field: 'ut',
        width: 100,
        cellTemplate: utCellTmpl
      },
      {
        name: 'Functional Test',
        field: 'ft',
        width: 150,
        cellTemplate: ftCellTmpl
      }
    ];


    GridDataService.getData().then( function( res ){
      $scope.gridOptions.data = res.data;
    });
}]);
