// MainCtrl:
// Contains all $scope variables and functions for UI functionality
// Dependencies: ImagesFactory, PostsFactory, various AngularJS utils

(function() {
    
    var MainCtrl = function ($scope, $http, PostsFactory, $filter, $location, $anchorScroll, ImagesFactory, $routeParams) {
        $scope.activeView = 'home';
        $scope.activeSubview = '';
        $scope.defaultsortPostsBy = 'date'; 
        $scope.sortPostsBy = $scope.defaultsortPostsBy;
        $scope.reverseSort = false;
        $scope.readerActive = false;
        $scope.sortParameter = 'lowhi';
        $scope.filepath = 'data/posts.json';  // pointer to json file containing posts' metadata
        $scope.imagesFilepath = 'data/images/image-catalogue.json'; // pointer to json file containing images' metadata for photography section
        $scope.posts = {};
        $scope.images = {};
        $scope.overlayActive = {};
        $scope.imageViewer = {
            active: false,
            image:      -1
        };

        // broadcasts the name of the nav link clicked to child scopes, where they are handled if applicable
        $scope.broadcastNavClick = function(which){
       	    $scope.activeView = which;
            $scope.activeSubview = '';
            $scope.sortPostsBy = $scope.defaultSortPostsBy;
            if (which === 'about'){
                $scope.readerActive = true;
            }
            else if(which === 'portfolio'){
                $scope.activeView = 'portfolio';
                $scope.readerActive = true;
                $scope.readerTemplate = 'data/posts/portfolio.html';
            }
            else if(which === 'photography'){
                $scope.activeView = 'photography';
                $scope.readerActive = false;
            }
            else {
                $scope.readerActive = false;
            } 
        };  

        // get posts for curent page from PostsFactory service
        $scope.initPosts = function(filepath){
            var obj = PostsFactory.getAllPosts(filepath);
            obj.then(function(data){
                if(data === ''){
                    $scope.posts = ''; 
                    $scope.message ='No posts found';
                } else {
                    $scope.posts = data;
                    $scope.message = 'data retrieved'; 
                }
            },
            function(data){
                $scope.message("Error retrieving data.");
            });
        };

        // get images from ImagesFactory service
        $scope.initImages = function(imagesFilepath){
            var obj = ImagesFactory.getAllImages($scope.imagesFilepath);
            obj.then(function(data){
                if(data === ''){
                    $scope.images = ''; 
                    $scope.message ='No posts found';
                } else {
                    $scope.images = data;
                    $scope.message = 'data retrieved'; 

                    //get EXIF data
                }
            },
            function(data){
                $scope.message("Error retrieving data.");
            });
        };

        // sets $scope.activeSubview, which controls the main view displayed (home, blog, etc.)
        $scope.setActiveSubview = function(newSubview){
            if(newSubview.arg){
                if($scope.activeSubview === 'portfolio'){
                    $scope.activeSubview === '';
                } else {
                    $scope.activeSubview = newSubview.arg;
                }
            }
            else {
                $scope.activeSubview = newSubview;
            }
        };

        // sets $scope.sortPostsBy, which modulates the tiles ng-repeat sortBy with our desired sorting parameters
        $scope.setSortPostsBy = function(setTo){
            if($scope.sortPostsBy == setTo.arg.toLowerCase()){ //reverse the order if same argument
                $scope.reverseSort = !$scope.reverseSort;
            } else {
                $scope.sortPostsBy = setTo.arg.toLowerCase();
            }
        };

        // sets $scope.readerActive to true, which is used to display/hide the post reader. Als, loads readerTemplate with the appropriate post url in order to display the post with id postid 
        $scope.activateReader = function(postid){
            $scope.readerActive = true;
            if($scope.posts[postid.arg]){
                $scope.readerTemplate = 'data/'+$scope.posts[postid.arg].template; //produce template Url for ng-include
            } else if (postid === 'portfolio'){
                $scope.activeView = 'portfolio';
                $scope.readerActive = true;
                $scope.readerTemplate = 'data/posts/portfolio.html';
            } else {
                $scope.readerTemplate = 'data/posts/'+postid+'.html';
            }
        };

        // Used for direct post linking. Activats the reader, but sets readerTemplate to the provided URL rather than the postid.
        $scope.activateReaderWithUrl = function(url){
            $scope.readerActive = true;
            $scope.readerTemplate = url;
        };

        $scope.closeReader = function(){
            $scope.readerActive = false;
        };

        // when implemented, this will load the next collection of paginated tiles (will implement when there are enough posts to divide with pagination)
        $scope.showMore = function(){
            alert("This button is not working yet. WOHOOO!!");
        };

        // acts as a filter on ng-repeat when displaying posts in order to sort by category(blog, projects, etc.)
        $scope.orderByCategoryName = function(posts,activeSubview){
           return $filter('sortBySubview')(posts,activeSubview);
        };

        // activates the textual information that accompanies each images
        $scope.showOverlay = function(imageid){
            $scope.overlayActive[imageid] = true;
        };

        // hides the images overlay
        $scope.hideOverlay = function(imageid){
            $scope.overlayActive[imageid] = false;
        };

        // activates the images viewer with the appropriate image
        $scope.activateImageViewer = function(imageid){
            $scope.imageViewer.active = true;
            $scope.imageViewer.image = imageid;
        };

        // inactives the image viewer
        $scope.inactivateImageViewer = function(){
            $scope.imageViewer.active = false;
            $scope.imageViewer.image = -1;
        };

        // jumps to the desired location. Inactive until needed. 
        $scope.jump = function(whereTo) {
            // $location.hash('pagetop');
            // $anchorScroll();
        };

        $scope.checkForPortfolioActive = function(){
            if($scope.activeView === 'portfolio'){
                $scope.activeSubview = '';
            }
        };

        // load the image tile with id=imageid. 
        $scope.getImageData = function(imageid){         
            var data = {};
            var images = $scope.images;

            images.forEach(function (image) {
                if (image.imageid === imageid){
                    return image;
                }
            });
            return '';
        };

        // fetch image EXIF data for display on preview tile. Will be implemented TBD
        $scope.getEXIF = function(e, $scope){
            // var file = e.files[0];
            // var file = $scope.images[0];
            // EXIF.getData(file, function(){
            //   alert(EXIF.pretty(this));
            // });
        };

    //// CTRL INIT ////

        // fetch posts and images
        $scope.initPosts($scope.filepath);
        $scope.initImages($scope.imagesFilepath);
        // set activeubview to Home
        $scope.broadcastNavClick('home');
        
        $scope.$on('$routeChangeSuccess', function() {
            // if the url path contains a request for a specific post, load it
           if($routeParams.postid){
              $scope.activateReader($routeParams.postid);
           } else if($routeParams.page){
              $scope.activateReader($routeParams.page);
           }
        });

    };
    //handle DI to avoid minification errors
    MainCtrl.$inject = ['$scope', '$http', 'PostsFactory', '$filter', '$location', '$anchorScroll', 'ImagesFactory', '$routeParams'];
    //define the controller in angular
    angular.module('mainApp').controller('MainCtrl', MainCtrl);
}());