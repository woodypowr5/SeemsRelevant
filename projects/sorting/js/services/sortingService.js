app.service('SortingService',  function () {
	
	var registerSorted = false;
	var registerSwapped = false;
	var comparing = {
            block1: null,
            block2: null
        }
    var swapping = {
            block1: null,
            block2: null
        }

    var innerComplete = false;    

	// takes in a register and returns a register sorted according to the accompanying arguments	
	this.sort = function(register, params){
	
		var sortedRegister = register;
		// console.log(params[1]);
		if(params){
			var sortType = params[0];
			var position = params[1];
			var swapped = params[2];
			var depth = params[3];


			if(sortType == 'bubbleSort'){
				
				sortedRegister = this.bubbleSort(register, position, swapped);
			}
			if(sortType == 'selectionSort'){

				sortedRegister = this.selectionSort(register, position, depth );
			}
		}

		return sortedRegister;
	};

	this.bubbleSort = function(register, position, swapped, depth){
		var swapped, position, register;
	    do {
	        this.setRegisterSwapped(false);
	        for (var position=0; position < register.length-1; position++) {

	        					

	            if (register[position] > register[position+1]) {
	                var temp = register[position];
	                register[position] = register[position+1];
	                register[position+1] = temp;
	               	this.setRegisterSwapped(true);
	            }
	        }
	    } while (this.getRegisterSwapped === true);
		return register;
	}
	this.selectionSort = function(register,position, depth){
		
		function swap(items, firstIndex, secondIndex){
		    var mytemp = items[0].values[firstIndex];
		    items[0].values[firstIndex] = items[0].values[secondIndex];
		    items[0].values[secondIndex] = mytemp;
		    return items[0];
		}

		if(comparing.block1 === null ){ //first of a new pass
			var items = register;
					
			var len = items[0].values.length,
		        min;
		    for (i=position; i < len; i++){
		    	//array is sorted
		    	if(i===(len-1)){
		    		registerSorted = true;
		    		return;
		    	}

		        //set minimum to this position
		        min = i;
			}
		}else{
	        //check the rest of the array to see if anything is smaller
	        for (j=i+1; j < len; j++){

	            if (items[0].values[j] < items[0].values[min]){

            		if(depth === 'full'){
            			this.setSwapping(null, null);
            			this.setComparing(i, j);
					}
	                min = j;
	            
	                return items;
	            }
	        }
	        //if the minimum isn't in the position, swap it
	        if (i != min){
	        	if(depth === 'full'){
	        			this.setComparing(null, null);
            			this.setSwapping(i, min);
					}
	            swap(items, i, min);
	            this.setInnerComplete(true);
	            this.setComparing(null, null);
	            this.setSwapping(null, null);
	        }
	        return items;
	        // return items; //return after each step
	    }
	 //    items.sorted = true;
		// return items; 
	}
	this.getRegisterSorted = function(){
		return registerSorted;
	}
	this.resetRegisterSorted = function(){
		registerSorted = false;
	}
	this.getRegisterSwapped = function(){
		return registerSwapped;
	}
	this.setRegisterSwapped = function(value){
		registerSwapped = value;
	}
	this.getComparing = function(){
		return comparing;
	}
	this.setComparing = function(block1, block2){
		comparing.block1 = block1;
		comparing.block2 = block2;
	}
	this.getSwapping = function(){
		return comparing;
	}
	this.setSwapping = function(block1, block2){
		comparing.block1 = block1;
		comparing.block2 = block2;
	}
	this.getInnerComplete = function(){
		return innerComplete;
	}
	this.setInnerComplete = function(value){
		innerComplete = value;
	}



});