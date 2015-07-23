
app.directive('draggable', ['$document', function($document) {
  return {
    scope:{
        getNodes:   '&',
        moveNode:   '&'
    },
    link: function(scope, element, attr) {
      
      // var tempNodes = scope.getNodes();
      
      var nodeid = attr.nodeid;
          startX = 0,  
          startY = 0,
          x = 0,
          y = 0;
          
      element.css({
       position: 'relative',
       border: '1px solid red',
       backgroundColor: 'lightgrey',
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
        console.log(scope.getNodes());
        y = event.pageY - startY;
        x = event.pageX - startX;
        // if(nodeid === 1){
          // scope.$emit('nodeMoved',{ id: nodeid, xpos: x, ypos: y });
        // console.log(nodeid);  
        scope.moveNode(nodeid, x, y);
        // }
        // if(event.srcElement.attributes.nodeid.nodeValue!== undefined){
        //   mnodeid = event.srcElement.attributes.nodeid.nodeValue;
        //   scope.$emit('nodeMoved',{ id: nodeid, xpos: x, ypos: y });
        // }
        
        element.css({
          top: y + 'px',
          left:  x + 'px',
        });        
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);

