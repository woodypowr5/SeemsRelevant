

(function () {

    var directive = function () {
    	
    	return{
    		// transclude: true,
    		replace: true,
    		scope: {
    			postid: 			'@',
    		    categoryclick: 		'&',
    		    dateclick: 			'&',
    		    titleclick:			'&',
    			setSortPostsBy: 	'&' 
    		},
    		controller: 'MainCtrl',
    		
    		template: function(scope, elem, attr){ 
	    		
	    		var htmlString = 
      				['<div class=\"tile-main',
      				'\"',
      				'ng-class="',
						'{\'hidden\':tilehover{{postid}}}',	
						'"',
      				'style=\"flex-basis: ',
      					'{{posts[postid].basis}}',
      				' \">',		
					'<h2 class=\"tile-title hover-hand\" ng-click=\"titleclick()\">',
						'{{posts[postid].title}}',
					'</h2>',
					'<p>',
						'{{posts[postid].preview}}',
             '<a class="read-more hover-hand" ng-click=\"titleclick()">',
              'Read...',
             '</a>',
					'</p>',
					'<span class=\"tile-category hover-hand\" ng-click=\"categoryclick(\'category\')\"");\">',
						'{{posts[postid].category}}',
						'<div class=\"sexy-line-reverse\"></div>',
					'</span>',
					'<span class=\"tile-date hover-hand\" ng-click=\"dateclick(\'date\')\"");\">',
						'{{posts[postid].date}}',
					'</span>',
					
				'</div>'].join('');

	    		return htmlString;
	    	}
    	};
    };

    angular.module('mainApp')
        .directive('tilePreview', directive);

}());


