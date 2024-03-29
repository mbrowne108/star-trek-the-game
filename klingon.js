const klingons = []
let lockId = 0
const disrSpeed = 250
const klingonThrust = 5
const maxKlingonShields = 1020

function spawnInitialKlingons() {
    let x, y;
    for (let i = 0; i < 3; i++) {
        x = (Math.random() * 2800) + 3000;
        y = (Math.random() * 2800) + 3000;
        klingons.push(newKlingon(x, y));
    }
}

function spawnNewKlingon() {
    let random = Math.floor(Math.random() * 1000)
    if (random === 1) {
        fxKlingonCloak.play()
        let x = (Math.random() * 2800) + 3000;
        let y = (Math.random() * 2800) + 3000;
        klingons.push(newKlingon(x, y));
        alert('NEW KLINGON SHIP UNCLOAKED')
    }
}

function newKlingon(x, y) {
    let klingon = {
        el: document.getElementById("klingon"),
        elThrust: document.getElementById("klingon-thrusting"),
        trail: document.getElementById("klingon-trail"),
        name: "Klingon",
        x: x,
        y: y,
        height: 35,
        width: 35,
        a: 180 * Math.PI,
        trailPositions: [],
        disruptors: [],
        torpCount: 10,
        torpedoes: [],
        particles: [],
        thrusting: false,
        braking: false,
        attacking: true,
        locked: false,
        shields: maxKlingonShields,
        hull: 255,
        exploding: false,
        thrust: {
            x: 0,
            y: 0
        }
    }
    return klingon;
}

const klingonTorpedo = {
    el: document.getElementById("torpedo"),
    height: ship.height / 2,
    width: ship.width / 2,
    shadow: 'rgb(248,58,37)'
}

const disruptor = {
    el: document.getElementById("disruptor"),
    height: ship.height,
    width: ship.width * 1.95,
    shadow: 'rgb(6, 152, 27)'
}

function lockedOnKlingonView(klingon) {
    ctx.lineWidth = 10
    if (klingon.x + klingon.width / 2 + cameraOffset.x < 0 || 
        klingon.x + klingon.width / 2 + cameraOffset.x > canvas.width ||
        klingon.y + klingon.width / 2 + cameraOffset.y < 0 ||
        klingon.y + klingon.width / 2 + cameraOffset.y > canvas.height
    ) {
        ctx.lineWidth = 5
        ctx.setLineDash([50, 50])
        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
        ctx.lineDashOffset = 50
        ctx.beginPath();
        ctx.moveTo(ship.x + cameraOffset.x, ship.y + cameraOffset.y);
        ctx.lineTo(klingon.x + cameraOffset.x, klingon.y + cameraOffset.y);
        ctx.stroke()
        ctx.setLineDash([])
    } else {
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.lineWidth = 1
        ctx.beginPath();
        ctx.moveTo(klingon.x + cameraOffset.x - 10 - klingon.thrust.x, klingon.y + cameraOffset.y - 30 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x - 30 - klingon.thrust.x, klingon.y + cameraOffset.y - 30 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x - 30 - klingon.thrust.x, klingon.y + cameraOffset.y - 10 - klingon.thrust.y);
        ctx.moveTo(klingon.x + cameraOffset.x - 30 - klingon.thrust.x, klingon.y + cameraOffset.y + 10 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x - 30 - klingon.thrust.x, klingon.y + cameraOffset.y + 30 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x - 10 - klingon.thrust.x, klingon.y + cameraOffset.y + 30 - klingon.thrust.y);
        ctx.moveTo(klingon.x + cameraOffset.x + 10 - klingon.thrust.x, klingon.y + cameraOffset.y + 30 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x + 30 - klingon.thrust.x, klingon.y + cameraOffset.y + 30 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x + 30 - klingon.thrust.x, klingon.y + cameraOffset.y + 10 - klingon.thrust.y);
        ctx.moveTo(klingon.x + cameraOffset.x + 30 - klingon.thrust.x, klingon.y + cameraOffset.y - 10 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x + 30 - klingon.thrust.x, klingon.y + cameraOffset.y - 30 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x + 10 - klingon.thrust.x, klingon.y + cameraOffset.y - 30 - klingon.thrust.y);
        ctx.stroke()
    }
}

