// JavaScript Document
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

function gameLoop() {
    
    universe.focus.update();
    
    window.requestAnimationFrame(gameLoop);
    
};

function generateRandomUniverse(numOfSystems) {
    
    var systemData = [];
    
    for (var i = 0; i < numOfSystems; i++) {
        
        var newSystem = {};
        
        var x, y, name;
        
        do {
            
            var collision = false;
            
            if (systemData.length == 0) {
                
                x = 0;
                y = 0;
                
            } else {
                
                x = getRandomInt(-200, 200) / 200;
                y = getRandomInt(-200, 200) / 200;
                
            }
            
            for (var j = 0; j < systemData.length; j++) {
                
                if (lineDistance({x: x, y: y}, {x: systemData[j].coordX, y: systemData[j].coordY}) < 0.3) {
                    
                    collision = true;
                    
                }
                
            }
            
        } while (collision == true);
        
        newSystem.coordX = x;
        newSystem.coordY = y;
        newSystem.radius = getRandomInt(300, 700) / 10000;
        
        systemData.push(newSystem);
        
    }
    
    return systemData;
    
};

var game = {
    
    init: function() {
        
        var w = window.innerWidth,
            h = window.innerHeight;
        
        $('#universe').css({width: w+'px', height: h+'px'});
        $('#systems').css('-webkit-transform', 'translate3d('+w/2+'px, '+h/2+'px, 0px)');
        $('#systems').css('transform', 'translate3d('+w/2+'px, '+h/2+'px, 0px)');
        
        var systems = generateRandomUniverse(30);
        universe.render(systems);
        
    }
};

var universe = {
    
    systems: [],
    render: function(data) {
        
        var w = window.innerWidth;
        for (var i = 0; i < data.length; i++) {
            
            var system = {};
            
            system.coords = {x: data[i].coordX * w, y: data[i].coordY * w};
            system.realTimeCoords = {x: data[i].coordX * w, y: data[i].coordY * w};
            system.endCoords = {x: data[i].coordX * w, y: data[i].coordY * w};
            system.radius = data[i].radius * w;
            
            universe.systems.push(system);
            
        }
        
        universe.draw();
        
    },
    draw: function() {
        
        for(var i = 0; i < universe.systems.length; i++) {
            
            var s = universe.systems[i];
            $('#systems').append('<div id="system_'+i+'" class="system" style="width:'+s.radius*2+'px; height:'+s.radius*2+'px;-webkit-transform:translate3d('+(s.coords.x - s.radius)+'px, '+(s.coords.y - s.radius)+'px, 0px);transform:translate3d('+(s.coords.x - s.radius)+'px, '+(s.coords.y - s.radius)+'px, 0px);"></div>');
            
        }
        
        var u = document.getElementById('universe');
        u.addEventListener('touchstart', universe.touchStart);
        u.addEventListener('touchmove', universe.touchMove);
        u.addEventListener('touchend', universe.touchEnd);
        
    },
    touchCoord: null,
    touchStart: function(e) {
        
        e.preventDefault();
        var touch = e.touches[0];
        
        if (e.touches.length == 1) {
            
            // Code
            universe.touchCoord = {x: touch.pageX, y: touch.pageY, id: touch.identifier};
            
        }
        
    },
    touchMove: function(e) {
        
        e.preventDefault();
        
        for (var i = 0; i < e.touches.length; i++) {
            
            if (e.touches[i].identifier == universe.touchCoord.id) {
                
                var touch = e.touches[0],
                    moveCoords = {x: touch.pageX, y: touch.pageY},
                    dif = {moveX: moveCoords.x - universe.touchCoord.x, moveY: moveCoords.y - universe.touchCoord.y};
                
                for (var i = 0; i < universe.systems.length; i++) {
                    
                    var x = parseInt((dif.moveX + universe.systems[i].coords.x)*10)/10,
                        y = parseInt((dif.moveY + universe.systems[i].coords.y)*10)/10;
                    
                    universe.systems[i].realTimeCoords.x = x;
                    universe.systems[i].realTimeCoords.y = y;
                    
                    $('#system_'+i).css('-webkit-transform', 'translate3d('+x+'px, '+y+'px, 0px)');
                    $('#system_'+i).css('transform', 'translate3d('+x+'px, '+y+'px, 0px)');
                    
                }
                
            }
            
        }
        
    },
    touchEnd: function(e) {
        
        for (var i = 0; i < e.changedTouches.length; i++) {
            
            if (e.changedTouches[i].identifier == universe.touchCoord.id) {
                
                var endCoords = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY},
                    dif = {moveX: endCoords.x - universe.touchCoord.x, moveY: endCoords.y - universe.touchCoord.y};
                
                for (var i = 0; i < universe.systems.length; i++) {
                    
                    var x = dif.moveX + universe.systems[i].coords.x,
                        y = dif.moveY + universe.systems[i].coords.y;
                    
                    universe.systems[i].endCoords = {x: x, y: y};
                    
                }
                
            }
            
        }
        
    },
    focus: {
        
        frame:  30,
        frames: 30,
        init: function() {
            
            
            universe.focus.frame = 0;
            
        },
        update: function() {
            
            if (universe.focus.frame < universe.focus.frames) {
                
                universe.focus.frame++;
                
            }
            
        }
        
    }
    
};