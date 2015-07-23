

(function () {

    var directive = function () {
    	
    	return{
    		// transclude: true,
    		replace: true,
    		scope: {
    			  imageid: 			'@',
                imagetitle: '@',
                
    		},
    		controller: 'MainCtrl',
    		
    		template: function(scope, elem, attr){ 
         
	    		var htmlString = 
      				['<div class=\"tile-main img-prev-tile\"',
      				'ng-mouseenter=\"showOverlay(imageid)\"',
              'ng-mouseleave=\"hideOverlay(imageid)\"',

              '>',
              
              '<div ng-show="imageViewer.active && imageViewer.image === imageid" class="image-viewer">',
                    '<h5 ng-click="inactivateImageViewer()" class="close-button">[x]close</h5>',
                    '<img class="fullscreen" src="',
                    'data/images/large/{{imageid}}large.jpg',
                    '">',
              '</div>',

              // '<h2 class="tile-title img-tile-title">',
              //   '{{images[imageid].title}}',
              // '</h2>',

              '<img src="',
                'data/images/small/{{imageid}}small.jpg',
              '">',
              '<div class="image-caption-box-dummy">',
              '</div>',
              
              '<span class="caption-box-date">',
                '<h5>{{images[imageid].date}}</h5>',
              '</span>',
              '<span class="caption-box-location">',
                '<h5>{{images[imageid].location}}</h5>',
              '</span>',
              

              '<div class="image-hover-wrapper"',
                'ng-show="overlayActive[imageid] == true"',
                ' ng-click="activateImageViewer(imageid)"',
              '>',

                 
                  '<h2 class=\"tile-title image-title hover-hand\" ng-click=\"imagetitleclick()\"");\">',
                   '{{imagetitle}}',
                  '</h2>',
                  '<p class="image-caption">',
                  '{{images[imageid].caption}}',
                  '</p>',
                    '<span class=\"tile-category image-tags hover-hand\" ng-click=\"categoryclick(\'category\')\"");\">',
                    '{{images[imageid].tags}}',
                    '<div class=\"sexy-line-reverse\"></div>',
                  '</span>',
                  '<span class=\"tile-date image-date hover-hand\" ng-click=\"dateclick(\'date\')\"");\">',
                    '{{images[imageid].date}}',
                  '</span>',

                
              '</div>',

				      '</div>'].join('');

	    		return htmlString;
	    	}
    	};
    };

    angular.module('mainApp')
        .directive('imagePreview', directive);

}());

