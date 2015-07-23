(function() {
    var SortingCtrl = function ($scope, $document, RegisterService, SortingService) {
        // $scope.testSlider = 100;
        $scope.canvasWidth = 100;
        $scope.canvasHeight = 100;
        $scope.editStates = {
            n: false,
            colors: false,
            speed: false,
            algorithm: false
        };
        $scope.speed = 20;
        $scope.N = null;
        $scope.algorithm = 'selectionSort';
        $scope.swapped = false;
        $scope.squareWidth = 10;
        $scope.depth = 'full';
        $scope.comparing = {
            block1: null,
            block2: null
        }
        $scope.swapping = {
            block1: null,
            block2: null
        }
        $scope.configVals = 'random';
        $scope.smallestElement = 0;
    
    	// window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        window.requestAnimFrame = (function(){
            return      function( callback ){
                            window.setTimeout(callback, $scope.speed);
                        };
        })();   
    	var canvas = $document.find('canvas')[0];
        canvas.width  = window.innerWidth;
        canvas.height = 1000;
    	$scope.ctx = canvas.getContext('2d');
        $scope.colorScheme = 'grayscale';
        // $scope.ctx.scale(2,2);

        $scope.resizeCanvas = function(element){
            $scope.canvasWidth = element[0].clientWidth;
            // $scope.canvasHeight = element[0].clientHeight;
        }
        $scope.initSizes = function(){
            var element = document.getElementById('sort-canvas');
            $scope.canvasWidth = element.clientWidth;
            $scope.canvasHeight = element.clientHeight;
        }
        $scope.showNav = function(control){
            if(control === 'n'){
                $scope.editStates.n = true;  
            } else if (control === 'colors'){
                $scope.editStates.colors = true;
            } else if (control === 'speed'){
                $scope.editStates.speed = true;
            } else if (control === 'algorithm'){
                $scope.editStates.algorithm = true;
            }
        }
        $scope.hideNav = function(control){
            if(control === 'n'){
                $scope.editStates.n = false;  
            } else if (control === 'colors'){
                $scope.editStates.colors = false;
            } else if (control === 'speed'){
                $scope.editStates.speed = false;
            } else if (control === 'algorithm'){
                $scope.editStates.algorithm = false;
            }
        }
        $scope.changeDepth = function(depth){
            $scope.depth = depth;
        }

        $scope.changeN = function(N){
            // SortingService.resetRegisterSorted();
            $scope.N = N;
            $scope.squareWidth = canvas.width / $scope.N; 
            $scope.position = 0;
            RegisterService.clearRegisters();
            RegisterService.createRegister([$scope.N, $scope.configVals, $scope.algorithm, $scope.speed, $scope.colorScheme, $scope.squareWidth, $scope.depth]);
            $scope.ctx.clearRect(0, 0, canvas.width, canvas.height);
            $scope.drawloop();
            // start new sort   
        }
        $scope.changeColor = function(color){
            // SortingService.resetRegisterSorted();
            $scope.colorScheme = color;
            $scope.squareWidth = canvas.width / $scope.N; 
            $scope.position = 0;
            RegisterService.clearRegisters();
            RegisterService.createRegister([$scope.N, $scope.configVals, $scope.algorithm, $scope.speed, $scope.colorScheme, $scope.squareWidth, $scope.depth]);
            $scope.ctx.clearRect(0, 0, canvas.width, canvas.height);
            $scope.drawloop();
            // start new sort   
        }
        $scope.changeSpeed = function(speed){
            $scope.speed = speed;
            if(RegisterService.getState('sorted')===true){
                SortingService.resetRegisterSorted();
                $scope.squareWidth = canvas.width / $scope.N; 
                $scope.position = 0;
                RegisterService.clearRegisters();
                var args = [
                    $scope.N,
                    $scope.configVals,
                    $scope.algorithm,
                    $scope.speed,
                    $scope.colorScheme,
                    $scope.squareWidth,
                    $scope.depth,
                    $scope.ctx,
                    $scope.smallestElement
                ];
                RegisterService.createRegister(args);
                $scope.ctx.clearRect(0, 0, canvas.width, canvas.height);
                window.requestAnimFrame($scope.drawloop);    
                // start new sort
            } else {

                $scope.squareWidth = canvas.width / $scope.N; 
                $scope.position = 0;
                RegisterService.clearRegisters();
                RegisterService.createRegister([$scope.N, $scope.configVals, $scope.algorithm, $scope.speed, $scope.colorScheme, $scope.squareWidth, $scope.depth]);
                $scope.ctx.clearRect(0, 0, canvas.width, canvas.height);
                $scope.drawloop();
            }
            
        }
         $scope.changeAlgorithm = function(algorithm){
            $scope.algorithm = algorithm;
            // SortingService.resetRegisterSorted();
            $scope.squareWidth = canvas.width / $scope.N; 
            $scope.position = 0;
            RegisterService.clearRegisters();
            RegisterService.createRegister([$scope.N, $scope.configVals, $scope.algorithm, $scope.speed, $scope.colorScheme, $scope.squareWidth, $scope.depth]);
            $scope.ctx.clearRect(0, 0, canvas.width, canvas.height);
            window.requestAnimFrame($scope.drawloop);
            // start new sort
        }
        $scope.sort = function(regNumber){
            var sortArgs = [
                $scope.algorithm,
                $scope.swapped,
                $scope.squareWidth,
                $scope.depth,
                $scope.comparing,
                $scope.swapping,
                $scope.speed,
                $scope.colorScheme,
                $scope.ctx,
                $scope.position
            ]
            RegisterService.sort(0, [sortArgs]);

        }

        //requestanimationframe definition

        //draw loop
        $scope.drawloop = function(){
            
            // call the sort method of RegisterService, which will draw one frame depending on parameters contained in RegisterService
        
            //determine if the animation should continue or terminate
            // if(RegisterService.getState('sorted') === false){   \ 
            
            // if(RegisterService.getState('sorted') === false){
            // console.log(RegisterService.getState('outerIndex'));    
            if(RegisterService.getState('sorted') != true){    

                $scope.sort();
                window.requestAnimFrame($scope.drawloop);
            } else {
               return;
            }   
        }
        // $scope.terminate = function(){
        //     return true;
        //         // return (1==1) || false;
        // }

        $scope.initSizes();

        var createArgs = [
            $scope.N,
            $scope.configVals,
            $scope.algorithm,
            $scope.speed,
            $scope.colorScheme,
            $scope.squareWidth,
            $scope.depth,
            $scope.ctx,
            $scope.smallestElement
        ];

        RegisterService.createRegister(createArgs);
        $scope.changeN(50);

     
    };

    //handle DI to avoid minification errors
    SortingCtrl.$inject = ['$scope', '$document', 'RegisterService', 'SortingService'];
    //define the controller in angular
    angular.module('sortingApp').controller('SortingCtrl', SortingCtrl);
}());