function klingonShields(klingon) {
    ctx.lineWidth = 2
    ctx.shadowColor = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 1)`;
    ctx.shadowBlur = 10
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 1)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x - klingon.thrust.x, klingon.y + cameraOffset.y - klingon.thrust.y, klingon.height / 1.1, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.7)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x - klingon.thrust.x, klingon.y + cameraOffset.y - klingon.thrust.y, klingon.height / 1.2, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.5)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x - klingon.thrust.x, klingon.y + cameraOffset.y - klingon.thrust.y, klingon.height / 1.3, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.3)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x - klingon.thrust.x, klingon.y + cameraOffset.y - klingon.thrust.y, klingon.height / 1.4, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.2)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x - klingon.thrust.x, klingon.y + cameraOffset.y - klingon.thrust.y, klingon.height / 1.5, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.1)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x - klingon.thrust.x, klingon.y + cameraOffset.y - klingon.thrust.y, klingon.height / 1.6, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.shadowBlur = 0
}

function drawKlingonExplosion(klingon) {
    fxKlingonExplodes.play()
    klingon.particles.forEach((particle, i) => {
        ctx.globalAlpha = particle.alpha;
        ctx.shadowColor = 'rgb(200, 0, 0)'
        ctx.shadowBlur = 10
        if (particle.random === 0) {
            ctx.beginPath();
            ctx.fillStyle = `rgb(${255 - (particle.increment * 158/100)}, ${particle.increment * 94/100}, ${particle.increment * 92/100})`;
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
            ctx.fill();
        } 
        else if (particle.random === 1) {
            ctx.beginPath();
            ctx.fillStyle = `rgb(${255 - (particle.increment * 103/100)}, ${255 - (particle.increment * 101/100)}, ${particle.increment * 142/100})`;
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.fillStyle = `rgb(${255 - (particle.increment)}, ${80 + (particle.increment * 78/100)}, ${particle.increment * 148/100})`;
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
            ctx.fill();
        }
        
        particle.alpha -= 0.01
        particle.x += particle.dx
        particle.y += particle.dy
        particle.increment += 1.35

        if (particle.alpha <= 0) {
            klingon.particles.splice(i, 1)
        }

        ctx.shadowBlur = 0
        ctx.globalAlpha = 1;
    })
}

const klingonMotionTrailLength = 20
function storeLastKlingonPosition(klingon) {
    klingon.trailPositions.push({
        x: klingon.x,
        y: klingon.y
    })
    if (klingon.trailPositions.length > klingonMotionTrailLength) {
        klingon.trailPositions.shift()
    }
}

function drawKlingonTrail(klingon) {
    for (let i = 0; i < klingon.trailPositions.length; i++) {
        let ratio = (i + 2) / klingon.trailPositions.length
        ctx.drawImage(
            klingon.trail, 
            klingon.trailPositions[i].x + cameraOffset.x - klingon.width / 12, 
            klingon.trailPositions[i].y + cameraOffset.y - klingon.height / 12, 
            (klingon.width / 4) * ratio, 
            (klingon.height / 4) * ratio
        )
    }
}

function fireWeapons(klingon) {
    let random = Math.floor(Math.random() * 1000)
    if (distBetweenPoints(ship.x, ship.y, klingon.x, klingon.y) < 500) {
        if (random >= 0 && random < 100) {
            fxDisurptor.play()
            klingon.disruptors.push({
                x: klingon.x + 4/3 * klingon.height / 2 * Math.cos(klingon.a) + 12,
                y: klingon.y - 4/3 * klingon.height / 2 * Math.sin(klingon.a) + 12,
                xv: disrSpeed * Math.cos(klingon.a) / FPS,
                yv: -disrSpeed * Math.sin(klingon.a) / FPS
            })
        } else if (random >= 100 && random < 200) {
            fxDisurptor.play()
            klingon.disruptors.push({
                x: klingon.x + 4/3 * klingon.height / 1.7 * Math.cos(klingon.a) - 12,
                y: klingon.y - 4/3 * klingon.height / 1.7 * Math.sin(klingon.a) - 12,
                xv: disrSpeed * Math.cos(klingon.a) / FPS,
                yv: -disrSpeed * Math.sin(klingon.a) / FPS
            })
        } else if (random >= 800 && random < 805) {
            fireKlingonTorpedoes(klingon)
        }
    } 
}

function drawDisruptors(klingon) {
    for (let i = 0; i < klingon.disruptors.length; i++) {
        ctx.save();
        ctx.translate(klingon.disruptors[i].x + cameraOffset.x, klingon.disruptors[i].y + cameraOffset.y);
        ctx.rotate(-klingon.a - 90 * Math.PI / 180)
        ctx.translate(-(klingon.disruptors[i].x + cameraOffset.x), -(klingon.disruptors[i].y + cameraOffset.y));
        ctx.drawImage(disruptor.el, klingon.disruptors[i].x + cameraOffset.x, klingon.disruptors[i].y + cameraOffset.y, klingon.width / 1.95 / 4, klingon.height / 4)
        ctx.restore()
    }

    for (let i = 0; i < klingon.disruptors.length; i++) {
        klingon.disruptors[i].x += klingon.disruptors[i].xv + klingon.thrust.x;
        klingon.disruptors[i].y += klingon.disruptors[i].yv + klingon.thrust.y;
    }

    // Disruptor hits
    let sr = ship.height
    if (!ship.exploding) {
        for (let i = klingon.disruptors.length - 1; i >= 0; i--) {
            ship.shields <= 0 ? sr = ship.height / 2 : sr = ship.height
            if (distBetweenPoints(ship.x, ship.y, klingon.disruptors[i].x, klingon.disruptors[i].y) < sr) {
                klingon.disruptors.splice(i, 1)
                if (ship.shields > 0 && ship.redAlert) {
                    !ship.exploding ? drawShipShields() : null
                    ship.shields -= 20
                } else if ((ship.shields <= 0 && ship.hull > 0 && ship.redAlert) || (!ship.redAlert && ship.hull > 0)) {
                    ship.hull -= 20
                } else if (ship.hull <= 0) {
                    ship.hull = 0
                    explodeShip()
                }
            }
        }
    }
}

function fireKlingonTorpedoes(klingon) {
    fxKlingonTorpedo.play()
    klingon.torpCount -= 1
    if (klingon.torpCount > 0) {
        klingon.torpedoes.push({
            x: klingon.x + 4/3 * klingon.height / 1.7 * Math.cos(klingon.a),
            y: klingon.y - 4/3 * klingon.height / 1.7 * Math.sin(klingon.a),
            xv: torpSpeed * Math.cos(klingon.a) / FPS,
            yv: -torpSpeed * Math.sin(klingon.a) / FPS
        })
    }
}

function drawKlingonTorpedoes(klingon) {
    for (let i = 0; i < klingon.torpedoes.length; i++) {
        ctx.shadowColor = klingon.torpedoes[i].shadow
        ctx.shadowBlur = klingon.torpedoes[i].height * 3
        ctx.drawImage(klingonTorpedo.el, klingon.torpedoes[i].x + cameraOffset.x, klingon.torpedoes[i].y + cameraOffset.y, klingon.width / 2, klingon.height / 2)
        ctx.shadowBlur = 0

        klingon.torpedoes[i].x += klingon.torpedoes[i].xv + klingon.thrust.x;
        klingon.torpedoes[i].y += klingon.torpedoes[i].yv + klingon.thrust.y;
    }

    // Torpedo hits
    let sr = ship.height
    for(let i = klingon.torpedoes.length - 1; i >=0; i--) {
        ship.shields <= 0 ? sr = ship.height / 2 : sr = ship.height
        if (distBetweenPoints(ship.x, ship.y, klingon.torpedoes[i].x, klingon.torpedoes[i].y) < sr) {
            ship.torpedoes.splice(i, 1)
            if (ship.shields > 0 && ship.redAlert) {
                !ship.exploding ? drawShipShields() : null
                ship.shields -= 20
            } else if ((ship.shields <= 0 && ship.hull > 0 && ship.redAlert) || (!ship.redAlert && ship.hull > 0)) {
                ship.hull -= 20
            } else if (ship.hull <= 0) {
                ship.hull = 0
                explodeShip()
            }
        }
    }
}

function drawKlingons() {
    // if (klingons.length < 9) spawnNewKlingon()
    if (klingons.length < 3) spawnNewKlingon()

    for (let i = 0; i < klingons.length; i++) {
        distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) > 5000 ? klingons[i].attacking = false : klingons[i].attacking = true
        klingons[i].shields < 350 ? klingons[i].attacking = false : klingons[i].attacking = true;
        klingons[i].hull < 100 && klingons[i].shields < 350 ? klingons[i].attacking = true : null

        if (!klingons[i].exploding) {
            if ((klingons[i].thrust.x > 0.1 || klingons[i].thrust.x < -0.1) || (klingons[i].thrust.y > 0.1 || klingons[i].thrust.y < -0.1)) {
                drawKlingonTrail(klingons[i])
            }
            if (!ship.exploding && klingons[i].attacking) {
                fireWeapons(klingons[i])
            }
        } else {
            klingons[i].locked = false
            drawKlingonExplosion(klingons[i])
        }

        drawDisruptors(klingons[i]);
        drawKlingonTorpedoes(klingons[i]);

        ctx.save();
        if (klingons[i].attacking) {
            klingons[i].a = Math.atan2(-(ship.y + cameraOffset.y - (klingons[i].y + cameraOffset.y)), (ship.x + cameraOffset.x - (klingons[i].x + cameraOffset.x))) + (Math.PI / 2) / FPS // Point towards ship
        } else {
            let random = Math.floor(Math.random() * 500)
            if (random === 0) {
                klingons[i].a = Math.atan2((ship.y + cameraOffset.y - (klingons[i].y + cameraOffset.y)), -(ship.x + cameraOffset.x - (klingons[i].x + cameraOffset.x))) + (Math.PI / 2) + 1/ FPS
            } else if (random === 1) {
                klingons[i].a = Math.atan2((ship.y + cameraOffset.y - (klingons[i].y + cameraOffset.y)), -(ship.x + cameraOffset.x - (klingons[i].x + cameraOffset.x))) + (Math.PI / 2) - 1 / FPS
            } else if (random === 2) {
                klingons[i].a = Math.atan2((ship.y + cameraOffset.y - (klingons[i].y + cameraOffset.y)), -(ship.x + cameraOffset.x - (klingons[i].x + cameraOffset.x))) + (Math.PI / 2) + 0.5 / FPS
            } else if (random === 3) {
                klingons[i].a = Math.atan2((ship.y + cameraOffset.y - (klingons[i].y + cameraOffset.y)), -(ship.x + cameraOffset.x - (klingons[i].x + cameraOffset.x))) + (Math.PI / 2) - 0.5 / FPS
            } else if (random === 4) {
                klingons[i].a = Math.atan2((ship.y + cameraOffset.y - (klingons[i].y + cameraOffset.y)), -(ship.x + cameraOffset.x - (klingons[i].x + cameraOffset.x))) + (Math.PI / 2) / FPS // Point away from ship
            } else {
                null
            }
        }
        ctx.translate(klingons[i].x + cameraOffset.x, klingons[i].y + cameraOffset.y);
        ctx.rotate(-klingons[i].a + 90 * Math.PI / 180)
        ctx.translate(-(klingons[i].x + cameraOffset.x), -(klingons[i].y + cameraOffset.y));
        !klingons[i].exploding ? ctx.drawImage(klingons[i].thrusting ? klingons[i].elThrust : klingons[i].el, klingons[i].x - (klingons[i].width / 2) + cameraOffset.x, klingons[i].y - (klingons[i].height / 2) + cameraOffset.y, klingons[i].width, klingons[i].height) : null
        ctx.restore()

        // Thursting and Braking
        if (klingons[i].attacking) {
            if (distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) >= 500) {
                klingons[i].thrusting = true
                klingons[i].braking = false
            } else if (distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) < 500 && distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) >= 150) {
                klingons[i].thrusting = false
                klingons[i].braking = false
            } else if (distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) < 150) {
                klingons[i].thrusting = false
                klingons[i].braking = true
            }
        } else {
            if (distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) < 1000) {
                klingons[i].thrusting = true
                klingons[i].braking = false
            } else if (distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) > 1000 && distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) <= 4000){
                klingons[i].thrusting = false
                klingons[i].braking = false
            } else if (distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) > 4000) {
                klingons[i].thrusting = false
                klingons[i].braking = true
            }
        }

        // Move Klingon
        if (klingons[i].thrusting && klingons[i].thrust.x <= maxThrust && klingons[i].thrust.x >= -maxThrust && klingons[i].thrust.y <= maxThrust && klingons[i].thrust.y >= -maxThrust) {
            klingons[i].thrust.x += klingonThrust * Math.cos(klingons[i].a) / FPS;
            klingons[i].thrust.y -= klingonThrust * Math.sin(klingons[i].a) / FPS;
        } else {
            klingons[i].thrust.x -= friction * klingons[i].thrust.x / FPS;
            klingons[i].thrust.y -= friction * klingons[i].thrust.y / FPS;
        }
        if (klingons[i].braking) {
            klingons[i].thrust.x -= 3 * friction * klingons[i].thrust.x / FPS;
            klingons[i].thrust.y -= 3 * friction * klingons[i].thrust.y / FPS;
        }
        klingons[i].x += klingons[i].thrust.x
        klingons[i].y += klingons[i].thrust.y
        
        // Locked on
        if (klingons[i].locked && ship.scanning) {
            lockedOnKlingonView(klingons[i])
        }

        if (ship.firing && klingons[i].locked && distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) <= 500) {
            klingons[i].shields > 0 ? klingonShields(klingons[i]) : klingons[i].shields === 0
        }
        storeLastKlingonPosition(klingons[i])

        if (klingons[i].shields < maxKlingonShields) klingons[i].shields += 0.5
    }
}