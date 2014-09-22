angular.module( 'App', ['ngTranscludeMod'] )

.directive( 'transcludeSibling', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        template: 
            '<div>' +
                '<p>I am a directive with scope <id>{{$id}}</id></p>' +
                '<span ng-transclude></span>' +
            '</div>'
    }
})

.directive( 'transcludeParent', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        template: 
            '<div>' +
                '<p>I am a directive with scope <id>{{$id}}</id></p>' +
                '<span ng-transclude="parent"></span>' +
            '</div>'
    }
})

.directive( 'transcludeChild', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        template: 
            '<div>' +
                '<p>I am a directive with scope <id>{{$id}}</id></p>' +
                '<span ng-transclude="child"></span>' +
            '</div>'
    }
});

