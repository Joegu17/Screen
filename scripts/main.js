// JavaScript Document
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;


var w = window.innerWidth,
    h = window.innerHeight,
    actualW = w,
    actualH = h,
    borderLeft = 0,
    borderTop = 0;

if (h < w*16/9) {
    
    actualW = h/16*9;
    borderLeft = (w-actualW)/2;
    
} else {
    
    actualH = w*16/9;
    borderTop = (h-actualH)/2;
    
}

$('.hintergrund').css({width: actualW+'px', height: actualH+'px', 
                       left: borderLeft+'px', top: borderTop+'px'});