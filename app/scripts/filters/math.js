angular.module('angularApp').filter('abs', function() {
    return function(input) {
        return Math.abs(input);
    };
});
