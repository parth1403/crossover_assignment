angular.module('angularApp').controller('DetailViewCtrl',
  ['$scope', '$uibModalInstance', 'data',
function ($scope, $uibModalInstance, data) {
  'use strict';


  $scope.data = data;

  $scope.ok = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);
