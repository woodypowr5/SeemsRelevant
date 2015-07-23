(function() {
    

    var MainCtrl = function ($scope) {
        $scope.nodes = [];
        $scope.paths = [];
    	 	
        // instantiate and initialize new node/path with provided values    
        $scope.createNode = function(id, status, requires, xpos, ypos){
    		var currentNode = new node(id,status,requires, xpos, ypos);
    		$scope.nodes.push(currentNode);
    	}
        $scope.createPath = function(id, status, startNode, endNode, requiredTime){
            var currentPath = new path(id, status, startNode, endNode, requiredTime);
            $scope.paths.push(currentPath);
        }

        $scope.getNodes = function(){
            console.log("ran");
            return $scope.nodes;
        }

        // update scope with new x and y coordinates
        $scope.moveNode = function(id, xpos, ypos){
            $scope.nodes[id].xpos = xpos;
            $scope.nodes[id].ypos = ypos;
            $scope.$apply();
        }
        $scope.movePath = function(id, xpos1, ypos1, xpos2, ypos2){
            $scope.nodes[id].xpos = xpos;
            $scope.nodes[id].ypos = ypos;
            $scope.$apply();
        }

        // wait for nodeMoved event to fire and call $scope.moveNode() with the new coordinates
        $scope.$on('nodeMoved', function(event, args) { 
            // console.log(args.id);
            var id = args.id;
            var xpos = args.xpos;
            var ypos = args.ypos;
            $scope.moveNode(id, xpos, ypos);
        });
        
        $scope.createNode(0,2,[1,2], 40, 30);
        $scope.createNode(1,4,[1,2], 90, 130);
        // console.log($scope);

    };

    //handle DI to avoid minification errors
    MainCtrl.$inject = ['$scope'];
    //define the controller in angular
    angular.module('sortingApp').controller('MainCtrl', MainCtrl);
}());