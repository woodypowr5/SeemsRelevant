
var app = angular.module('mainApp', ['ngRoute']);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider, $routeParams){
       
        $routeProvider.
                when('/',{
                templateUrl:    'dashboard.html',
                controller:     'MainCtrl'
            }).
            
            when('/posts',{
                templateUrl :   'dashboard.html',
                controller  :   'MainCtrl',
                resolve     :          
                {
                directUrl: function($routeParams){
                    return true;
                }
            }}).

            otherwise({
                redirectTo: 'dashboard.html'
            });
}]);

