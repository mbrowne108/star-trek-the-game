let planetLockId = 0

const sun = {
    el: document.getElementById("sun"),
    music: '',
    name: "Sun",
    height: 1500,
    width: 1500,
    x: 3000,
    y: 3000
}

const mercury = {
    el: document.getElementById("mercury"),
    music: 'sounds/music/mercury.mp3',
    name: 'Mercury',
    height: 3.8 * sizeScale,
    width: 3.8 * (4/3) * sizeScale,
    speed: 0.002787,
    theta: Math.random() * 2 * Math.PI,
    radius: 35 * 6,
    locked: false,
    passengers: 120,
    moons: []
}

const venus = {
    el: document.getElementById("venus"),
    music: 'sounds/music/venus.mp3',
    name: 'Venus',
    speed: -(0.002202),
    height: 9.5 * sizeScale,
    width: 9.5 * (4/3) * sizeScale,
    theta: Math.random() * 2 * Math.PI,
    radius: 67 * 6,
    locked: false,
    passengers: 340,
    moons: []
}

const earth = {
    el: document.getElementById("earth"),
    music: 'sounds/music/earth.mp3',
    name: 'Earth',
    speed: 0.001578,
    height: 10 * sizeScale,
    width: 10 * (4/3) * sizeScale,
    theta: Math.random() * 2 * Math.PI,
    radius: 93 * 6,
    locked: false,
    passengers: 0,
    moons: [{
        el: document.getElementById("moon"),
        name: 'Moon',
        height: 2.7 * sizeScale,
        width: 2.7 * sizeScale,
        speed: 0.0001478 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 5 * 10,
        locked: false
    }]
}

const mars = {
    el: document.getElementById("mars"),
    music: 'sounds/music/mars.mp3',
    name: 'Mars',
    speed: 0.0014077,
    height: 5.3 * sizeScale,
    width: 5.3 * (4/3) * sizeScale,
    theta: Math.random() * 2 * Math.PI,
    radius: 142 * 6,
    locked: false,
    passengers: 881,
    moons: [{
        el: document.getElementById("phobos"),
        name: 'Phobos',
        height: 1 * sizeScale,
        width: 1 * sizeScale,
        speed: 0.0001073 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 3 * 10,
        locked: false
    },
    {
        el: document.getElementById("deimos"),
        name: 'Deimos',
        height: 0.9 * sizeScale,
        width: 0.9 * sizeScale,
        speed: 0.0001478 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 5 * 10,
        locked: false
    }]
}

const jupiter = {
    el: document.getElementById("jupiter"),
    music: 'sounds/music/jupiter.mp3',
    name: 'Jupiter',
    height: 112 * sizeScale * 0.75,
    width: 112 * (4/3) * sizeScale * 0.75,
    speed: 0.000807,
    theta: Math.random() * 2 * Math.PI,
    radius: 484 * 6,
    passengers: 749,
    locked: false,
    moons: [{
        el: document.getElementById("io"),
        name: 'Io',
        height: 3.6 * sizeScale,
        width: 3.6 * sizeScale,
        speed: 0.0001073 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 22 * 10,
        locked: false
    },
    {
        el: document.getElementById("europa"),
        name: 'Europa',
        height: 3.1 * sizeScale,
        width: 3.1 * sizeScale,
        speed: 0.0001478 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 29 * 10,
        locked: false
    },
    {
        el: document.getElementById("ganymede"),
        name: 'Ganymede',
        height: 5.2 * sizeScale,
        width: 5.2 * sizeScale,
        speed: 0.0002173 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 38 * 10,
        locked: false
    },
    {
        el: document.getElementById("callisto"),
        name: 'Callisto',
        height: 4.8 * sizeScale,
        width: 4.8 * sizeScale,
        speed: 0.0001978 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 51 * 10,
        locked: false
    }]
}

