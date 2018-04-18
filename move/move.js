var gamePlayTimer = prompt("In seconds, how long do you want to play?");

var startGame = alert("Press OK to Start Game");

var sx = 0;
var sy = 0;
var swidth = 51;
var sheight = 81;
var posWidth = false;
var posWidthNeg = false;
var posHeight = false;
var posHeightNeg = false;
var new_santa_size_x = 0;
var new_santa_size_y = 0;
var runningAnim;
var win = false;
var lose = false;

window.onload = function () {
    var posX = 0;
    var posY = 0;
    var santa_size_x = 60;//initial santa position x axis. You can edit anywhere
    var santa_size_y = 360;//initial santa position y axis
    
    // CREATE CANVAS CONTEXT.
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    // CREATE SANTA ON SNOWMAN
    var santaImage = document.createElement("img");
    var santaImage = new Image();
    context.shadowColor = '#333';
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    santaImage.onload = draw();

    // TIMER SET
    context.font = "25px Verdana";
    context.fillStyle = "red";
    context.shadowColor = '#333';
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    
    var a = setInterval(function(){ 
            context.clearRect(0, 0, 800, 50);
            if(!win){
                context.fillText("TIME REMAINING: " + gamePlayTimer--, 300, 30);
            }
            //game player value decreases by 1, when 0 it will clear the screen & draw a Time Up text
            if(gamePlayTimer <= 0){
                gamePlayTimer = 0;
                lose = true;
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.fillText("TIME'S UP! YOU LOSE!", 230, 250);
                return;
                //clearInterval(a);
            }

        }, 1000);

    canvas.onclick = function(e) {
        if(win || lose)
        {
            return;
        }
        sx = 0;
        runningAnim = true;
        //context.clearRect(0, 51, canvas.width, canvas.height);
        var moveX = Math.floor((Math.random()* 2) + 1);
        var moveY = Math.floor((Math.random()* 2) + 1);

        //moving random directionally by 70 px
        switch(moveX){
            case 1:
                posX = 70;
                posWidth = true;// flag to identify the current direction for each click
                posWidthNeg = false;
                break;
            case 2:
                posX = -70;
                // flag to identify the current direction for each click
                posWidth = false;
                posWidthNeg = true;
                break;
        }
        switch(moveY){
            case 1:
                posY = -70;
                // flag to identify the current direction for each click
                posHeight = false;
                posHeightNeg = true;
                break;
            case 2:
                posY = 70;
                // flag to identify the current direction for each click
                posHeight = true;
                posHeightNeg = false;
                break;
        }
        new_santa_size_x = santa_size_x + posX; // actual x axis translate from begin state to random direction state
        new_santa_size_y = santa_size_y + posY;// actual x axis translate from begin state to random direction state

        //santa image in between the canvas
        //when santa is going top wards when it gets y axis value 55 or less it will fixed. It will not go more topper because in top we have a Time Remaining text. So it will overlaps 
        if(new_santa_size_y <= 55)
        {
            new_santa_size_y = 55;
        }
        //when santa in bottom wards when gets 515 px it will then not go far bottom then this
        if(new_santa_size_y >= 515)
        {
            new_santa_size_y = 515;
        }
        //when santa goes right from the canvas it will go beyond 748 px. As we have 800*600px canvas
        if(new_santa_size_x >= 748)
        {
            new_santa_size_x = 748;
        }
        //santa will not go beyond 0px left side 
        if(new_santa_size_x <= 0)
        {
            new_santa_size_x = 0;
        }
        

        

        
        function sprite(){
            
            if(win)
            {
                //for winning true it will clear the screen first & then drawing a text
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.fillText("YOU WIN! YOUR SCORE IS " + gamePlayTimer, 230, 250);
                return;
            
            }

            //collision sleigh & santa
            if(santa_size_x < 120 && (santa_size_x + santaStanding.width) > 0 && santa_size_y < (474 + 76) && (santa_size_y + santaStanding.height) > 474)
            {
                console.log("detected");
                //when collided it will also clear the screen for all text and santa to be clear
                context.clearRect(0, 0, canvas.width, canvas.height);
                //then setting the win equals true.
                win = true;
                //it will then run the 133 no line

            }

            //when random number get posX and posY value positive. in this case posX=70, posY=70
            if(posWidth && posHeight){
                if(sx >= 102)
                {
                    sx = 0;
                }
                //clear screen
                context.clearRect(0, 51, canvas.width, canvas.height);
                //drawing only the sleigh image at the postion for detecting
                context.drawImage(sleigh, 0, 474, 138, 76);
                //santa will now move from 22 no line value if the condition of 155 no line is true. Then it will walk by 5 px x axis & 5 px y axis as the condition is true for 2 pos variable
                santa_size_x+=5;
                santa_size_y+=5;
                //remember we set 102 & 103 no line actual value so santa will move by the speed of 5 from santa size to new santa size. 
                if(santa_size_x >= new_santa_size_x){
                    santa_size_x = new_santa_size_x;
                    //setting runningAnim false
                    runningAnim = false;
                    clearInterval(b);
                }
                // same from 167 line but to the the y axis
                if(santa_size_y >= new_santa_size_y){
                    santa_size_y = new_santa_size_y;
                    runningAnim = false;
                    clearInterval(b);
                }
                // for false it will clear screen then draw the sleigh image & draw the santaStanding image. IT will fired when 171 & 177 line is executed
                if(!runningAnim){
                    context.clearRect(0, 51, canvas.width, canvas.height);
                    context.drawImage(sleigh, 0, 474, 138, 76);
                    context.drawImage(santaStanding, santa_size_x, santa_size_y, 50, 81);
                }
                //if not false it will walk by the drawing spriteSanta image
                if(runningAnim){
                    //id= santa1 image sx=0 (68 no line) 
                    context.drawImage(santa1, sx, sy, swidth, sheight, santa_size_x, santa_size_y, 51, 81);
                    //sx will be increment by 51 because we have santa1 image width * height is 102*81
                    //so it will first draw the left side image from 0 to 51 width, height is same

                    sx+=51;
                    // line 156 is for checking when it will draw 1st portion 0 to 51 & second portion from 52 to 102
                    //after 102 px it will again set sx=0 that means the santa1 image will looping walking
                }
            }
            //same concept; posX equal to negative , posY = negative 
            if(posWidthNeg && posHeightNeg){
                if(sx >= 102)
                {
                    sx = 0;
                }
                context.clearRect(0, 51, canvas.width, canvas.height);
                context.drawImage(sleigh, 0, 474, 138, 76);
                //speed
                santa_size_x-=5;
                if(santa_size_x <= new_santa_size_x){
                    santa_size_x = new_santa_size_x;
                    runningAnim = false;
                    clearInterval(b);
                }
                //speed
                santa_size_y-=5;
                if(santa_size_y <= new_santa_size_y){
                    santa_size_y = new_santa_size_y;
                    runningAnim = false;
                    clearInterval(b);
                }
                if(!runningAnim){
                    context.clearRect(0, 51, canvas.width, canvas.height);
                    context.drawImage(sleigh, 0, 474, 138, 76);
                    context.drawImage(santaStanding, santa_size_x, santa_size_y, 50, 81);
                }
                if(runningAnim){
                    context.drawImage(santa1, sx, sy, swidth, sheight, santa_size_x, santa_size_y, 51, 81);
                    sx+=51;
                }
            }
            if(posHeight && posWidthNeg){
                if(sx >= 102)
                {
                    sx = 0;
                }
                context.clearRect(0, 51, canvas.width, canvas.height);
                context.drawImage(sleigh, 0, 474, 138, 76);
                //speed
                santa_size_y+=5;
                if(santa_size_y >= new_santa_size_y){
                    santa_size_y = new_santa_size_y;
                    runningAnim = false;
                    clearInterval(b);
                }
                //speed
                santa_size_x-=5;
                if(santa_size_x <= new_santa_size_x){
                    santa_size_x = new_santa_size_x;
                    runningAnim = false;
                    clearInterval(b);
                }
                if(!runningAnim){
                    context.clearRect(0, 51, canvas.width, canvas.height);
                    context.drawImage(sleigh, 0, 474, 138, 76);
                    context.drawImage(santaStanding, santa_size_x, santa_size_y, 50, 81);
                }
                if(runningAnim){
                    context.drawImage(santa1, sx, sy, swidth, sheight, santa_size_x, santa_size_y, 51, 81);
                    sx+=51;
                }
                
            }
            if(posWidth && posHeightNeg){
                if(sx >= 102)
                {
                    sx = 0;
                }
                context.clearRect(0, 51, canvas.width, canvas.height);
                context.drawImage(sleigh, 0, 474, 138, 76);
                //speed
                santa_size_y-=5;
                if(santa_size_y <= new_santa_size_y){
                    santa_size_y = new_santa_size_y;
                    runningAnim = false;
                    clearInterval(b);
                }
                //speed
                santa_size_x+=5;
                if(santa_size_x >= new_santa_size_x){
                    santa_size_x = new_santa_size_x;
                    runningAnim = false;
                    clearInterval(b);
                }
                if(!runningAnim){
                    context.clearRect(0, 51, canvas.width, canvas.height);
                    context.drawImage(sleigh, 0, 474, 138, 76);
                    context.drawImage(santaStanding, santa_size_x, santa_size_y, 50, 81);
                }
                if(runningAnim){
                    context.drawImage(santa1, sx, sy, swidth, sheight, santa_size_x, santa_size_y, 51, 81);
                    sx+=51;
                }
            }
          //  if(sx >= 102){
            //sx = 0;
        //}
        //context.clearRect(0, 51, canvas.width, canvas.height);
        //context.drawImage(santa1, sx, sy, swidth, sheight, santa1.width++, santa1.height++, 51, 81);
        //sx = sx + 51;
        
    }
        var b = setInterval(sprite, 200);// every 200 milliseconds it will call the line 131 function for all of the checking
      
    }


    function draw() {
        context.drawImage(santaStanding, santa_size_x, santa_size_y, 50, 81);
        context.drawImage(sleigh, 0, 474, 138, 76);//sleigh image
        // END SANTA CREATE

        function myTimer() {
            var myDate = new Date();
            document.getElementById("timer").innerHTML = myDate.toLocaleTimeString();
        }
        // this function is going to check if the game is ready
        // function once ready
        function checkReady() {
            this.ready = true;
            playgame();
        }

        // Start game play
        function playgame() {
            render();
        }

        // Outputs the content to be drawn on canvas
        function render() {}
    }
}
