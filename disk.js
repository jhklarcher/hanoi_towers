function Disk() {
    
    this.height = 20;
    this.move = false;

    this.show = function() {
        fill(0,0,255);
        rect(this.x, this.y, this.width, this.height);
    };

    this.update = function() {
        if(this.pin == 1){
            this.x = width/6-this.width/2;
        }
        if(this.pin == 2){
            this.x = 3*width/6-this.width/2;
        }
        if(this.pin == 3){
            this.x = 5*width/6-this.width/2;
        }
        this.y = height - this.pos*this.height;
    };

    this.clicked = function() {
        this.x = mouseX - this.width/2;
        this.y = mouseY - this.height/2;
    };


     
}