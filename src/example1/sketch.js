
function GameObj(x,y,w,h){
	this.curVectorPos = createVector(x,y);
	this.w = w;
	this.h = h;
	
	this.firstW = w;
	this.firstH = h;
	this.firstVectorPos = createVector(0,0);
	
	this.oldW = w;
	this.oldH = h;
	this.oldVectorPos = createVector(0,0);
};

//Make the GameAutom function//
function GameAutom(x,y,w,h){
	GameObj.call(this,x,y,w,h);
}

var hero;
var colItem;
var playArea;

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

//Objects
hero =  new GameObj(200,200,20,20);
colItem = new GameAutom(windowWidth/2,windowHeight/2,20,20);
playArea =  new GameObj(0,0,windowWidth,windowHeight);

}

 

function draw() {
 
// put drawing code here


background(200);
var x = mouseX;
var y = mouseY;

hero.set(x,y);

if(isBoundOverlap(hero,colItem))
{
	fill(200,0,0);
}

if(isBoundOverlap(colItem,playArea))
{
	colItem.add(0,5);
}

rect(hero.curVectorPos.x,hero.curVectorPos.y,hero.w,hero.h);
rect(colItem.curVectorPos.x,colItem.curVectorPos.y,colItem.w,colItem.h);

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