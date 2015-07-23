app.directive( 'navLink', function() {
    return {
        restrict: 'EA',
        replace: true,
        // terminal: true,
        link: function( $scope, element, attrs ) { 
            var title = attrs.title;
            var value = attrs.value;
            
            var template = '<div ng-click="activeView = \''+value+'\'">'+title+'</div>';
            //append to DOM
            element.html(template); 
            
        },
    };
});