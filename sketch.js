var sky,moon,tree,skyImg,moonImg,treeImg,fire,fireImg,ground,groundImg,line,lineImg,player,playerImg,swingImg,walkImg,walk2Img,swingImg2
var ns,ws,fs,gs
var star,starImg,wall,starg,starg2,star2,sh
var hit = 6
var PLAY = 1;
var END = 0;
var gameState = SERVE;
var SERVE = 2
var hits,end,start,starts,startb,resetb,startbImg,resetbImg,startsImg

var ss,es
function  preload() {

  skyImg = loadImage("sky.png")
  moonImg = loadImage("moon.png")
  treeImg = loadImage("tree.png")
  fireImg = loadAnimation("f1.png","f3.png","f4.png")
  groundImg = loadImage("ground.png")
  playerImg = loadImage("player.png")
  walkImg = loadImage("walk.png")
  walk2Img = loadImage("walk2.png")
  swingImg = loadImage("a1.png")
  swingImg2 = loadImage("a2.png")
  starImg = loadImage("star.png")

  startbImg = loadImage("start.png")
  resetbImg = loadImage("reset.png")
  startsImg = loadImage("screen.png")

  ns = loadSound("night.wav")
  ws = loadSound("wolf.wav")
  fs = loadSound("fire.wav")
  gs = loadSound("footstep.wav")
  sh = loadSound("sh.wav")

  hits = loadSound("aa.wav")
  end = loadSound("end.wav")
  start = loadSound("starting.wav")
}

function setup() {
  createCanvas(1500,720)

  sky = createSprite(500,200)
  sky.addImage(skyImg)
  sky.scale = 4

  moon = createSprite(900,190)
  moon.addImage(moonImg)
  moon.scale = 0.15
  moon.velocityX = -0.1

  
  tree = createSprite(500,310)
  tree.addImage(treeImg)
  tree.scale = 3.9

  ground = createSprite(500,813)
  ground.addImage(groundImg)
  ground.scale = 2.2

  fire = createSprite(960,440)
  fire.addAnimation("flame",fireImg)
  fire.scale = 0.35
  fire.velocityY = 2

  player = createSprite(300,430)
  player.addImage(playerImg)
  player.scale = 1.3

  line = createSprite(500,489,1000,5)
  line.visible = false

  line = createSprite(500,599,1000,5)
  line.visible = false


  star = createSprite(100,400)
  star.addImage(starImg)
  star.scale = 0.07
  star.velocityX = 5

  star2 = createSprite(900,400)
  star2.addImage(starImg)
  star2.scale = 0.07
  star2.velocityX = 5

  wall = createSprite(380,310,40,5)
  wall.shapeColor = "black"
  wall.visible = false

  starg  = new Group()
  starg2  = new Group()

  starts = createSprite(700,400,1900,1000)
  starts.addImage(startsImg)
  
  //starts.visible = false

  startb = createSprite(800,700)
  startb.addImage(startbImg)
  startb.scale = 0.2

  resetb = createSprite(500,500)
  resetb.addImage(resetbImg)
  resetb.visible = false
  resetb.scale = 0.5
 

  start.play()
  

 player.setCollider("rectangle",0,0,player.Width,player.height)
 //player.debug = true
}

function draw() {
background("white")
fire.collide(line)
if(gameState === SERVE){
  starts.visible = true
  startb.visible = true
  
  
}
if(mousePressedOver(startb)){
  startx()
  fs.loop() 
 // gs.loop()
  startb.destroy()
}
if(mousePressedOver(resetb)){
  startx()
 // fs.loop() 
 // gs.loop()
  //startb.destroy()
}



player.collide(line)
player.collide(wall)

if(gameState === PLAY){
if(star.isTouching(player)){
  player.addImage(swingImg)
  star.destroy()
  sh.play()
  hit = hit-1
}
startb.visible = false
starts.visible = false
if(star2.isTouching(player)){
  player.addImage(swingImg2)
  star2.destroy()
  sh.play()
  hit = hit-1
}

if(keyDown("left")){
player.addImage(walkImg)
  player.x = player.x-5
  
}
if(keyDown("right")){
  player.addImage(walk2Img)
  player.x = player.x+5
  
}

  if(keyDown("space") && player.y > 180){
     player.velocityY = -6 
    
  }
  stars()
  starh()
  player.velocityY = player.velocityY +0.8
}
  
  //if(keyDown("N")){
  //  player.addImage(swingImg2)
  //  star.destroy()
   //}
   
   

  
   
  drawSprites()

  fill("white")
  textSize(30)
  text("Hit Left:"+hit,900,100)

  if(hit <1 ){
    fill("white")
    textSize(30)
    //text("dodge the stars",800,500)
   }


if(hit < 1 ){
  fill("yellow")
  textSize(30)
  text("GAME OVER",500,250)
  player.destroy()
  star.lifetime =1 
  star2.lifetime =1
 // hits.play()
  
  //hit.visible = false 
   
 }

}
function stars(){
  if(frameCount % 240 === 0 ){
    star = createSprite(950,200)
    star.addImage(starImg)
    star.velocityX = -5
    star.y = Math.round(random(120,400))
    star.lifetime = 200
    starg.add(star)
    star.scale = 0.07
}
}

function starh(){
  if(frameCount % 120 === 0 ){
    star2 = createSprite(50,200)
    star2.addImage(starImg)
    star2.velocityX = 5
    star2.y = Math.round(random(120,400))
    star2.lifetime = 200
    starg2.add(star2)
    star2.scale = 0.07
}
}

function startx(){
  gameState = PLAY
}

function resetx(){
  gameState = PLAY
}