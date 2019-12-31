let width = 800,
height = 400;
var disk,
pinA,
pinB ,
pinC,
movements, pin_from, pin_to, disk_number;

function setup() {
    canvas = createCanvas(width, height);
    canvas.parent('sketch-holder2');
    canvas.position(x=(windowWidth - width) / 2);
    background(220);
    draw_pins();

    frameRate(1);

    disk_number = 4
    disk = [];
    pinA = [];
    pinB = [];
    pinC = [];

    for (let i = 0; i < disk_number; i++) {
        disk.push(new Disk());
        disk[i].pos = i+1;
        disk[i].pin = 1;
        disk[i].width = 200 - 25*i;
        disk[i].update();
        pinA.push(i);
    }

    movements = (2**disk_number)-1;
    cont=1;
    source = 1;
    dest = 3;
    aux = 2;

    noLoop();  
    setTimeout(loop, 2000);

}

function draw() {
    background(220);
    draw_pins();

    for (let i = 0; i < disk_number; i++) {
        disk[i].update();
        disk[i].show();
    }    

    if(cont <= movements){
        if(cont%3 == 1) {
            if(pinA[pinA.length-1] > pinC[pinC.length-1] || (pinC[pinC.length-1] == null)){
                moveDisk(source, dest);
            }
            else{
                moveDisk(dest, source);
            }
        }
        if(cont%3 == 2) {
            if(pinA[pinA.length-1] > pinB[pinB.length-1] || (pinB[pinB.length-1] == null)) {
                moveDisk(source, aux);
            }
            else{
                moveDisk(aux, source);
            }
        }

        if(cont%3 == 0) {
            if(pinB[pinB.length-1] > pinC[pinC.length-1] || (pinC[pinC.length-1] == null)) {
                moveDisk(aux, dest);
            }
            else{
                moveDisk(dest, aux);
            }
        }
    }

    else {
        noLoop();  
        setTimeout(setup, 2500);
    }
    

    cont++;
}

function draw_pins() {
    fill(0);
    pinWidhth = 10;
    pinHeight = 200;
    rect(width/6-pinWidhth/2, height-pinHeight, pinWidhth, pinHeight);
    rect(3*width/6-pinWidhth/2, height-pinHeight, pinWidhth, pinHeight);
    rect(5*width/6-pinWidhth/2, height-pinHeight, pinWidhth, pinHeight);
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