const saturn = {
    el: document.getElementById("saturn"),
    music: 'sounds/music/title-screen.mp3',
    name: 'Saturn',
    height: 94.5 * sizeScale * 0.75,
    width: 94.5 * (4/3) * sizeScale * 0.75,
    speed: 0.000469,
    theta: Math.random() * 2 * Math.PI,
    radius: 889 * 6,
    passengers: 601,
    locked: false,
    moons: [{
        el: document.getElementById("tethys"),
        name: 'Tethys',
        height: 1.06 * sizeScale,
        width: 1.06 * sizeScale,
        speed: 0.0001073 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 27 * 10,
        locked: false
    },
    {
        el: document.getElementById("dione"),
        name: 'Dione',
        height: 3.1 * sizeScale,
        width: 3.1 * sizeScale,
        speed: 0.0001478 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 36 * 10,
        locked: false
    },
    {
        el: document.getElementById("rhea"),
        name: 'Rhea',
        height: 1.52 * sizeScale,
        width: 1.52 * sizeScale,
        speed: 0.0002173 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 44 * 10,
        locked: false
    },
    {
        el: document.getElementById("titan"),
        name: 'Titan',
        height: 5.15 * sizeScale,
        width: 5.15 * sizeScale,
        speed: 0.0001978 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 55 * 10,
        locked: false
    },
    {
        el: document.getElementById("iapetus"),
        name: 'Iapetus',
        height: 1.47 * sizeScale,
        width: 1.47 * sizeScale,
        speed: 0.0001978 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 64 * 10,
        locked: false
    }]
}

const uranus = {
    el: document.getElementById("uranus"),
    music: 'sounds/music/uranus.mp3',
    name: 'Uranus',
    height: 40 * sizeScale,
    width: 40 * (4/3) * sizeScale,
    speed: -(0.000381),
    theta: Math.random() * 2 * Math.PI,
    radius: 1790 * 6,
    locked: false,
    passengers: 117,
    moons: [{
        el: document.getElementById("umbriel"),
        name: 'Umbriel',
        height: 2.89 * sizeScale,
        width: 2.89 * sizeScale,
        speed: 0.0001073 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 16 * 10,
        locked: false
    },
    {
        el: document.getElementById("titania"),
        name: 'Titania',
        height: 3.89 * sizeScale,
        width: 3.89 * sizeScale,
        speed: 0.0001478 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 23 * 10,
        locked: false
    },
    {
        el: document.getElementById("oberon"),
        name: 'Oberon',
        height: 3.68 * sizeScale,
        width: 3.68 * sizeScale,
        speed: 0.0002173 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 31 * 10,
        locked: false
    }]
}

const neptune = {
    el: document.getElementById("neptune"),
    music: 'sounds/music/neptune.mp3',
    name: 'Neptune',
    height: 38.8 * sizeScale,
    width: 38.8 * (4/3) * sizeScale,
    speed: 0.000243,
    theta: Math.random() * 2 * Math.PI,
    radius: 2880 * 6,
    locked: false,
    passengers: 433,
    moons: [{
        el: document.getElementById("triton"),
        name: 'Triton',
        height: 3 * sizeScale,
        width: 3 * sizeScale,
        speed: 0.0001073 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 19 * 10,
        locked: false
    }]
}

const pluto = {
    el: document.getElementById("pluto"),
    music: 'sounds/music/pluto.mp3',
    name: 'Pluto',
    height: 2 * sizeScale,
    width: 2 * (4/3) * sizeScale,
    speed: 0.0000274,
    theta: Math.random() * 2 * Math.PI,
    radius: 3670 * 6,
    locked: false,
    passengers: 210,
    moons: [{
        el: document.getElementById("charon"),
        name: 'Charon',
        height: 1 * sizeScale,
        width: 1 * sizeScale,
        speed: 0.0001073 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 3 * 10,
        locked: false
    }]
}

const asteroidBelt = {
    num: 300,
    size: 20,
    speed: 0.00002077,
    radius: 300 * 6
}

