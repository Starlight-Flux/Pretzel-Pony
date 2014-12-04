function GameObj(x,y,w,h){
    this.curVectorPos = createVector(x,y);
    this.w = w;
    this.h = h;
   
    this.firstW = w;
    this.firstH = h;
    this.firstVectorPos = createVector(x,y);
   
    this.oldW = w;
    this.oldH = h;
    this.oldVectorPos = createVector(x,y);
};

//Make the GameAutom function//
function GameAutom(x,y,w,h,speedX,speedY){
    GameObj.call(this,x,y,w,h);
   
    this.firstVectorSpeed = createVector(speedX,speedY);
    this.oldVectorSpeed = createVector(speedX,speedY);
    this.curVectorSpeed = createVector(speedX,speedY);
   
}


var hero;
var colItem;
var playArea;
var colItemGroup = [];

var warpholeColour;

var x;
var y;

function setup() {

createCanvas(windowWidth,windowHeight)

drawingContext.shadowOffsetX = 5;
drawingContext.shadowOffsetY = -5;
drawingContext.shadowBlur = 10;
drawingContext.shadowColor = "black";
background(200);


GameObj.prototype.add = function(ix,iy){
      this.oldVectorPos.set(this.curVectorPos);
      this.curVectorPos.add(ix,iy);
};

GameObj.prototype.set = function(x,y){
      this.oldVectorPos.set(this.curVectorPos);
      this.curVectorPos.set(x,y);
     
};

//Make the GameAutom prototype
GameAutom.prototype = Object.create(GameObj.prototype);

//Set the GameAutom prototype constructor to the GameAutom function
GameAutom.prototype.constructor = GameAutom;

GameAutom.prototype.reset = function(){
    this.oldVectorPos.set(this.curVectorPos);
    this.oldW = this.w;
    this.oldH = this.h;
   
    this.curVectorPos.set(this.firstVectorPos.x,this.firstVectorPos.y);
    this.w = this.firstW;
    this.h = this.firstH;
}

GameAutom.prototype.move = function(){
    this.oldVectorPos.set(this.curVectorPos);
    this.curVectorPos.add(this.curVectorSpeed);
   
}

GameAutom.prototype.changeSpeed = function(speedX,speedY){
    this.oldVectorSpeed.set(this.curVectorSpeed);
    this.curVectorSpeed.set(speedX,speedY);
}

/*----Objects----*/
colItem = new GameAutom(windowWidth/2,windowHeight/2,20,20,5,5);
hero =  new GameObj(200,200,20,20);
playArea =  new GameObj(0,0,windowWidth,windowHeight);

for(i=0; i<5; i++){
    colItemGroup[i] = new GameAutom(windowWidth/2,windowHeight/2,20,20,5,5);
	
}

warpholeColour = color(0, 126, 255, 102);
 
}
function draw() {
 

background(200);


x = mouseX;
y = mouseY;

hero.set(x,y);

rect(hero.curVectorPos.x,hero.curVectorPos.y,hero.w,hero.h);

//Loop though game collectables
for(i=0; i<colItemGroup.length; i++)
{
	//Update the state of the game
	gameState(hero,colItemGroup[i],playArea);
	rect(colItemGroup[i].curVectorPos.x,colItemGroup[i].curVectorPos.y,colItemGroup[i].w,colItemGroup[i].h);
}

noStroke();
fill(warpholeColour);
ellipse(windowWidth/2,windowHeight/2,50,50);


}

/*function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    hero.add(5,0);
  } else if (keyCode === RIGHT_ARROW) {
    hero.add(-5,0);
  }
  if (keyCode === UP_ARROW) {
    hero.add(0,-5);
  } else if (keyCode === DOWN_ARROW) {
    hero.add(0,5);
  }
  
  
}*/

// Returns a random number between min (inclusive) and max (exclusive)
function randomNum(min,max)
{
   return Math.random()  * (max - min) + min;
}

function isBoundOverlap(boundBox1,boundBox2)
{

    if(boundBox1.curVectorPos.x + boundBox1.w > boundBox2.curVectorPos.x &&
    boundBox1.curVectorPos.y + boundBox1.h > boundBox2.curVectorPos.y &&
    boundBox2.curVectorPos.y + boundBox2.h > boundBox1.curVectorPos.y &&
    boundBox2.curVectorPos.x + boundBox2.w > boundBox1.curVectorPos.x)
    {
    return 1;
    }
    else
    {
    return 0;
    }   
}

function gameState(hero,item,playArea)
{

	if(isBoundOverlap(item,hero))
	{
		fill(200,0,0);
		item.changeSpeed(randomNum(-10,10),randomNum(-10,10));
		item.reset();
	}

	if(isBoundOverlap(item,playArea))
	{
		if(millis()%1 == 0){
			item.move()
		}
	}
	else
	{
    item.changeSpeed(randomNum(-10,10),randomNum(-10,10));
    item.reset();
	}
}

/*
var angle1=0;
var angle2=0;
var scalar = 70;

function setup() {
  createCanvas(710, 400);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(0);

  var ang1 = radians(angle1);
  var ang2 = radians(angle2);

  var x1 = width/2 + (scalar * cos(ang1));
  var x2 = width/2 + (scalar * cos(ang2));
  
  var y1 = height/2 + (scalar * sin(ang1));
  var y2 = height/2 + (scalar * sin(ang2));
  
  fill(255);
  rect(width*0.5, height*0.5, 140, 140);

  fill(0, 102, 153);
  ellipse(x1, height*0.5 - 120, scalar, scalar);
  ellipse(x2, height*0.5 + 120, scalar, scalar);
  
  fill(255, 204, 0);
  ellipse(width*0.5 - 120, y1, scalar, scalar);
  ellipse(width*0.5 + 120, y2, scalar, scalar);

  if left_key then
  angle1 += 2;
  angle2 += 3;

  if right_key then
  angle1 += 2;
  angle2 += 3;
}

*/