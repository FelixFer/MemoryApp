"use strict";(self.webpackChunkWeek09_35927_FelixFerdinand=self.webpackChunkWeek09_35927_FelixFerdinand||[]).push([[22],{5022:function(e,n,t){t.r(n),t.d(n,{createSwipeBackGesture:function(){return u}});var r=t(1811),i=t(9507),a=t(7909),u=function(e,n,t,u,c){var o=e.ownerDocument.defaultView,d=(0,i.i)(e),f=function(e){return d?-e.deltaX:e.deltaX};return(0,a.createGesture)({el:e,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(e){return function(e){var n=e.startX;return d?n>=o.innerWidth-50:n<=50}(e)&&n()},onStart:t,onMove:function(e){var n=f(e)/o.innerWidth;u(n)},onEnd:function(e){var n=f(e),t=o.innerWidth,i=n/t,a=function(e){return d?-e.velocityX:e.velocityX}(e),u=a>=0&&(a>.2||n>t/2),s=(u?1-i:i)*t,l=0;if(s>5){var h=s/Math.abs(a);l=Math.min(h,540)}c(u,i<=0?.01:(0,r.j)(0,i,.9999),l)}})}}}]);
//# sourceMappingURL=22.ad1be809.chunk.js.map