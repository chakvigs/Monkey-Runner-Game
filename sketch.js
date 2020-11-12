var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;
var survivalTime, bananaCount;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400, 400);
  monkey = createSprite(50,320,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.08;
  
  ground = createSprite(400,350,900,100);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.shapeColor = "brown";
  
  survivalTime = 0;
  bananaCount = 0;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("lightblue");
  
  monkey.collide(ground);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if (keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -12;
    }
    
  monkey.velocityY = monkey.velocityY + 0.8;
  
  survivalTime = Math.round(frameCount/frameRate());
  
  if (monkey.isTouching(foodGroup)) {
    foodGroup.destroyEach();
    bananaCount++;
  }
  
  createFood();
  createObstacle();
  
  fill("black");
  textSize(13);
  text("Survival Time: " + survivalTime, 10, 20);
  text("Bananas Collected: " + bananaCount, 260, 20);
  
  drawSprites();
}

function createFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, Math.round(random(120,200)), 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 105;
    banana.depth = monkey.depth;
    monkey.depth++;
    foodGroup.add(banana);
  }
}

function createObstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 270, 30, 30);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}