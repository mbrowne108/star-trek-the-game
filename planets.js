const sun = {
    el: document.getElementById("sun"),
    name: "Sun",
    height: 100,
    width: 100 * (4/3),
    x: 3000,
    y: 3000,
}

const mercury = {
    el: document.getElementById("mercury"),
    name: 'Mercury',
    height: 3.8,
    width: 3.8 * (4/3),
    speed: 0.004787,
    theta: Math.random() * 2 * Math.PI,
    radius: 35 * 2,
    shadow: "rgb(225, 177, 101)"
}

const venus = {
    el: document.getElementById("venus"),
    name: 'Venus',
    speed: -(0.003502),
    height: 9.5,
    width: 9.5 * (4/3),
    theta: Math.random() * 2 * Math.PI,
    radius: 67 * 2,
    shadow: "rgb(203, 173, 115)"
}

const earth = {
    el: document.getElementById("earth"),
    name: 'Earth',
    speed: 0.002978,
    height: 10,
    width: 10 * (4/3),
    theta: Math.random() * 2 * Math.PI,
    radius: 93 * 2,
    shadow: "rgb(113, 115, 174)",
    hasMoon: true
}

const mars = {
    el: document.getElementById("mars"),
    name: 'Mars',
    speed: 0.0024077,
    height: 5.3,
    width: 5.3 * (4/3),
    theta: Math.random() * 2 * Math.PI,
    radius: 142 * 2,
    shadow: "rgb(203, 84, 14)"
}

const jupiter = {
    el: document.getElementById("jupiter"),
    name: 'Jupiter',
    height: 112,
    width: 112 * (4/3),
    speed: 0.001307,
    theta: Math.random() * 2 * Math.PI,
    radius: 484 * 2,
    shadow: "rgb(194, 142, 123)"
}

const saturn = {
    el: document.getElementById("saturn"),
    name: 'Saturn',
    height: 94.5,
    width: 94.5 * (4/3),
    speed: 0.000969,
    theta: Math.random() * 2 * Math.PI,
    radius: 889 * 2,
    shadow: "rgb(251, 204, 132)"
}

const uranus = {
    el: document.getElementById("uranus"),
    name: 'Uranus',
    height: 40,
    width: 40 * (4/3),
    speed: -(0.000681),
    theta: Math.random() * 2 * Math.PI,
    radius: 1790 * 2,
    shadow: "rgb(207, 245, 247)"
}

const neptune = {
    el: document.getElementById("neptune"),
    name: 'Neptune',
    height: 38.8,
    width: 38.8 * (4/3),
    speed: 0.000543,
    theta: Math.random() * 2 * Math.PI,
    radius: 2880 * 2,
    shadow: "rgb(72, 129, 255)"
}

const pluto = {
    el: document.getElementById("pluto"),
    name: 'Pluto',
    height: 2,
    width: 2 * (4/3),
    speed: 0.000474,
    theta: Math.random() * 2 * Math.PI,
    radius: 3670 * 2,
    shadow: "rgb(231, 175, 128)"
}

const moon = {
    el: document.getElementById("moon"),
    name: 'Moon',
    height: 2.7,
    width: 2.7 * (4/3),
    speed: 0.002978 * 12,
    theta: Math.random() * 2 * Math.PI,
    radius: 10 * 2,
    shadow: "rgb(245, 236, 237)"
}

const asteroidBelt = {
    num: 300,
    size: 10,
    speed: 0.0004077,
    radius: 300 * 2
}

const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto]