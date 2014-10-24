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

 
}
function draw() {
 

background(200);
var x = mouseX;
var y = mouseY;

hero.set(x,y);

rect(hero.curVectorPos.x,hero.curVectorPos.y,hero.w,hero.h);


//Loop though game collectables
for(i=0; i<colItemGroup.length; i++)
{
	//Update the state of the game
	gameState(hero,colItemGroup[i],playArea);
	rect(colItemGroup[i].curVectorPos.x,colItemGroup[i].curVectorPos.y,colItemGroup[i].w,colItemGroup[i].h);
}


ellipse(windowWidth/2,windowHeight/2,50,50);


}

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
		if(millis()%500 == 0){
			item.move()
		{
	}
	else
	{
    item.changeSpeed(randomNum(-10,10),randomNum(-10,10));
    item.reset();
	}
}