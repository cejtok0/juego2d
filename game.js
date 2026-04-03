const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

let player={x:300,y:200,size:20,speed:4};
let enemies=[];
let keys={};
let start=Date.now();
let gameover=false;

document.addEventListener("keydown",e=>{keys[e.key.toLowerCase()]=true;});
document.addEventListener("keyup",e=>{keys[e.key.toLowerCase()]=false;});

function spawnEnemy(){
let side=Math.floor(Math.random()*4);
let e={size:20};

if(side==0){ e.x=0; e.y=Math.random()*400;}
if(side==1){ e.x=600; e.y=Math.random()*400;}
if(side==2){ e.x=Math.random()*600; e.y=0;}
if(side==3){ e.x=Math.random()*600; e.y=400;}

enemies.push(e);
}

setInterval(spawnEnemy,1500);

function update(){
if(gameover) return;

if(keys["w"]) player.y-=player.speed;
if(keys["s"]) player.y+=player.speed;
if(keys["a"]) player.x-=player.speed;
if(keys["d"]) player.x+=player.speed;

for(let e of enemies){
let dx=player.x-e.x;
let dy=player.y-e.y;
let dist=Math.sqrt(dx*dx+dy*dy);

e.x+=dx/dist*2;
e.y+=dy/dist*2;

if(dist<20){
endGame();
}
}
}

function draw(){
ctx.clearRect(0,0,600,400);

ctx.fillStyle="green";
ctx.fillRect(player.x,player.y,20,20);

ctx.fillStyle="red";
for(let e of enemies){
ctx.fillRect(e.x,e.y,20,20);
}
}

function score(){
let s=Math.floor((Date.now()-start)/1000);
document.getElementById("score").innerText="Score: "+s;
return s;
}

function endGame(){
gameover=true;
let s=score();
alert("Game Over\nScore: "+s);

fetch("save_score.php",{
method:"POST",
headers:{'Content-Type':'application/x-www-form-urlencoded'},
body:"nick="+localStorage.getItem("nick")+"&score="+s
});
}

function loop(){
update();
draw();
score();
requestAnimationFrame(loop);
}

loop();

fetch("get_score.php?nick="+localStorage.getItem("nick"))
.then(r=>r.text())
.then(d=>{
document.getElementById("high").innerText="High Score: "+d;
});