angular.module("rzModule",[]).run(["$templateCache",function(i){"use strict";var t='<span class="rz-bar"></span><span class="rz-bar rz-selection"></span><span class="rz-pointer"></span><span class="rz-pointer"></span><span class="rz-bubble rz-limit"></span><span class="rz-bubble rz-limit"></span><span class="rz-bubble"></span><span class="rz-bubble"></span><span class="rz-bubble"></span>';i.put("rzSliderTpl.html",t)}]).value("throttle",function(i,t,s){"use strict";var e,a,r,h=Date.now||function(){return(new Date).getTime()},n=null,l=0;s=s||{};var o=function(){l=s.leading===!1?0:h(),n=null,r=i.apply(e,a),e=a=null};return function(){var d=h();l||s.leading!==!1||(l=d);var c=t-(d-l);return e=this,a=arguments,0>=c?(clearTimeout(n),n=null,l=d,r=i.apply(e,a),e=a=null):n||s.trailing===!1||(n=setTimeout(o,c)),r}}).factory("RzSlider",["$timeout","$document","$window","throttle",function(i,t,s,e){"use strict";var a=function(i,t,s){this.scope=i,this.attributes=s,this.sliderElem=t,this.range=void 0!==s.rzSliderHigh&&void 0!==s.rzSliderModel,this.handleHalfWidth=0,this.alwaysShowBar=!!s.rzSliderAlwaysShowBar,this.maxLeft=0,this.precision=0,this.step=0,this.tracking="",this.minValue=0,this.maxValue=0,this.hideLimitLabels=!!s.rzSliderHideLimitLabels,this.presentOnly="true"===s.rzSliderPresentOnly,this.valueRange=0,this.initHasRun=!1,this.customTrFn=this.scope.rzSliderTranslate()||function(i){return String(i)},this.deRegFuncs=[],this.fullBar=null,this.selBar=null,this.minH=null,this.maxH=null,this.flrLab=null,this.ceilLab=null,this.minLab=null,this.maxLab=null,this.cmbLab=null,this.init()};return a.prototype={init:function(){var t,a,r,h=angular.bind(this,this.calcViewDimensions),n=this;this.initElemHandles(),this.calcViewDimensions(),this.setMinAndMax(),this.precision=void 0===this.scope.rzSliderPrecision?0:+this.scope.rzSliderPrecision,this.step=void 0===this.scope.rzSliderStep?1:+this.scope.rzSliderStep,i(function(){n.updateCeilLab(),n.updateFloorLab(),n.initHandles(),n.presentOnly||n.bindEvents()}),r=this.scope.$on("reCalcViewDimensions",h),this.deRegFuncs.push(r),angular.element(s).on("resize",h),this.initHasRun=!0,t=e(function(){n.setMinAndMax(),n.updateLowHandle(n.valueToOffset(n.scope.rzSliderModel)),n.updateSelectionBar(),n.range&&n.updateCmbLabel()},350,{leading:!1}),a=e(function(){n.setMinAndMax(),n.updateHighHandle(n.valueToOffset(n.scope.rzSliderHigh)),n.updateSelectionBar(),n.updateCmbLabel()},350,{leading:!1}),this.scope.$on("rzSliderForceRender",function(){n.resetLabelsValue(),t(),n.range&&a(),n.resetSlider()}),r=this.scope.$watch("rzSliderModel",function(i,s){i!==s&&t()}),this.deRegFuncs.push(r),r=this.scope.$watch("rzSliderHigh",function(i,t){i!==t&&a()}),this.deRegFuncs.push(r),this.scope.$watch("rzSliderFloor",function(i,t){i!==t&&n.resetSlider()}),this.deRegFuncs.push(r),r=this.scope.$watch("rzSliderCeil",function(i,t){i!==t&&n.resetSlider()}),this.deRegFuncs.push(r),this.scope.$on("$destroy",function(){n.minH.off(),n.maxH.off(),angular.element(s).off("resize",h),n.deRegFuncs.map(function(i){i()})})},resetSlider:function(){this.setMinAndMax(),this.calcViewDimensions(),this.updateCeilLab(),this.updateFloorLab()},resetLabelsValue:function(){this.minLab.rzsv=void 0,this.maxLab.rzsv=void 0},initHandles:function(){this.updateLowHandle(this.valueToOffset(this.scope.rzSliderModel)),this.range&&(this.updateHighHandle(this.valueToOffset(this.scope.rzSliderHigh)),this.updateCmbLabel()),this.updateSelectionBar()},translateFn:function(i,t,s){s=void 0===s?!0:s;var e=String(s?this.customTrFn(i):i),a=!1;(void 0===t.rzsv||t.rzsv.length!==e.length||t.rzsv.length>0&&0===t.rzsw)&&(a=!0,t.rzsv=e),t.text(e),a&&this.getWidth(t)},setMinAndMax:function(){this.minValue=this.scope.rzSliderFloor?+this.scope.rzSliderFloor:this.scope.rzSliderFloor=0,this.scope.rzSliderCeil?this.maxValue=+this.scope.rzSliderCeil:this.scope.rzSliderCeil=this.maxValue=this.range?this.scope.rzSliderHigh:this.scope.rzSliderModel,this.scope.rzSliderStep&&(this.step=+this.scope.rzSliderStep),this.valueRange=this.maxValue-this.minValue},initElemHandles:function(){angular.forEach(this.sliderElem.children(),function(i,t){var s=angular.element(i);switch(t){case 0:this.fullBar=s;break;case 1:this.selBar=s;break;case 2:this.minH=s;break;case 3:this.maxH=s;break;case 4:this.flrLab=s;break;case 5:this.ceilLab=s;break;case 6:this.minLab=s;break;case 7:this.maxLab=s;break;case 8:this.cmbLab=s}},this),this.fullBar.rzsl=0,this.selBar.rzsl=0,this.minH.rzsl=0,this.maxH.rzsl=0,this.flrLab.rzsl=0,this.ceilLab.rzsl=0,this.minLab.rzsl=0,this.maxLab.rzsl=0,this.cmbLab.rzsl=0,this.hideLimitLabels&&(this.flrLab.rzAlwaysHide=!0,this.ceilLab.rzAlwaysHide=!0,this.hideEl(this.flrLab),this.hideEl(this.ceilLab)),this.range===!1&&(this.cmbLab.remove(),this.maxLab.remove(),this.maxH.rzAlwaysHide=!0,this.maxH[0].style.zIndex="-1000",this.hideEl(this.maxH)),this.range===!1&&this.alwaysShowBar===!1&&(this.maxH.remove(),this.selBar.remove())},calcViewDimensions:function(){var i=this.getWidth(this.minH);this.handleHalfWidth=i/2,this.barWidth=this.getWidth(this.fullBar),this.maxLeft=this.barWidth-i,this.getWidth(this.sliderElem),this.sliderElem.rzsl=this.sliderElem[0].getBoundingClientRect().left,this.initHasRun&&(this.updateCeilLab(),this.initHandles())},updateCeilLab:function(){this.translateFn(this.scope.rzSliderCeil,this.ceilLab),this.setLeft(this.ceilLab,this.barWidth-this.ceilLab.rzsw),this.getWidth(this.ceilLab)},updateFloorLab:function(){this.translateFn(this.scope.rzSliderFloor,this.flrLab),this.getWidth(this.flrLab)},updateHandles:function(i,t){return"rzSliderModel"===i?(this.updateLowHandle(t),this.updateSelectionBar(),void(this.range&&this.updateCmbLabel())):"rzSliderHigh"===i?(this.updateHighHandle(t),this.updateSelectionBar(),void(this.range&&this.updateCmbLabel())):(this.updateLowHandle(t),this.updateHighHandle(t),this.updateSelectionBar(),void this.updateCmbLabel())},updateLowHandle:function(i){var t=Math.abs(this.minH.rzsl-i);0>=t&&1>t||(this.setLeft(this.minH,i),this.translateFn(this.scope.rzSliderModel,this.minLab),this.setLeft(this.minLab,i-this.minLab.rzsw/2+this.handleHalfWidth),this.shFloorCeil())},updateHighHandle:function(i){this.setLeft(this.maxH,i),this.translateFn(this.scope.rzSliderHigh,this.maxLab),this.setLeft(this.maxLab,i-this.maxLab.rzsw/2+this.handleHalfWidth),this.shFloorCeil()},shFloorCeil:function(){var i=!1,t=!1;this.minLab.rzsl<=this.flrLab.rzsl+this.flrLab.rzsw+5?(i=!0,this.hideEl(this.flrLab)):(i=!1,this.showEl(this.flrLab)),this.minLab.rzsl+this.minLab.rzsw>=this.ceilLab.rzsl-this.handleHalfWidth-10?(t=!0,this.hideEl(this.ceilLab)):(t=!1,this.showEl(this.ceilLab)),this.range&&(this.maxLab.rzsl+this.maxLab.rzsw>=this.ceilLab.rzsl-10?this.hideEl(this.ceilLab):t||this.showEl(this.ceilLab),this.maxLab.rzsl<=this.flrLab.rzsl+this.flrLab.rzsw+this.handleHalfWidth?this.hideEl(this.flrLab):i||this.showEl(this.flrLab))},updateSelectionBar:function(){this.setWidth(this.selBar,Math.abs(this.maxH.rzsl-this.minH.rzsl)),this.setLeft(this.selBar,this.range?this.minH.rzsl+this.handleHalfWidth:0)},updateCmbLabel:function(){var i,t;this.minLab.rzsl+this.minLab.rzsw+10>=this.maxLab.rzsl?(this.customTrFn?(i=this.customTrFn(this.scope.rzSliderModel),t=this.customTrFn(this.scope.rzSliderHigh)):(i=this.scope.rzSliderModel,t=this.scope.rzSliderHigh),this.translateFn(i+" - "+t,this.cmbLab,!1),this.setLeft(this.cmbLab,this.selBar.rzsl+this.selBar.rzsw/2-this.cmbLab.rzsw/2),this.hideEl(this.minLab),this.hideEl(this.maxLab),this.showEl(this.cmbLab)):(this.showEl(this.maxLab),this.showEl(this.minLab),this.hideEl(this.cmbLab))},roundStep:function(i){var t=this.step,s=+((i-this.minValue)%t).toFixed(3),e=s>t/2?i+t-s:i-s;return e=e.toFixed(this.precision),+e},hideEl:function(i){return i.css({opacity:0})},showEl:function(i){return i.rzAlwaysHide?i:i.css({opacity:1})},setLeft:function(i,t){return i.rzsl=t,i.css({left:t+"px"}),t},getWidth:function(i){var t=i[0].getBoundingClientRect();return i.rzsw=t.right-t.left,i.rzsw},setWidth:function(i,t){return i.rzsw=t,i.css({width:t+"px"}),t},valueToOffset:function(i){return(i-this.minValue)*this.maxLeft/this.valueRange},offsetToValue:function(i){return i/this.maxLeft*this.valueRange+this.minValue},bindEvents:function(){this.minH.on("mousedown",angular.bind(this,this.onStart,this.minH,"rzSliderModel")),this.range&&this.maxH.on("mousedown",angular.bind(this,this.onStart,this.maxH,"rzSliderHigh")),this.minH.on("touchstart",angular.bind(this,this.onStart,this.minH,"rzSliderModel")),this.range&&this.maxH.on("touchstart",angular.bind(this,this.onStart,this.maxH,"rzSliderHigh"))},onStart:function(i,s,e){var a,r,h=this.getEventNames(e);e.stopPropagation(),e.preventDefault(),""===this.tracking&&(this.calcViewDimensions(),this.tracking=s,i.addClass("rz-active"),a=angular.bind(this,this.onMove,i),r=angular.bind(this,this.onEnd,a),t.on(h.moveEvent,a),t.one(h.endEvent,r))},onMove:function(i,t){var s,e,a,r;return s="clientX"in t?t.clientX:void 0===t.originalEvent?t.touches[0].clientX:t.originalEvent.touches[0].clientX,e=this.sliderElem.rzsl,a=s-e-this.handleHalfWidth,0>=a?void(0!==i.rzsl&&(this.scope[this.tracking]=this.minValue,this.updateHandles(this.tracking,0),this.scope.$apply())):a>=this.maxLeft?void(i.rzsl!==this.maxLeft&&(this.scope[this.tracking]=this.maxValue,this.updateHandles(this.tracking,this.maxLeft),this.scope.$apply())):(r=this.offsetToValue(a),r=this.roundStep(r),a=this.valueToOffset(r),this.range&&("rzSliderModel"===this.tracking&&r>=this.scope.rzSliderHigh?(this.scope[this.tracking]=this.scope.rzSliderHigh,this.updateHandles(this.tracking,this.maxH.rzsl),this.tracking="rzSliderHigh",this.minH.removeClass("rz-active"),this.maxH.addClass("rz-active")):"rzSliderHigh"===this.tracking&&r<=this.scope.rzSliderModel&&(this.scope[this.tracking]=this.scope.rzSliderModel,this.updateHandles(this.tracking,this.minH.rzsl),this.tracking="rzSliderModel",this.maxH.removeClass("rz-active"),this.minH.addClass("rz-active"))),void(this.scope[this.tracking]!==r&&(this.scope[this.tracking]=r,this.updateHandles(this.tracking,a),this.scope.$apply())))},onEnd:function(i,s){var e=this.getEventNames(s).moveEvent;this.minH.removeClass("rz-active"),this.maxH.removeClass("rz-active"),t.off(e,i),this.scope.$emit("slideEnded"),this.tracking=""},getEventNames:function(i){var t={moveEvent:"",endEvent:""};return i.touches||void 0!==i.originalEvent&&i.originalEvent.touches?(t.moveEvent="touchmove",t.endEvent="touchend"):(t.moveEvent="mousemove",t.endEvent="mouseup"),t}},a}]).directive("rzslider",["RzSlider",function(i){"use strict";return{restrict:"E",scope:{rzSliderFloor:"=?",rzSliderCeil:"=?",rzSliderStep:"@",rzSliderPrecision:"@",rzSliderModel:"=?",rzSliderHigh:"=?",rzSliderTranslate:"&",rzSliderHideLimitLabels:"=?",rzSliderAlwaysShowBar:"=?",rzSliderPresentOnly:"@"},templateUrl:function(i,t){return t.rzSliderTplUrl||"rzSliderTpl.html"},link:function(t,s,e){return new i(t,s,e)}}}]);