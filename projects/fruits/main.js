game_config = {
  title: "Fruit Bowl",
  backgroundImage: "orchard.png",
  update: myGameLogic,
}
game = new Game(game_config)

player_config = {
  image: "bowl.png",
  edges: CLAMP,
  location: BOTTOM_CENTER,
  collisionHandler: playerCollisionHandler,
}
player = new PlayerSprite(player_config)
game.add(player)

fruits = []

for (i = 0; i < 7; i++){
  item_config = {
    imageChoices: ["apple.png", "peach.png", "plum.png","apricot.png","pineapple.png","pear.png","bananas.png","grapes.png" ],
    location: randomStartLocation,
    move: true,
    direction: DOWN,
    edges: WARP,
  }
  item = new PowerUpSprite(item_config)
  game.add(item)
  fruits.push(item)
}

text_config= {
  text: "Score: ${score}",
  location: TOP_CENTER,
  color: "black",
  bold: true,
}
text = new TextSprite(text_config)
game.add(text)

score = 10
game.start()

// ==================
// Custom Functions
// ==================

function myGameLogic() {
  for (z = 0; z < fruits.length; z++) {
    fruit = fruits[z]
    rect = fruit.getBoundingRect()
      if (rect.centerY > canvas.height) {
        fruit.respawn()
    }
  }
}

function playerCollisionHandler(src, target) {
  if (target instanceof PowerUpSprite) {
    score = score + 10
    target.respawn()
  }
}

function randomStartLocation() {
  randX = random(10, canvas.width - 10)
  randY = 0
  return new Vector(randX,randY)
}
