app.service('RegisterService',  function (SortingService) {
	var registers 	= [];
	var defaultN	= 50; //default register length, when not provided in constructor args

	this.getState = function(key, regNumber){
		var registerNumber  = regNumber || 0;  //set regNumber to 0 if not provided
		return registers[registerNumber].state[key];
	}
	this.setState = function(key, value, regNumber){
		var registerNumber  = regNumber || 0;  //set regNumber to 0 if not provided
		registers[registerNumber].state[key] = value;
	}

	this.get = function(N){

		if(N){
			return registers[N];
		} else {
			return registers;
		}
	}

	this.createRegister = function(args){

		if(args){
			// set parameters sent via args
			var N = args[0];
			var configVals = args[1];
			var newRegister = {
				values: null,
				state: [
				]
			};
			var algorithm= args[2];
			var speed= args[3];
			var color= 	args[4];
			var squareWidth = args[4];
			var depth = args[5];
			var ctx = args[6];
			var smallestElement = args[7];

			if (configVals === 'random'){
				var values = [];
				for (var i = 0; i < N; i++) {
					values.push(Math.random());
				};
				newRegister.values = values;
				pushRegister();
				return registers.length;
			} else if (configVals === 'sorted'){
				var values = [];
				for (var i = 0; i < N; i++) {
					values.push(i/N);
				};
				newRegister.values = values;
				pushRegister();
				return registers.length;
			} 
			else if (configVals.length<0){ // if an array was passed as second argument
				newRegister.values = [];
				for (var i = 0; i < configVals.length; i++) {
					newRegister.values[i] = configVals[i];
				};
				pushRegister();
				return registers.length;			
			}
		} else {
			registers.push('invalid create() register params');
		} 

		// set add register to registers array
		function pushRegister(){
			initState();
			registers[registers.length] = newRegister;
					}
		// initilize state parameters to their provided (or default, if not) values
		function initState(){
			newRegister.state = {};
			newRegister.state['position'] = 0;
			newRegister.state['comparing'] = {
	            block1: null,
	            block2: null
	        };
			newRegister.state['sorted'] = false;
			newRegister.state['speed'] =  speed || 200;
			newRegister.state['color'] = color;
			newRegister.state['swapping'] = {
	            block1: null,
	            block2: null
	        };
			newRegister.state['squareWidth'] = squareWidth || 0;
			newRegister.state['outerIndex'] = 0;
			newRegister.state['innerIndex'] = 0;
			newRegister.state['depth'] = depth || 'quick';
			newRegister.state['ctx'] = ctx || undefined;
			newRegister.state['smallestElement'] = smallestElement || undefined;
		}

	}
	this.clearRegisters = function(){
		registers = [];
	}



	// SORTING METHODS

	this.sort = function(regNumber, args){
		
		var registerNumber  = regNumber || 0; 
		registers[registerNumber].state['algorithm'] = args[0][0];
		// registers[registerNumber].state['swapped'] = args[0][1];
		registers[registerNumber].state['squareWidth'] = args[0][2];
		registers[registerNumber].state['depth'] = args[0][3];
		// registers[registerNumber].state['comparing'] = args[0][4];
		// registers[registerNumber].state['swapping'] = args[0][5];
		// registers[registerNumber].state['speed'] = args[0][6];
		// registers[registerNumber].state['color'] = args[0][7];
		registers[registerNumber].state['ctx'] = args[0][8];
		// registers[registerNumber].state['position'] = args[0][9];
	
		// implement individual drawing methods depending on parameters
		if(registers[registerNumber].state['algorithm'] === 'selectionSort'){
				this.selectionSort();
		} else if(registers[registerNumber].state['algorithm'] === 'insertionSort'){
				this.insertionSort();
		} else { 
			console.log("not yet implemented");
		} 
	}	
			


	///// DRAWING METHODS /////

	// takes in a 0-1 float and returns a color value depending on the register's color variables
	this.getColorValue = function(value, colorScheme){
		if(registers[0].state['color'] === 'grayscale'){
			var scaled = Math.round(value*255);
			return 'rgb('+scaled+', '+scaled+', '+scaled+')';
		}	
		if(registers[0].state['color'] === 'color'){
			var vR, vG, vB , scaledVal= null; // rgb() values
			//all R values
			if(value<=(1/6)){
				scaledVal = 255 * (value) * 6;
				vR = 0;
				vG = scaledVal;
				vB = 255;
			} else if (value>(1/6)&&value<=(2/6)){
				scaledVal = 255 * (value - (1/6)) * 6;  
				vR = 0;
				vG = 255;
				vB = 255-scaledVal;
			} else if (value>(2/6)&&value<=(3/6)){
				scaledVal = 255 * (value - (2/6)) * 6;  
				vR = scaledVal;
				vG = 255;
				vB = 0;
			} else if (value>(3/6)&&value<=(4/6)){
				scaledVal = 255 * (value - (3/6)) * 6;  
				vR = 255;
				vG = 255-scaledVal;
				vB = 0;
			} else if (value>(4/6)&&value<=(5/6)){
				scaledVal = 255 * (value - (4/6)) * 6;  
				vR = 255;
				vG = 0;
				vB = scaledVal;
			} else if (value>(5/6)&&value<=(6/6)){
				scaledVal = 255 * (value - (5/6)) * 6;  
				vR = 255-scaledVal;
				vG = 0;
				vB = 255;
			}
			// console.log(scaledVal);
			return 'rgb('+Math.round(vR)+', '+Math.round(vG)+', '+Math.round(vB)+')';
		}
	
	}

	// draws the entire register
    this.drawRegister = function(){
    	var ctx =  registers[0].state['ctx'];
        for (var i = 0; i < this.get(0)[0].values.length; i++) {                        
        	// set color options
        
            var val = this.get(0)[0].values[i];
            ctx.fillStyle = this.getColorValue(val, registers[0].state['color']);
        
	        ctx.fillRect(
            	i*registers[0].state['squareWidth']-1, 
            	(registers[0].state['squareWidth']*registers[0].state['outerIndex'])-1, 
            	registers[0].state['squareWidth']+2, 
            	registers[0].state['squareWidth']+2
            )	                     
        }
        
    }
    this.innerLoopSelectionSortFull = function(sorted, unsorted){
      	//before each pass:
    		//set innerIndex to 1 block past the outerIndex
    			// registers[0].state['innerIndex'] = registers[0].state['outerIndex']+1;
    			if(registers[0].state['innerIndex'] === 0){
    				registers[0].state['innerIndex'] = registers[0].state['outerIndex']+1;
    				registers[0].state['smallestElement'] = registers[0].state['outerIndex'];		
    			}

    			//outline smallestElement
    			registers[0].state['ctx'].strokeStyle="blue";
				registers[0].state['ctx'].lineWidth=4;
				registers[0].state['ctx'].strokeRect(
	            	registers[0].state['smallestElement']*registers[0].state['squareWidth']+1,
	            	registers[0].state['squareWidth']*registers[0].state['outerIndex']+1,  	
	            	registers[0].state['squareWidth']-4, 										
	            	registers[0].state['squareWidth']-4)							
    

	    		//outline innerIndex 
    			registers[0].state['ctx'].strokeStyle="green";
				registers[0].state['ctx'].lineWidth=4;
				registers[0].state['ctx'].strokeRect(
	            	registers[0].state['innerIndex']*registers[0].state['squareWidth']+1,
	            	registers[0].state['squareWidth']*registers[0].state['outerIndex']+1,  	
	            	registers[0].state['squareWidth']-4, 										
	            	registers[0].state['squareWidth']-4)							
    



    	// for each block in unsorted array
		// for (registers[0].state['innerIndex'] = registers[0].state['outerIndex']+1; registers[0].state['innerIndex'] < registers[0].values.length; registers[0].state['innerIndex']++) {	
			
		if(registers[0].state['innerIndex'] < registers[0].values.length){

			//check to see if the value at innerIndex is less than the value at smallestElement
				if(registers[0].values[registers[0].state['innerIndex']] < registers[0].values[registers[0].state['smallestElement']]){
					registers[0].state['smallestElement'] = registers[0].state['innerIndex'];
				}
			

		}
		registers[0].state['innerIndex']++;	
    }

    this.innerLoopSelectionSort = function(sorted, unsorted){

    	//before each pass:
    		//set innerIndex to 1 block past the outerIndex
    			registers[0].state['innerIndex'] = registers[0].state['outerIndex']+1;
    		//outline outerIndex 

    			registers[0].state['ctx'].strokeStyle="green";
				registers[0].state['ctx'].lineWidth=4;
				registers[0].state['ctx'].strokeRect(
	            	registers[0].state['outerIndex']*registers[0].state['squareWidth']+1,
	            	registers[0].state['squareWidth']*registers[0].state['outerIndex']+1,  	
	            	registers[0].state['squareWidth']-4, 										
	            	registers[0].state['squareWidth']-4)							
    		//set the smallest element to innerIndex
    			registers[0].state['smallestElement'] = registers[0].state['outerIndex'];



    	// for each block in unsorted array
		for (registers[0].state['innerIndex'] = registers[0].state['outerIndex']+1; registers[0].state['innerIndex'] < registers[0].values.length; registers[0].state['innerIndex']++) {	
			
			//check to see if the value at innerIndex is less than the value at smallestElement
				if(registers[0].values[registers[0].state['innerIndex']] < registers[0].values[registers[0].state['smallestElement']]){
					registers[0].state['smallestElement'] = registers[0].state['innerIndex'];
				}
			

		};
			//outline the final smallest element and then swap the elements
					registers[0].state['ctx'].strokeStyle="blue";
					registers[0].state['ctx'].lineWidth=4;
					registers[0].state['ctx'].strokeRect(
	            	registers[0].state['smallestElement']*registers[0].state['squareWidth']+1,
	            	registers[0].state['squareWidth']*registers[0].state['outerIndex']+1,  	
	            	registers[0].state['squareWidth']-4, 										
	            	registers[0].state['squareWidth']-4)			
					this.swap(registers[0].state['outerIndex'], registers[0].state['smallestElement']);

				registers[0].state['innerIndex'] = 0;
	}	

    this.selectionSort = function(){
    	
    	// console.log(registers[0].values);
    	if(registers[0].state['outerIndex'] === registers[0].values.length-1){
    		registers[0].state['sorted'] = true;
    		return;
    	}
    	// divide register into sorted and unsorted portion based on position value
    	var sorted = registers[0].values.slice(0, registers[0].state['outerIndex']);
    	var unsorted = registers[0].values.slice(registers[0].state['outerIndex'], registers[0].values.length);
 
    	// for each item in the register
    	// console.log(unsorted.length);
    	if(registers[0].state['outerIndex']<registers[0].values.length){	
    		if(registers[0].state['innerIndex'] === 0){ //if this is the first pass 
    			this.drawRegister();
    		}
    	    // loop through all remaining items and find smallest
    	    if(registers[0].state['depth'] === 'quick'){
	    		this.innerLoopSelectionSort(sorted, unsorted);
	    		registers[0].state['outerIndex']++;
		    } else if (registers[0].state['depth'] === 'full'){
		    	this.drawRegister();

		    	
		    	if(registers[0].state['innerIndex'] === registers[0].values.length){
				//outline the final smallest element and then swap the elements
					registers[0].state['ctx'].strokeStyle="blue";
					registers[0].state['ctx'].lineWidth=4;
					registers[0].state['ctx'].strokeRect(
	            	registers[0].state['smallestElement']*registers[0].state['squareWidth']+1,
	            	registers[0].state['squareWidth']*registers[0].state['outerIndex']+1,  	
	            	registers[0].state['squareWidth']-4, 										
	            	registers[0].state['squareWidth']-4)			
						
					
					//draw final register display state, then increment
					this.drawRegister();
					registers[0].state['ctx'].strokeStyle="red";
					registers[0].state['ctx'].lineWidth=2;
					registers[0].state['ctx'].strokeRect(
	            	registers[0].state['outerIndex']*registers[0].state['squareWidth']+0,
	            	registers[0].state['squareWidth']*registers[0].state['outerIndex']+0,  	
	            	registers[0].state['squareWidth']-2, 										
	            	registers[0].state['squareWidth']-2)

					registers[0].state['ctx'].strokeStyle="red";
					registers[0].state['ctx'].lineWidth=2;
					registers[0].state['ctx'].strokeRect(
	            	registers[0].state['smallestElement']*registers[0].state['squareWidth']+0,
	            	registers[0].state['squareWidth']*registers[0].state['outerIndex']+0,  	
	            	registers[0].state['squareWidth']-2, 										
	            	registers[0].state['squareWidth']-2)
					this.swap(registers[0].state['outerIndex'], registers[0].state['smallestElement']);			

					registers[0].state['innerIndex'] = 0;
					registers[0].state['outerIndex']++;

				}	
				this.innerLoopSelectionSortFull(sorted, unsorted);
		    }
		  	
			   
		
				
    	};
    }

    this.swap = function(a, b, regNumber){
    	// console.log(registers[0].values);
    	// var 0  = regNumber || 0; 
    	// console.log(registers[0].values[a]+' '+registers[0].values[b]);
    	var temp = registers[0].values[a];
    	registers[0].values[a] = registers[0].values[b];
    	registers[0].values[b] = temp;
    	// console.log(registers[0].values[a]+' '+registers[0].values[b]);
    }


    this.insertionSort = function(){

	    if(registers[0].state['outerIndex'] === registers[0].values.length){
    		registers[0].state['sorted'] = true;
    		this.drawRegister();
    		return;
    	}	

	    if(registers[0].state['outerIndex'] < registers[0].values.length+1){

	    	// draw register
	    	if(registers[0].state['depth'] === 'quick'){
	    		this.drawRegister();
	    	}

	    
	        // store the current value because it may shift later
	    	registers[0].state['position'] = registers[0].values[registers[0].state['outerIndex']];
	        
	    	this.insertionSortInner();
	   
	        registers[0].values[registers[0].state['innerIndex']+1] = registers[0].state['position'];
	    }
	    // }
	    registers[0].state['outerIndex']++;
	    // return registers[0].values
	}
	this.insertionSortInner = function(){
		    for (registers[0].state['innerIndex']=registers[0].state['outerIndex']-1; registers[0].state['innerIndex'] > -1 && registers[0].values[registers[0].state['innerIndex']] > registers[0].state['position']; registers[0].state['innerIndex']--) {
	            registers[0].values[registers[0].state['innerIndex']+1] =  registers[0].values[registers[0].state['innerIndex']];
	        }
	}

    // EXIT CRITERIA STRUCTURES





});