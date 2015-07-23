describe("mainApp", function() {
  	

   	beforeEach(function () {
      module('mainApp');
    });

    describe("SERVICES", function(){
        describe("PostsFactory", function(){
            var factory, httpBackend;

            beforeEach(inject(function(PostsFactory, $httpBackend){
                factory = PostsFactory;
                httpBackend = $httpBackend;

            }));

            it("should do something", function () {
                httpBackend.when('GET','data/posts.json').respond(
                    {"test": 'hello'}
                );
                factory.getAllPosts('data/posts.json').then(function(data) {
                    expect(data.test).toEqual("hello");
                });
                httpBackend.flush();
            });
        });
    });

    describe("CONTROLLERS", function(){
        
                
        describe("MainCtrl", function(){

            var $q, q, scope, $controller, callMe, PostsFactory, createMainCtrl;

            module(function($provide){
                $provide.value('PostsFactory', {
                    callMe: function(arg){
    
                    },
                    getAllPosts: function(filepath){
                        
                        // return{
                        //     then: function(callback){

                        //         return callback;
                        //     }
                        // };
                    }

                });
                return null;
            });

            beforeEach(function() {
                
                // When Angular Injects the StoreService and Contact dependencies, 
                // it will use the implementation we provided above
                inject(function($q, $http, $controller, $rootScope, _PostsFactory_) {
                    scope = $rootScope.$new();
                    PostsFactory = _PostsFactory_;
                    q = $q;
                    createController = function(params) {
                        return $controller("MainCtrl", {
                            $scope: scope,

                            $stateParams: params || {}
                        });
                    };
                    createController();
                });
            });

            // describe("MainCtrl.testFunction", function(){
            //     beforeEach(function() {
            //         spyOn(PostsFactory, 'callMe').and.callThrough(function() {
            //             return {
            //                 then: function(callback) { return callback(); }
            //             };
            //         });  
            //     });
            //     it('should call PostsFactory.callMe with the provided argument', function(){ 
            //         scope.testFunction(5);
            //         expect(PostsFactory.callMe).toHaveBeenCalledWith(5);
            //     });
            //     it('should set $scope.testVar to the provided argument', function(){ 
            //         scope.testFunction(5);
            //         expect(scope.testVar).toBe(5);      
            //     });
            // });

            describe("MainCtrl.initPosts", function(){
                beforeEach(function() {
                    var q;
                    inject(function($q) {
                        q = $q;
                  
                    });

                    var spydeferred = q.defer();
                    spydeferred.resolve('test');

                    spyOn(PostsFactory, 'getAllPosts').and.returnValue(spydeferred);

                    // and.callFake(function() {
                    //     var spydeferred = q.defer();
                    //     console.log(spydeferred);
                    //     spydeferred.resolve('test');
                    //     console.log(spydeferred.promise);
                    //     return spydeferred.promise;
                    // });  
                    scope.initPosts('filepath');
                });
                it('should receive the appropriate value from the mock async server call', function(){ 
                    

                    expect(scope.posts).toBe('test');
                });
                it('should call PostsFactory.getAllPosts once', function(){ 
                    
                    expect(PostsFactory.getAllPosts).toHaveBeenCalled();
                });
                
            });
        });
    });

    
});