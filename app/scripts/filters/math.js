angular.module('angularApp').filter('abs', function() {
    'use strict';

    return function(input) {
        return Math.abs(input);
    };
});
