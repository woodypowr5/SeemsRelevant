app.factory("ImagesFactory",["$http","$q",function e(r,t){function a(e){var a=t.defer();return r.get(e).success(function(e){o.data=e,a.resolve(e)}).error(function(){a.reject("Failed to retrieve data")}),a.promise}function n(e){var a=t.defer(),n="api/users.php?username="+e;return r.get(n).success(function(e){o.data=e,a.resolve(e)}).error(function(){a.reject("Failed to retrieve data")}),a.promise}var o={data:[],getAllImages:a,getImageById:n};return o}]);