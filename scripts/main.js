// JavaScript Document
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

//screen.orientation.lock('portrait-primary');

var w = screen.width,
    h = screen.height;

$('.hintergrund').css({width: w+'px', height: h+'px'});
$('#klotz').css({width: w*0.125+'px', height: h*2/9+'px'});

