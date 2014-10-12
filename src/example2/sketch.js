

function gameObject(posX, posY, obW, obH)
{
  this.posVec =  createVector(posX,posY);
  this.w = obH;
  this.h = obW;
  
  this.lastPosVec.set(this.posVec);
  this.lastW = this.w;
  this.lastH = this.h;
  
  this.firstPosVec.set(this.posVec);
  this.firstW = this.w;
  this.firstH = this.h;
}


function setup() {
 
// put setup code here
createCanvas(windowWidth,windowHeight)

drawingContext.shadowOffsetX = 5;
drawingContext.shadowOffsetY = -5;
drawingContext.shadowBlur = 10;
drawingContext.shadowColor = "black";
background(200);


//set up functions and prototype objects
	gameObject.prototype.reset = function(){
	 this.posVec.set(this.firstPosVec);
	 this.w = this.firstW;
	 this.h = this.firstH;
	}

}

 

function draw() {
 
// put drawing code here


background(200);
var x = mouseX;
var y = mouseY;

ellipse(x,y,50,50);

}

function isBoundOverlap(boundBox1,boundBox2)
{
 if(boundBox1["x"] > boundBox2["x"])
 {
 return 1;
 }
 else
 {
 return 0;
 } 
}


/*---old code---

if(100<x && 300 > x && 100<y && 300 > y)
{
fill(255,0,0);
}

---------------*/