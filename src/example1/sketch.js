
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


var hero;
var colItem;

function setup() {
 
// put setup code here
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

hero =  new GameObj(200,200,20,20);
colItem = new GameObj(windowWidth/2,windowHeight/2,20,20);

}

 

function draw() {
 
// put drawing code here


background(200);
var x = mouseX;
var y = mouseY;

hero.set(x,y);

rect(hero.curVectorPos.x,hero.curVectorPos.y,hero.w,hero.h);
rect(colItem.curVectorPos.x,colItem.curVectorPos.y,colItem.w,colItem.h);

}

function isBoundOverlap(boundBox1,boundBox2)
{

	if(boundBox1.curVectorPos.x + boundBox1.w > boundBox2.curVectorPos.x && 
	boundBox1.curVectorPos.y + boundBox1.h > boundBox2.curVectorPos.y &&
	boundBox2.curVectorPos.y + boundBox2.h > boundBox1.curVectorPos.x &&
	boundBox2.curVectorPos.x + boundBox2.w > boundBox1.curVectorPos.x)
	{
	return 1;
	}
	else
	{
	return 0;
	}	
}