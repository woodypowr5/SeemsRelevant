
app.factory('PostsFactory', ['$http', '$q',
    function PostsFactory($http, $q) {
        // interface
        var service = {
            data: [],
            getAllPosts:        getAllPosts,
            getPostById:        getPostById,
            callMe:             callMe
        };
        
        // implementation
        function getAllPosts(filepath) {
            var def = $q.defer();
            $http.get(filepath)
                .success(function(data) {
                    service.data = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to retrieve data");
                });
            return def.promise;
        }
   
        function getPostById(username) {
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

        function callMe(arg){
            return arg;
        }
        return service;
}]);