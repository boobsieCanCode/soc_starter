game_config = {
  title: "Snack Attack",
  backgroundImage: "grass.png",
}
game = new Game(game_config)

player_config = {
  image: "turtle.png",
  edges: WARP,
  collisionHandler: playerCollisionHandler,
}
player = new PlayerSprite(player_config)
game.add(player)

for (i = 0; i < 6; i++){
  item_config = {
    imageChoices: ["broccoli.png", "carrot.png", "tomato.png", ]
  }
  item = new PowerUpSprite(item_config)
  game.add(item)
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
function playerCollisionHandler(src, target) {
  if (target instanceof PowerUpSprite) {
    score = score + 10
    target.respawn()
  }
}
