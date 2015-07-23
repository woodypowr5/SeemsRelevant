
app.factory('ImagesFactory', ['$http', '$q',
    function ImagesFactory($http, $q) {
        // interface
        var service = {
            data: [],
            getAllImages:        getAllImages,
            getImageById:        getImageById
        };
        
        // implementation
        function getAllImages(imagesFilepath) {
            var def = $q.defer();
            $http.get(imagesFilepath)
                .success(function(data) {
                    service.data = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to retrieve data");
                });
            return def.promise;
        }
   
        function getImageById(username) {
            var def = $q.defer();
            var restUrl = "api/users.php?username="+username;
            // alert(restUrl);
            $http.get(restUrl)
                .success(function(data) {
                    service.data = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to retrieve data");
                });
            return def.promise;
        }

       
        return service;
}]);