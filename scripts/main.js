// JavaScript Document
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

var w = screen.width,
    h = screen.height,
    d = 1;

$('.hintergrund').css({width: w+'px', height: h+'px'});
$('#klotz').css({width: h*3/18/242*353+'px', height: h*3/18+'px'});
$('#level1').css({width: h*10+'px', height: h+'px'});



function loop() {
    
    if (d == 1) {
        
        $('#level1').css('transform', 'translate3d('+(-h*10+w)+'px, 0px, 0px)');
        
        
        //$('#klotz').css('transform', 'translate3d('+(-w-h*3/18/242*353)+'px, 0px, 0px)');
        
        //$('#bild').css('background-image', 'url(../images/banger_ball.bmp)');
        
        //$('#bild').css({'background-image': 'url(../images/banger_ball.bmp)'});
        
        //$('#bild1').css({display: 'none'});
        
        //$('#bild2').css({display: 'inherit'});
        
    } else {
        
        $('#level1').css('transform', 'none');
        
        
        
        //$('#klotz').css('transform', 'none');
        
        //$('#bild').css('background-image', 'url(../images/beach_ball.png)');
        
        //$('#bild').css({'background-image': 'url(../images/beach_ball.png)'});
        
        //$('#bild1').css({display: 'inherit'});
        
        //$('#bild2').css({display: 'none'});
        
    }
    
    d = d * (-1);
    
    window.setTimeout(loop, 30000);
    
}

loop();