app.filter('sortBySubview', function () {
    return function (posts, sortBy) {
        var newPosts = [];
        angular.forEach(posts, function (post) {
            if (post.category == sortBy) {
                newPosts.unshift(post);
            }
            else {
                newPosts.push(post);
            }
        });
        return newPosts;
    };
});
 