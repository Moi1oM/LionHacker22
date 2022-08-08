const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
lottery = 0
canvas.width = 1024;
canvas.height = 576;
//console.log(canvas);
//console.log(c);
//battleZonesData
const collisionsMap = []
for (let i = 0; i < collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i,i+70))
}

const battleZonesMap = [] 
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, i + 70));
}

const doorZonesMap = [];
for (let i = 0; i < doorZonesData.length; i += 70) {
  doorZonesMap.push(doorZonesData.slice(i, i + 70));
}

const prayZonesMap = [];
for (let i = 0; i < prayZonesData.length; i += 70) {
  doorZonesMap.push(prayZonesData.slice(i, i + 70));
}

const boundaries = []
const offset = {
    x: -740,
    y: -620
}
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(new Boundary({
            position: {
                x: j*Boundary.width+offset.x,
                y: i*Boundary.height+offset.y
        }}))
    })
})

const battleZones = []
battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const doorZones = [];
doorZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      doorZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const prayZones = [];
prayZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2790)
      prayZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

console.log(boundaries)

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image()
image.src = './img/Pellet Town.png'

const foregroundImage = new Image();
foregroundImage.src = "./img/ForegroundImage.png";

const playerDownImage = new Image()
playerDownImage.src = './img/PlayerDown.png'
const playerUpImage = new Image()
playerUpImage.src = './img/PlayerUp.png'
const playerLeftImage = new Image()
playerLeftImage.src = './img/PlayerLeft.png'
const playerRightImage = new Image()
playerRightImage.src = './img/PlayerRight.png'

function doorFunction() {
  a = Math.random()
  if (a < 0.5) alert("어딜 들어오려해!");  
  }

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4
  },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});



const keys = {
    w: {
    pressed: false,
},
  a: {
    pressed: false,
  },
  s: {
      pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  }
};

let backgroundImageX = -740
let playerImageX = -750
const movables = [background, ...boundaries, foreground, ...battleZones, ...doorZones]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
      rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
      rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
      rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    );
}
function animate() {
    window.requestAnimationFrame(animate)
    background.draw();
    boundaries.forEach(boundary => {
        //console.log(boundary)
        boundary.draw()
        
    }) 
  battleZones.forEach((battleZone) => {
    //console.log(boundary)
    battleZone.draw();
  });  
  doorZones.forEach((doorZone) => {
    //console.log(boundary)
    doorZone.draw();
  }); 
  prayZones.forEach((doorZone) => {
    //console.log(boundary)
    doorZone.draw();
  }); 
  player.draw()
  foreground.draw()
    const velocity = 7
  let frame = 0
  if (keys.w.pressed || keys.d.pressed || keys.a.pressed || keys.s.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width)
        - Math.max(player.position.x, battleZone.position.x))
        * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height)
        -Math.max(player.position.y, battleZone.position.y))
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
        }) && overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.02
      ) {
        lottery++;
        alert(`네잎클로버을 주웠습니다! 현재 네잎클로버:${lottery}`)
        break;
      }
    }
  }
  for (let i = 0; i < doorZones.length; i++) {
      const door = doorZones[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: door,
        })
      ) {
        if (Math.random()<0.1) {
          doorFunction();
        }
        break;
      }
  }
  let moving = true
  player.moving=false
  if (keys.w.pressed && lastKey === 'w') {
    player.moving = true
    player.image=player.sprites.up
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y + velocity
                    }}
                })
                ) {
                moving = false;
                break
                }
    }
        if(moving){movables.forEach((movable) => {
            movable.position.y += velocity
        })
    }
    
    }
  if (keys.a.pressed && lastKey === "a") {
    player.moving = true;
    player.image = player.sprites.left;
          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
              rectangularCollision({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x + velocity,
                    y: boundary.position.y,
                  },
                },
              })
            ) {
              moving = false;
              break;
            }
          }
          if (moving)
            movables.forEach((movable) => {
              movable.position.x += velocity;
            });
        }
  if (keys.s.pressed && lastKey === "s") {
    player.moving = true;
    player.image = player.sprites.down;
          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
              rectangularCollision({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y - velocity,
                  },
                },
              })
            ) {
              moving = false;
              break;
            }
          }
          if (moving)
            movables.forEach((movable) => {
              movable.position.y -= velocity;
            });
        }
  if (keys.d.pressed && lastKey === "d") {
    player.moving = true;
    player.image = player.sprites.right;
          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
              rectangularCollision({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x - velocity,
                    y: boundary.position.y,
                  },
                },
              })
            ) {
              console.log("coolll!!");
              moving = false;
              break;
            }
          }
          if (moving)
            movables.forEach((movable) => {
              movable.position.x -= velocity;
            });
        }
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
//    console.log(e.key);
    switch (e.key) {
        case "w":
            keys.w.pressed = true;
            lastKey = 'w'
            break;
            case "a":
                keys.a.pressed = true;
                lastKey = 'a'
                break;
                case "s":
                    keys.s.pressed = true;
                    lastKey = 's'
                    break;
                    case "d":
            keys.d.pressed = true;
            lastKey = 'd'
        break;
      case "ArrowUp":
        keys.ArrowUp.pressed = true;
        break;
    }
})

window.addEventListener("keyup", (e) => {
//  console.log(e.key);
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
});