var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie;
var zombieImg;
var ZombieGroup;
var bulletGroup;
var bullets=50;
var score=0;
var life=3;
var life1,life2,life3;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
   zombieImg=loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg")
  life3=loadImage("assets/heart_3.png");
  life2=loadImage("assets/heart_2.png");
  life1=loadImage("assets/heart_1.png");


}

function setup() {
ZombieGroup=new Group();
bulletGroup=new Group();
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true;
   player.setCollider("rectangle",0,0,300,300)
heart1=createSprite(displayWidth-200,50,20,20);
heart1.addImage(life1);
heart1.scale=0.3;
heart1.visible=false;
heart2=createSprite(displayWidth-200,50,20,20);
heart2.addImage(life2);
heart2.scale=0.3;
heart2.visible=false;
heart3=createSprite(displayWidth-200,50,20,20);
heart3.addImage(life3);
heart3.scale=0.3;
heart3.visible=true;

}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if((keyDown("UP_ARROW")||touches.length>0 ) && player.y>400  ){
  player.y = player.y-30
}
if((keyDown("DOWN_ARROW")||touches.length>0)&& player.y<600){
 player.y = player.y+30
}
if((keyDown("LEFT_ARROW")||touches.length>0)&& player.x>20){
  player.x = player.x-30;
}
if((keyDown("RIGHT_ARROW")||touches.length>0)&& player.x<1000){
  player.x = player.x+30;
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet=createSprite(player.x,player.y-30,10,5)
 bullet.velocityX=10;
 bulletGroup.add(bullet);
  player.addImage(shooter_shooting)
  bullets=bullets-1;
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
spawnEnemy();
if(ZombieGroup.isTouching(bulletGroup)){

  for(var i=0;i<ZombieGroup.length;i++){
if(ZombieGroup[i].isTouching(bulletGroup)){
  ZombieGroup[i].destroy();
  bulletGroup.destroyEach();
  score=score+5;
}
  }
}

if(ZombieGroup.isTouching(player)){
 

  for(var i=0;i<ZombieGroup.length;i++){     
       
   if(ZombieGroup[i].isTouching(player)){
        ZombieGroup[i].destroy()
        life=life-1;
        } 
  }
 }

if(life===3){
  heart3.visibl=true;
  heart2.visible=false;
  heart1.visible=false;
}
if(life===2){
  heart3.visibl=false;
  heart2.visible=true;
  heart1.visible=false;
}
if(life===1){
  heart3.visibl=false;
  heart2.visible=false;
  heart1.visible=true;
}

drawSprites();
textSize(20);
fill("white")
text("points : "+score,50,50 );
text("ammo :"+bullets,30,30);

}

function spawnEnemy(){
  if(frameCount%100==0){
  zombie=createSprite(random(500,1500),random(300,650),40,40)
  zombie.addImage(zombieImg);
  zombie.scale=0.1;
  zombie.velocityX=-2;
  zombie.debug=true;
  zombie.lifeTime=600;
ZombieGroup.add(zombie);
}
}
