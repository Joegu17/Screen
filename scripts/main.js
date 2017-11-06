// JavaScript Document
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

//screen.orientation.lock('portrait-primary');

var w = window.innerWidth,
    h = window.innerHeight;

$('.hintergrund').css({width: w+'px', height: h+'px'});
//$('#startButton').css({width: actualW*0.6+'px', height: actualH*0.1+'px', left: w/2+'px', top: h/2+'px'});

window.addEventListener('orientationchange', resize);

function resize() {
    
    w = window.innerWidth;
    h = window.innerHeight;
        
    $('.hintergrund').css({width: h+'px', height: w+'px'});
        
}