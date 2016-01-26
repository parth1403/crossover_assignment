'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.grid',
    'ui.grid.expandable',
    'ui.grid.selection',
    'ui.grid.autoResize',
    // 'ui.grid.pinning',
    'nvd3',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/grid.html',
        controller: 'GridCtrl',
        controllerAs: 'grid'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
