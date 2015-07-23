app.directive( 'nodeDisplay', ['$document', function() 
{
    return {
        restrict: 'EA',
        // scope: false,
        // // terminal: true,
        scope: {
            // scope:      '@',
            // node:       '@',
            // moveNode:   '&',
            // xpos:       '=',      
            // ypos:       '=',         
        },
        controller: 'MainCtrl',
        link: function( scope, element, attrs, $document) {
           // scope.$watch('scope',function(newValue,oldValue) {
           //      //This gets called when data changes.
           //  console.log("changed");

                var nodeid = attrs.nodeid;
                var node = scope.nodes[nodeid];
                var startX = scope.nodes[nodeid].xpos;
                var startY = scope.nodes[nodeid].ypos;
                      x = 0; 
                      y = 0;
                      
                  element.css({
                   position: 'relative',
                   // border: '1px solid red',
                   // backgroundColor: 'lightgrey',
                   cursor: 'pointer'
                  });

                  element.on('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                  });

                  function mousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                  
                    element.css({
                      top: y + 'px',
                      left:  x + 'px',
                    });
                    $scope.$emit('nodeMoved', nodeid, x, y);
                    
                  }

                  function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
                  }






        // });
            var nodeid = attrs.nodeid;
            var node = scope.nodes[attrs.nodeid];
            var xpos = scope.nodes[0].xpos;
            var ypos = scope.nodes[0].ypos;
            

            // build up SVG script
            var svgdef =

            ['<svg ',
                'x="30"',
                'y="30"',
                'width="100" height="100" style="border-radius: 7px; border: 4px solid gray; ">',
                '<rect ',
                    'x="0"',
                    'y="0"',
                    'rx="0" ry="0" width="100" height="100"',
                    'style="border-radius: 7px; fill:black;stroke:black;stroke-width:4;opacity:0.7" />',
                '<g text-anchor = "middle" font-size = "10" font = "sans-serif" fill="white" rotate = "0">',
                    '<text x="20" y="20">ID: {{nodes}}</text>',
                    '<text x="20" y="40">Status: {{xpos}}</text>',
                    '<text x="20" y="60">Requires: </text>',
                '</g>',
            '</svg>'].join('');
           


            // ['<svg viewBox = "0 0 '+33+' '+33+'" version = "1.1">',
                
            //     '<g text-anchor = "middle" font-size = "10" font = "sans-serif" fill="white" rotate = "0">',
            //         '<text x = "'+(0.26*33)+'" y = "'+(33-5)+'">'+34+'</text>',
            //         '<text x = "'+(0.71*33)+'" y = "'+(33-5)+'">'+123+'</text>',
            //     '</g>',
            //     '<g text-anchor = "middle" font-size = "38" font = "sans-serif" fill="'+"orange"+'" rotate = "0">',
            //         '<text x = "'+(0.5*33)+'" y = "'+(0.60*33)+'">'+33+'</text>',
            //         '</g>',
            //     '</svg>'].join('');
           




            // var svgdef = 
            //         ['<div class=\"tile-main img-prev-tile\"',
            //       '<span class=\"tile-date image-date hover-hand\" ng-click=\"dateclick(\'date\')\"");\">',
            //         '{{images[imageid].date}}',
            //       '</span>',    
            //   '</div>',
            //         '</div>'].join('');

            element.html(svgdef);         

        },
    };
}]);