const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var ground;

var pot;

var plant1, plant2, plant3, plant4, plant5;
var plant;

var drops = [];
var loops;
score = 0;

var plantStage = 0,n =0; 

function preload()
{
  plant1 = loadImage("Plant1.jpeg");
  plant2 = loadImage("Plant2.jpeg");
  plant3 = loadImage("Plant3.jpeg");
  plant4 = loadImage("plant4.jpeg");
  plant5 = loadImage("plants5.jpeg");
}

function setup()
{

  engine = Engine.create();
  world = engine.world;
  createCanvas(600,700);
  
  plant = createSprite(280, 650, 35, 35);
  plant.addImage("plant1",plant1);
  plant.scale = 0.9;

  ground = new Ground(300, 690, 600, 20);
  //loop = new Loop(200, 500);
  var pot_options ={
    isStatic: true
  }
  pot = Bodies.circle(200,500, 20, pot_options);
  World.add(world, pot);
  
  
}

function draw() 
{
  Engine.update(engine);
  background(51);

  settingImage(plantStage);


  ground.display();
  //loop.display();

  ellipseMode(RADIUS);
  ellipse(this.pot.position.x, this.pot.position.y,30, 20);

  textSize(30);
  push();
  fill("white");
  text('Score ' + score, 400, 50);
  pop();
  

  push();
  noFill();
  stroke("green");
  strokeWeight(5);
  ellipse(this.pot.position.x, this.pot.position.y, 40, 30);
  pop();
  
 

  if(drops.length > 0){
    for (var i =0; i<drops.length; i++){
      if(drops[i]!= undefined){
        drops[i].display();
        console.log(drops[i].body.position.y);
        if(drops[i].body.position.y > 650){
          World.remove(world, drops[i].body);
          delete drops[i];
        }
        
      }
      
    }
  }

  checkCollision();

  
 drawSprites();
}

function keyPressed(){
  if(keyCode == 32){
    var waterdrops = new Waterdrops(random(20, 580),0);
    drops.push(waterdrops);
  }

  if(keyCode == LEFT_ARROW){
    Matter.Body.setPosition(this.pot, {x:this.pot.position.x -3, y: this.pot.position.y})
  }
  if(keyCode == RIGHT_ARROW){
    Matter.Body.setPosition(this.pot, {x:this.pot.position.x +3, y: this.pot.position.y})
  }
}

function keyReleased(){
  if(keyCode == 32){
    
      for (var i =0; i<drops.length; i++){
        if(drops[i] != undefined){
          Matter.Body.setStatic(drops[i].body, false);
        }
        
      }

  
    
  }
}

function checkCollision(){
  for(var index =0; index< drops.length; index++){
    
    if(drops[index] != undefined){
      //console.log(this.pot);
      //console.log(drops[index]);
      var collision = Matter.SAT.collides(this.pot, drops[index].body);
      console.log(collision.collided);
      if(collision.collided){
        score += 5;
        n +=1;
        if(n == 5){
          plantStage += 1;
        }
        World.remove(world, drops[index].body);
        delete drops[index];
      }
    
    }

  }
  
}

function settingImage(stage){
  switch(stage){
    case 0:
      plant.addImage("plant1")
      break;
     
    case 1:
      plant.chamgeImage("plant2")
      break;

    case 2:
     plant.changeImage("plant3")
     break;
     
    case 3:
    plant.changeImage("plant4")
    break;

    case 4:
      plant.changeImage("plant5")
      break;

  }
}

