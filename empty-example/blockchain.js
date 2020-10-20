let fr = 30;
let clients=[];
let ledgers = [];
let photes = [];
let g = {
  v:[[200,500],[600,200],[800,400],[300,100]],
  l:[[100,480],[700,180],[900,380],[200,80]],

}

function preload(){
  for(let i = 0;i<4;i++){

    photes[i] = loadImage(`icons/icon${i+1}.jpg`);
  }
}

function setup() {
  createCanvas(1200,800)
  background(0)
  for(let i = 0;i<photes.length;i++){
    let c = new Client(g.v[i][0],g.v[i][1],80,photes[i])
    clients.push(c);
  }
  for(let i = 0;i<g.l.length;i++){
    let led = new Ledger(g.l[i][0],g.l[i][1])
    ledgers.push(led);
  }
  frameRate(fr);
}

function mousePressed(){
 for(let i = 0;i<clients.length;i++){
   clients[i].clicked(mouseX,mouseY,clients[i+1],i);
 }
}

function draw() {
  for(let i = 0;i<clients.length;i++){
    clients[i].show()
  }
  for(let i = 0; i<ledgers.length; i++){
    ledgers[i].show()
  }
}

class Client {
  constructor(x,y,r=80,img) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.img = img;
  }
  clicked(x,y,obj,i){
    let d = dist(x,y,this.x,this.y);
    if ( d < this.r) {
      this.highlight(obj.x+obj.r/2,obj.y+obj.r/2)
      ledgers[i].showText()
    }
  }


  show(){
    image(this.img,this.x,this.y,this.r,this.r);
  }
  highlight(dx,dy){
    stroke(247, 137, 27)
    strokeWeight(4)
    noFill()
    ellipse(this.x+this.r/2,this.y+this.r/2,90,90)
    line(this.x+this.r/2,this.y+this.r/2,dx,dy)
    ellipse(dx,dy,90,90)
  }
}

class Ledger {
  constructor(x,y,w=80,h=100,text) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  show(){
    stroke(250)
    strokeWeight(3)
    fill(205)
    rect(this.x,this.y,this.w,this.h)
  }

  showText(){
    textSize(28);
  }

}
