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
            
            universe.systems.push(system);
            
        }
        
        universe.draw();
        
    },
    draw: function() {
        
        for(var i = 0; i < universe.systems.length; i++) {
            
            var s = universe.systems[i];
            $('#systems').append('<div class="system" style="-webkit-transform:translate3d('+s.coords.x+'px, '+s.coords.y+'px, 0px);transform:translate3d('+s.coords.x+'px, '+s.coords.y+'px, 0px);"></div>');
            
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