const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto]

let totalPassengers = 0
planets.map((planet) => totalPassengers += planet.passengers)

function lockedOnPlanetView(planet) {
    ctx.lineWidth = 10
    if (planet.x + planet.width / 2 + cameraOffset.x < 0 || 
        planet.x + planet.width / 2 + cameraOffset.x > canvas.width ||
        planet.y + planet.width / 2 + cameraOffset.y < 0 ||
        planet.y + planet.width / 2 + cameraOffset.y > canvas.height
    ) {
        ctx.lineWidth = 5 / scale
        ctx.setLineDash([50, 50])
        ctx.strokeStyle = "rgba(0, 155, 255, 0.5)";
        ctx.lineDashOffset = 50
        ctx.beginPath();
        ctx.moveTo(ship.x + cameraOffset.x, ship.y + cameraOffset.y);
        ctx.lineTo(planet.x + cameraOffset.x + planet.width / 2, planet.y + cameraOffset.y + planet.height / 2);
        ctx.stroke();
        ctx.setLineDash([])
    } else {
        ctx.strokeStyle = "rgb(0, 155, 255)";
        ctx.lineWidth = 1 / scale
        ctx.beginPath();
        ctx.moveTo(planet.x + planet.width / 2 + cameraOffset.x - 10 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y - 30 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x - 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y - 30 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x - 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y - 10 * planet.height / 30);
        ctx.moveTo(planet.x + planet.width / 2 + cameraOffset.x - 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y + 10 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x - 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y + 30 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x - 10 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y + 30 * planet.height / 30);
        ctx.moveTo(planet.x + planet.width / 2 + cameraOffset.x + 10 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y + 30 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x + 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y + 30 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x + 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y + 10 * planet.height / 30);
        ctx.moveTo(planet.x + planet.width / 2 + cameraOffset.x + 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y - 10 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x + 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y - 30 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x + 10 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y - 30 * planet.height / 30);
        ctx.stroke();
    }
}

function drawSun() {
    ctx.drawImage(sun.el, sun.x - (sun.width / 2) + cameraOffset.x, sun.y - (sun.height / 2) + cameraOffset.y, sun.width, sun.height)
}

function drawPlanet(planet) {
    // Draw orbit
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.strokeStyle = 'rgb(100,100,100)'
    ctx.lineWidth = 1 / scale
    ctx.arc(sun.x + cameraOffset.x, sun.y + cameraOffset.y, planet.radius, 0, 2 * Math.PI)
    ctx.stroke()

    // Locked on
    if (planet.locked && ship.scanning) {
        lockedOnPlanetView(planet)
    }

    // Planet movement
    planet.theta -= planet.speed
    planet.x = Math.cos(planet.theta) * planet.radius + sun.x - planet.width / 2
    planet.y = Math.sin(planet.theta) * planet.radius + sun.y - planet.height / 2
    ctx.drawImage(planet.el, planet.x + cameraOffset.x, planet.y + cameraOffset.y, planet.width, planet.height)

    // Moon orbit and movement
    planet.moons.map((moon) => {
        ctx.strokeStyle = 'rgba(100,100,100,0.5)'
        ctx.lineWidth = 1 / scale
        ctx.beginPath()
        ctx.arc(planet.x + (planet.width / 2) + cameraOffset.x, planet.y + (planet.height / 2) + cameraOffset.y, moon.radius, 0, 2 * Math.PI)
        ctx.stroke()

        moon.theta -= moon.speed
        moon.x = Math.cos(moon.theta) * moon.radius + planet.x + moon.width
        moon.y = Math.sin(moon.theta) * moon.radius + planet.y + moon.height
        ctx.drawImage(moon.el, moon.x + cameraOffset.x + (planet.width / 2) - (moon.width * 1.5), moon.y + cameraOffset.y + (planet.height / 2) - (moon.height * 1.5), moon.width, moon.height)
    })
}