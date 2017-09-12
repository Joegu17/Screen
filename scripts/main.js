// JavaScript Document


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
        
        systemData.push({coordX: x, coordY: y});
        
    }
    
    return systemData;
    
}

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
}

var universe = {
    
    systems: [],
    render: function(data) {
        
        var w = window.innerWidth;
        for (var i = 0; i < data.length; i++) {
            
            var system = {};
            
            system.coords = {x: data[i].coordX * w, y: data[i].coordY * w};
            system.realTimeCoords = {x: data[i].coordX * w, y: data[i].coordY * w};
            
            universe.systems.push(system);
            
        }
        
        universe.draw();
        
    },
    draw: function() {
        
        for(var i = 0; i < universe.systems.length; i++) {
            
            var s = universe.systems[i];
            $('#systems').append('<div id="system_'+i+'" class="system" style="-webkit-transform:translate3d('+s.coords.x+'px, '+s.coords.y+'px, 0px);transform:translate3d('+s.coords.x+'px, '+s.coords.y+'px, 0px);"></div>');
            
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
                
                // Code
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
                
                // Code
                
            }
            
        }
        
    }
}

function lineDistance(point1, point2) {
    
    var xs = 0,
        ys = 0;
    
    xs = Math.pow(point2.x - point1.x, 2);
    ys = Math.pow(point2.y - point1.y, 2);
    
    return Math.sqrt(xs + ys);
    
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function testAlert(alert) {
    $('#for_testing').css('display', 'block');
    $('#for_testing').append(alert);
}