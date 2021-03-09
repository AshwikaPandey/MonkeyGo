var PLAY=1
var END=0
var gameState= PLAY;
var monkey , monkey_running,ground
var banana ,bananaImage, rock, obstacleImage
var rockgroup,foodgroup
var survivaltime,invisibleground,score
var monkeybackground, background2,restart,restartImage
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkeybackground=loadImage("monkey background.jpg")
  ground1= loadImage("ground.jpg")
  
}



function setup() {
   createCanvas(800, 400)
  
  
  
  //monkey sprite created
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  
 monkey.debug=true
  monkey.setCollider("circle",0,130,90);
  ground = createSprite(400,330,900,0.01)
  ground.visble = false
  ground.velocityX=-4;

  //groups
  foodgroup= createGroup();
  rockgroup= createGroup();
  //ground and score
  invisibleground=createSprite(400,330,900,10)
  invisibleground.visible= false;
  survivaltime=0 
  score=0
  
  }

 

function draw() {
background(200)
  
  background(monkeybackground)

  
 
  stroke("white");
  text(20)
  fill("white")
  text("score:"+score,320,50)
  stroke("black")
  textSize(20)
  fill("black")
  text("survival Time="+survivaltime,100,50)
  survivaltime= Math.round(frameCount/frameRate())
  monkey.velocityY=monkey.velocityY+1
  monkey.collide(invisibleground)
  if(gameState===PLAY){
  MakeBanana();
 rocks();
    
  ground.velocityX=-4
   ground.x= ground.width/2;
  if (keyDown("space")&&monkey.y>=100){
  monkey.velocityY=-12
  }  
  if(monkey.isTouching(foodgroup)){
    foodgroup.destroyEach()
    score=score+2 
    monkey.scale+= +0.03
    }  
    if (monkey.isTouching(rockgroup)){
      gameState=END
    }
    if(gameState===END){
      
      ground.velocity=0
      monkey.velocity=0
      foodgroup.setLifetimeEach(-1);
      rockgroup.setLifetimeEach(-1);
      textSize(49)
      text("GAME OVER",100,200)
      
      
  }
  
  }
 
  

drawSprites();  
}

function MakeBanana(){
      if (frameCount%80===0){
var banana=createSprite(200,Math.round(random(120,200)),5,5)
  banana.addImage(bananaImage)
  banana.velocityX=-4
  banana.scale=0.08
  banana.lifeTime=300
 foodgroup.add(banana)
      }
  }


function rocks(){
   if (frameCount%100===0){

rock=createSprite(Math.round(random(200,400 )),300,5,5)
rock.addImage(obstacleImage)
     rock.velocityX=-4
  rock.lifetime=300
  rock.scale=0.14
  rockgroup.add(rock)
    
   }
  
  }
function reset(){
  gameState=PLAY
  reset.visible=false;
 rockgroup.destroyEach();
 foodgroup.destroyEach();
  
  monkey.changeAnimation("moving",monkey_running)
  
}


