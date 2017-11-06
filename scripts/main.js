// JavaScript Document
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

//screen.orientation.lock('portrait-primary');

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

$('.hintergrund').css({width: actualW+'px', height: actualH+'px', left: borderLeft+'px', top: borderTop+'px'});
//$('#startButton').css({width: actualW*0.6+'px', height: actualH*0.1+'px', left: w/2+'px', top: h/2+'px'});

window.addEventListener('orientationchange', resize);

function resize() {
    
    w = window.innerWidth;
    h = window.innerHeight;
    actualW = w;
    actualH = h;
    borderLeft = 0;
    borderTop = 0;
    
    if (h < w*16/9) {
    
    actualW = h/16*9;
    borderLeft = (w-actualW)/2;
    
    } else {
    
    actualH = w*16/9;
    borderTop = (h-actualH)/2;
        
    }
        
    $('.hintergrund').css({width: actualW+'px', height: actualH+'px', left: borderLeft+'px', top: borderTop+'px'});
        
}