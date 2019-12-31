let width = 800,
height = 400,
disk_number = 4;
var disk = [],
pinA = [],
pinB = [],
pinC = [],
move, pin_from, pin_to, n;

function setup() {
    canvas = createCanvas(width, height);
    canvas.parent('sketch-holder');
    canvas.position(x=(windowWidth - width) / 2);
    n=disk_number-1;
    
    for (let i = 0; i < disk_number; i++) {
        disk.push(new Disk());
        disk[i].pos = i+1;
        disk[i].pin = 1;
        disk[i].width = 200 - 25*i;
        disk[i].update();
        pinA.push(i);
    }    
}

function draw() {
    background(220);
    draw_pins();

    if (disk[n].move) {
        disk[n].clicked();
    }

    else {
        disk[n].update();
    }
    
    for (let i = 0; i < disk_number; i++) {
        disk[i].show();
    }
    
      
}

function draw_pins() {
    fill(0);
    pinWidhth = 10;
    pinHeight = 200;
    rect(width/6-pinWidhth/2, height-pinHeight, pinWidhth, pinHeight);
    rect(3*width/6-pinWidhth/2, height-pinHeight, pinWidhth, pinHeight);
    rect(5*width/6-pinWidhth/2, height-pinHeight, pinWidhth, pinHeight);
}


function mousePressed() {
    if(mouseX<=width/3){
        pin_from = 1;
        disk[pinA[pinA.length-1]].move = true;
        n = pinA[pinA.length-1];
    }
    if(mouseX>width/3 && mouseX<=2*width/3){
        pin_from = 2;
        disk[pinB[pinB.length-1]].move = true;
        n = pinB[pinB.length-1];
    }
    if(mouseX>2*width/3 && mouseX<=width){
        pin_from = 3;
        disk[pinC[pinC.length-1]].move = true;
        n = pinC[pinC.length-1];
    }
}
  
function mouseReleased() {
    if(mouseX<=width/3){
        pin_to = 1;
    }
    if(mouseX>width/3 && mouseX<=2*width/3){
        pin_to = 2;
    }
    if(mouseX>2*width/3 && mouseX<=width){
        pin_to = 3;
    }
    moveDisk(pin_from, pin_to);
    for (let i = 0; i < disk_number; i++) {
        disk[i].move = false;
    }
}

function moveDisk(pinFrom, pinTo) {
    if(pinFrom == 1){
        if(pinTo == 1){
            disk[pinA[pinA.length-1]].pin = 1;
            disk[pinA[pinA.length-1]].pos = pinA.length;
            pinA.push(pinA[pinA.length-1]);
            pinA.splice(pinA.length-2,1);
        }
        if(pinTo == 2 && ((pinA[pinA.length-1] > pinB[pinB.length-1]) || (pinB[pinB.length-1] == null)) ){
            disk[pinA[pinA.length-1]].pin = 2;
            disk[pinA[pinA.length-1]].pos = pinB.length+1;
            pinB.push(pinA[pinA.length-1]);
            pinA.splice(pinA.length-1,1);
        }
        if(pinTo == 3 && ((pinA[pinA.length-1] > pinC[pinC.length-1]) || (pinC[pinC.length-1] == null))){
            disk[pinA[pinA.length-1]].pin = 3;
            disk[pinA[pinA.length-1]].pos = pinC.length+1;
            pinC.push(pinA[pinA.length-1]);
            pinA.splice(pinA.length-1,1);
        }
    }

    if(pinFrom == 2){
        if(pinTo == 1 && ((pinB[pinB.length-1] > pinA[pinA.length-1]) || (pinA[pinA.length-1] == null))){
            disk[pinB[pinB.length-1]].pin = 1;
            disk[pinB[pinB.length-1]].pos = pinA.length+1;
            pinA.push(pinB[pinB.length-1]);
            pinB.splice(pinB.length-1,1);
        }
        if(pinTo == 2){
            disk[pinB[pinB.length-1]].pin = 2;
            disk[pinB[pinB.length-1]].pos = pinB.length;
            pinB.push(pinB[pinB.length-1]);
            pinB.splice(pinB.length-2,1);
        }
        if(pinTo == 3 && ((pinB[pinB.length-1] > pinC[pinC.length-1]) || (pinC[pinC.length-1] == null))){
            disk[pinB[pinB.length-1]].pin = 3;
            disk[pinB[pinB.length-1]].pos = pinC.length+1;
            pinC.push(pinB[pinB.length-1]);
            pinB.splice(pinB.length-1,1);
        }
    }

    if(pinFrom == 3){
        if(pinTo == 1 && ((pinC[pinC.length-1] > pinA[pinA.length-1]) || (pinA[pinA.length-1] == null))){
            disk[pinC[pinC.length-1]].pin = 1;
            disk[pinC[pinC.length-1]].pos = pinA.length+1;
            pinA.push(pinC[pinC.length-1]);
            pinC.splice(pinC.length-1,1);
        }
        if(pinTo == 2 && ((pinC[pinC.length-1] > pinB[pinB.length-1]) || (pinB[pinB.length-1] == null))){
            disk[pinC[pinC.length-1]].pin = 2;
            disk[pinC[pinC.length-1]].pos = pinB.length+1;
            pinB.push(pinC[pinC.length-1]);
            pinC.splice(pinC.length-1,1);
        }
        if(pinTo == 3){
            disk[pinC[pinC.length-1]].pin = 3;
            disk[pinC[pinC.length-1]].pos = pinC.length;
            pinC.push(pinC[pinC.length-1]);
            pinC.splice(pinC.length-2,1);
        }
    }
    

}