describe('SortingCtrl', function(){

	var $scope, ctrl;

	beforeEach(function(){
		module('sortingApp');
	});

	inject(function($rootScope, $controller){
		$scope = $rootScope.new();
		ctrl = $controller('SortingCtrl', {
			$scope: $scope,
			//inject mock services here
		});
	});
});

describe('RegisterService', function(){

	var service, RegisterService,RegisterServiceObj; 

	beforeEach(function(){
		module('sortingApp');
		inject(function(RegisterService){
			RegisterServiceObj = RegisterService;
		});
	
	});

	
	describe('this.createRegister', function(){
		it('should create a new register', function(){
			RegisterServiceObj.createRegister();
			expect(RegisterServiceObj.get()).toBeDefined();
		});
		it('should create a register of length N, if provided', function(){
			RegisterServiceObj.createRegister([32, 'random'], 'selectionSort');
			expect(RegisterServiceObj.get()[0].values.length).toBe(32);
		});
		it('should return register with invalid params if args not provided', function(){
			RegisterServiceObj.createRegister();
			expect(RegisterServiceObj.get()[0]).toBe('invalid create() register params');
		});
		it('should return register with the provided values if an array is passed as argument for values', function(){
			RegisterServiceObj.createRegister([5, [1,2,3,4,5], 'selectionSort']);
			expect(RegisterServiceObj.get()[0].values).toEqual([1,2,3,4,5]);
		});
		it('should set register.sortType to passed value', function(){
			RegisterServiceObj.createRegister([32, 'random', 'bubbleSort']);
			expect(RegisterServiceObj.get()[0].sortType).toBe('bubbleSort');
		});
	});
	
	describe('this.get', function(){
		it('should return the entire registers array when not passed an argument', function(){
			RegisterServiceObj.createRegister([2, [1,2], 'selectionSort']);
			RegisterServiceObj.createRegister([2, [3,4], 'selectionSort']);
			expect(RegisterServiceObj.get().length).toBe(2);
		});
		it('should return an individual register when passed an integer as argument', function(){
			RegisterServiceObj.createRegister([2, [1,2], 'selectionSort']);
			RegisterServiceObj.createRegister([2, [3,4], 'selectionSort']);
			expect(RegisterServiceObj.get(1).values[1]).toBe(4);
		});
		
	});
});


describe('SortingService', function(){

	var service, SortingService, SortingServiceObj, RegisterService, RegisterServiceObj; 

	beforeEach(function(){
		module('sortingApp');
		inject(function(SortingService, RegisterService){
			SortingServiceObj = SortingService;
			RegisterServiceObj = RegisterService;
		});
	});


	describe('this.sort', function(){
		it('should call the appropriate sort function if passed as argument', function(){
			spyOn(SortingServiceObj, 'bubbleSort');
			spyOn(SortingServiceObj, 'selectionSort');

			RegisterServiceObj.createRegister([32, 'random', 'bubbleSort']);
			var register = RegisterServiceObj.get()[0];
			SortingServiceObj.sort(register, ['bubbleSort']);
			expect(SortingServiceObj.bubbleSort).toHaveBeenCalled();

			RegisterServiceObj.createRegister([32, 'random', 'selectionSort']);
			var register = RegisterServiceObj.get()[0];
			SortingServiceObj.sort(register, ['selectionSort']);
			expect(SortingServiceObj.selectionSort).toHaveBeenCalled();
		});
		// it("should return the correct next values for selectionSort when sorted", function(){

		// });	

	});	

	describe('this.selectionSort', function(){
		// it('', function(){
			
		// });
	

	});	
});
