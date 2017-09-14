// JavaScript Document
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;


var db;
function initDB() {
    
    db = window.openDatabase('Database', 1.0, 'AppGame', 2097152);
    db.transaction(createTB, errorCB);
    
}
function createTB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS StarSystems(coordX, coordY, radius)');
}
function errorCB(err) {
    alert(err);
}

function gameLoop() {
    
    universe.focus.update();
    
    window.requestAnimationFrame(gameLoop);
    
};

function generateRandomUniverse(numOfSystems) {
    
    var systemData = [],
        planetData = [];
    
    for (var i = 0; i < numOfSystems; i++) {
        
        var newSystem = {},
            numOfPlanets = getRandomInt(1, 5);
        
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
        
        var orbitDirection = getRandomInt(1, 2),
            orbits = [0, 1, 2, 3, 4];
        for (var j = 0; j < numOfPlanets; j++) {
            
            var newPlanet = [];
            
            var speed,
                rotation;
            if (orbitDirection == 1) {
                speed = getRandomInt(-50, -10);
                rotation = getRandomInt(-180, -1);
            } else {
                speed = getRandomInt(10, 50);
                rotation = getRandomInt(1, 180);
            }
            
            var randOrbitIndex = getRandomInt(0, orbits.length - 1);
            newPlanet.orbit = orbits[randOrbitIndex];
            orbits.splice(randOrbitIndex, 1);
            
            newPlanet.orbitSpeed = speed / 100;
            newPlanet.rotation = rotation;
            newSystem.radius = Math.round(getRandomInt(15, 21)) / 1000;
            
            planetData.push(newPlanet);
            
        }
        
    }
    
    return systemData;
    
};

var game = {
    
    init: function() {
        
        var w = window.innerWidth + 20,
            h = window.innerHeight + 20;
        
        $('#universe').css({width: w+'px', height: h+'px'});
        $('#systems').css('-webkit-transform', 'translate3d('+w/2+'px, '+h/2+'px, 0px)');
        $('#systems').css('transform', 'translate3d('+w/2+'px, '+h/2+'px, 0px)');
        
        var systems = generateRandomUniverse(30);
        universe.render(systems);
        
        gameLoop();
        
    }
};

var universe = {
    
    systems: [],
    render: function(data) {
        
        var w = window.innerWidth * 2;
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
            
            universe.touchCoord = {x: touch.pageX, y: touch.pageY, id: touch.identifier};
            universe.focus.frame = universe.focus.frames;
            
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
                        y = parseInt((dif.moveY + universe.systems[i].coords.y)*10)/10,
                        r = universe.systems[i].radius;
                    
                    universe.systems[i].realTimeCoords.x = x;
                    universe.systems[i].realTimeCoords.y = y;
                    
                    $('#system_'+i).css('-webkit-transform', 'translate3d('+(x - r)+'px, '+(y - r)+'px, 0px)');
                    $('#system_'+i).css('transform', 'translate3d('+(x - r)+'px, '+(y - r)+'px, 0px)');
                    
                }
                
            }
            
        }
        
    },
    touchEnd: function(e) {
        
        for (var i = 0; i < e.changedTouches.length; i++) {
            
            if (e.changedTouches[i].identifier == universe.touchCoord.id) {
                
                var k = e.changedTouches.length - 1,
                    endCoords = {x: e.changedTouches[k].pageX, y:   e.changedTouches[k].pageY},
                    dif = {moveX: endCoords.x - universe.touchCoord.x, moveY: endCoords.y - universe.touchCoord.y};
                
                alert(e.changedTouches[0]+'   '+e.changedTouches[k])
                
                var focus,
                    dist = 0;
                
                for (var j = 0; j < universe.systems.length; j++) {
                    
                    var line;
                    
                    var x = dif.moveX + universe.systems[j].coords.x,
                        y = dif.moveY + universe.systems[j].coords.y;
                    
                    line = lineDistance({x: 0, y: 0}, {x: x, y: y});
                    
                    universe.systems[j].endCoords = {x: x, y: y};
                    
                    if (line < dist || i == 0) {
                        
                        dist = line;
                        focus = universe.systems[j];
                        
                    }
                    
                }
                
                universe.focus.init(focus);
                
            }
            
        }
        
    },
    focus: {
        
        frame:  30,
        frames: 30,
        cange: {},
        init: function(f) {
            
            var moveX = -f.endCoords.x;
            var moveY = -f.endCoords.y;
            
            universe.focus.cange = {x: moveX, y: moveY};
            
            universe.focus.frame = 0;
            
        },
        update: function() {
            
            var u = universe.focus;
            if (u.frame < u.frames) {
                
                u.frame++;
                
                for (var i = 0; i < universe.systems.length; i++) {
                    
                    var left = ease.outExpo(u.frame, universe.systems[i].endCoords.x, u.cange.x, u.frames),
                        top = ease.outExpo(u.frame, universe.systems[i].endCoords.y, u.cange.y, u.frames),
                        radius = universe.systems[i].radius;
                    
                    universe.systems[i].realTimeCoords = {x: left, y: top};
                    universe.systems[i].coords = {x: left, y: top};
                    
                    $('#system_'+i).css('-webkit-transform', 'translate3d('+(left - radius)+'px, '+(top - radius)+'px, 0px)');
                    $('#system_'+i).css('transform', 'translate3d('+(left - radius)+'px, '+(top - radius)+'px, 0px)');
                    
                }
                
            }
            
        }
        
    }
    
};