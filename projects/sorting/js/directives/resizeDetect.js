app.directive('resizeDetect', function($window) {
  return {
    link: function(scope, element, attributes) {
      angular.element($window).on('resize', function(e) {

        scope.$apply(function () {
            //then call on each resize. The resize function in the parent ctrl deals with specifics to that element. Resize passes id, width and height of resized element
            scope.resizeCanvas(element); 
            // scope.viewInit(elementId);
        }); 
      });
    }
  };
});