game_config = {
    title: "UFO Invasion",
    backgroundImage: "city.png",
    update: enemyStateMachine,
}
game = new Game(game_config)

projectile_config = {
  image: "canonball.png",
  direction: UP,
  collisionHandler: projectileCollisionHandler
}

player_config = {
    image: "tank.png",
    edges: CLAMP,
    location: BOTTOM_CENTER,
    collisionHandler: playerCollisionHandler,
    projectile: projectile_config,
}
player = new PlayerSprite(player_config)
game.add(player)

enemies = []
for (n = 0; n < 6; n++) {
  item_config = {
    imageChoices: ["ufo.png"],
    location: randomStartLocation,
    move: true,
    direction: DOWN,
    edges: BOUNCE,
  }
  item = new EnemySprite(item_config)
  game.add(item)
  startStandbyState(item)
  enemies.push(item)
}

text_config = {
  text: "Score: ${score}",
  location: TOP_CENTER,
  color: "black",
  bold: true,
}
text = new TextSprite(text_config)
game.add(text)

score = 0
game.start()

//=================
//Custom Function
//=================
function playerCollisionHandler(src, target) {
  if (target instanceof EnemySprite) {
    game.remove(src)
  }
}

function projectileCollisionHandler(src, target) {
  if (target instanceof EnemySprite) {
    target.respawn()
    game.remove(src)
    score = score + 10
  }
}

function randomStartLocation() {
  randX = random(10, canvas.width - 10)
  randY = 0
  return new Vector(randX, randY)
}

function startStandbyState(ufo) {
  ufo.state = "STANDBY"
  dir = randomChoice([LEFT,RIGHT])
  ufo.changeDirection(dir)
}

function startAttackState(ufo) {
  ufo.state = "ATTACK"
  dir = randomChoice([DOWN_LEFT,DOWN_RIGHT])
  ufo.changeDirection(dir)
}

function startRetreatState(ufo) {
  ufo.state = "RETREAT"
  ufo.changeDirection(UP)
}

function enemyStateMachine() {
  for(a = 0; a < enemies.length; a++) {
    enemy = enemies[a]

    // change state with 1% probability
    if (random (1,100) <=1) {
        //what is current state
      if (enemy.state == "STANDBY") {
        // attack with 50% probability
        if (random (1,100) <=50){
          startAttackState(enemy)
        } else {
          startRetreatState(enemy)
        }
      }
      else if (enemy.state == "RETREAT") {
        // attack with 50% probability
        if (random (1,100) <=50) {
          startAttackState(enemy)
        } else {
          startStandbyState(enemy)
        }
      }
      else if (enemy.state == "ATTACK") {
        startRetreatState(enemy)
      }
    }
  }
}
