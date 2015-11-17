require(
   // Use this library to "fix" some annoying things about Raphel paper and graphical elements:
    //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
    //     b) call element.addEventListener(...) instead of element.node.addEventListner(...)
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {

        var paper = new Raphael(document.getElementById("centerDiv"));

        var pWidth = 1131;
        var pHeight = 610;
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);
        var bgRect = paper.rect(0,0,pWidth, pHeight);
        bgRect.attr({"fill": "black"});

        // Setting up initial start screen
        
        var startBackground = paper.image("images/title.png", 0, 0, pWidth, pHeight);
        var startButton = paper.image("images/play1.png", 410, 380, 300, 200);

        var menuBackground = paper.image("images/background1.png", 0, 0, pWidth, pHeight);
        menuBackground.hide();
        var instructionButton = paper.image("images/instructions.png", 150, 125, 300, 80);
        instructionButton.hide();
        var speedButton = paper.image("images/speed.png", 150, 215, 300, 80);
        speedButton.hide();
        var fuelButton = paper.image("images/fuel.png", 150, 305, 300, 80);
        fuelButton.hide();
        var playButton = paper.image("images/fly.png", 150, 395, 300, 80);
        playButton.hide();
        var difficultyLevel = 0
        var currentSpeed = paper.text(390, 85, difficultyLevel).attr({'font-size':'18px', "font-weight": "bold", "fill":"white"});
        currentSpeed.hide();
        var fuelAmount = 50;
        var currentFuel = paper.text(215, 85, fuelAmount + "%").attr({'font-size':'18px', 'font-weight':'bold', 'fill':'white'});
        currentFuel.hide();
        var flyDistance = 0;
        var lastScore = paper.text(860, 310, flyDistance).attr({'font-size':'20px', 'fill':'white'});
        lastScore.hide();
        var highscore = 0;
        var highScore = paper.text(860, 195, highscore).attr({'font-size':'20px', 'fill':'#32CD32'});
        highScore.hide();
        var totaldistance = 0;
        var numberGame = 0;
        var totalDistance = paper.text(860, 400, totaldistance).attr({'font-size':'20px', 'fill':'white'});
        totalDistance.hide();
        var gameTries = paper.text(815, 432, numberGame).attr({'font-size':'20px', 'fill':'white'});
        gameTries.hide()
        var lives = 3;
        var lifenumber = paper.text(930, 85, lives).attr({'font-size':'25px', 'font-weight':'bold', 'fill':'red'});
        lifenumber.hide();
        var gameoverBackground = paper.image("images/gameover.png", 0, 0, pWidth, pHeight);
        gameoverBackground.hide();
        var gameoverButton = paper.image("images/playagain.png", 325, 390, 500, 225);
        gameoverButton.hide();
        var gameoverDistance = paper.text(650, 270, totaldistance).attr({'font-size':'25px', 'font-weight':'bold', 'fill':'white'});
        gameoverDistance.hide();
        var gameoverTries = paper.text(650, 330, numberGame).attr({'font-size':'25px', 'font-weight':'bold', 'fill':'white'});
        gameoverTries.hide();
        var gameoverHigh = paper.text(650, 395, highscore).attr({'font-size':'25px', 'font-weight':'bold', 'fill':'white'});
        gameoverHigh.hide();

        var instructionBackground = paper.image("images/instructionstory.png", 0, 0, pWidth, pHeight);
        instructionBackground.hide();
        var instructionfuel = paper.image("images/instructionfuel.png", 0, 0, pWidth, pHeight);
        instructionfuel.hide();
        var instructionflight = paper.image("images/instructionflight.png", 0, 0, pWidth, pHeight);
        instructionflight.hide();

        var storybuttonpressed = paper.image("images/storypressed.png", 855, 100, 200, 50);
        storybuttonpressed.hide();
        var storybuttonunpressed = paper.image("images/storyunpressed.png", 855, 100, 200, 50);
        storybuttonunpressed.hide();
        var fuelbuttonpressed = paper.image("images/fuelpressed.png", 855, 230, 200, 50);
        fuelbuttonpressed.hide();
        var fuelbuttonunpressed = paper.image("images/fuelunpressed.png", 855, 230, 200, 50);
        fuelbuttonunpressed.hide();
        var flightbuttonpressed = paper.image("images/flightpressed.png", 855, 300, 200, 50);
        flightbuttonpressed.hide();
        var flightbuttonunpressed = paper.image("images/flightunpressed.png", 855, 300, 200, 50);
        flightbuttonunpressed.hide();

        var backtomenuButton = paper.image("images/backtomenu.png", 840, 380, 250, 150);
        backtomenuButton.hide();
        var instructionsText = paper.text(570, 300, "In a last ditch effort to save humanity, you've volunteered\nto take control of one of the last few spaceships left on Earth.\nIt is now your mission to travel as far as you can\nin order to find a habitable planet to save mankind.\n \nYou are on a one-person team and will have to collect your own fuel and\nmake your own navigational decisions.\n \nThe command wishes you the best of luck.").attr({'font-size':'15px', 'fill':'white'});
        instructionsText.hide()
        var fuelText = paper.text(570, 300, "In order to replenish your fuel supply,\nyou will have to consume the fuel units that are\nsmaller than your current fuel unit upon which your fuel supply will increase.\nMove your fuel unit around by moving your mouse around the screen\nHowever, if you try to collect a fuel unit that is\nlarger than your unit, a life will be lost.\n \nYou start off with 3 lives, and the game is over once it hits 0.").attr({'font-size':'15px', 'fill':'white'});
        fuelText.hide()
        var flightText = paper.text(570, 330, "Navigating through space, you will have to avoid\nthe meteorites and asteroids in your path.\n \nNavigate your spaceship by moving your mouse around the screen,\navoiding the asteroids and meteorites.\nAny collision with a meteorite or asteroid will result in you\nlosing a life.\n \nYou start off with 3 lives, and the game is over once it hits 0.").attr({'font-size':'15px', 'fill':'white'});
        flightText.hide()

        var backgroundsound = new Audio("sounds/background.wav");
        backgroundsound.autoplay = true;
        backgroundsound.loop = true
        var flybackground = new Audio("sounds/flybackground.wav");
        var fuelbackground = new Audio("sounds/fuelbackground.wav");
        var fuelcollect = new Audio("sounds/fuel.wav");
        var explosion = new Audio("sounds/explosion.mp3");
        var gameoversound = new Audio("sounds/gameover.wav");

        var mouseX = 0;
        var mouseY = 0;

        var flyTime = 0


        var moveValue = 0

        var randInt = function(lim){
            return Math.floor(lim*Math.random())
        };
        var number = function(x,a,b,m,n){
            return (n-m)*(x-a)/(b-a)+m
        };
        var distance = function(x1,y1,x2,y2){
            return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
        };

        var dotColor = [];
        i=0
        while (i<300){
            dotColor[i] = number(randInt(50),1,50,0,1) // Generating a random number between 1 and 50 and scaling it to be between 0 and 1
            
            i=i+1
        };

        var dot = [];
        i = 0;
            while (i<300){
                
                dot[i] = paper.image("images/meteorite.png", ((randInt(-100))-1)*20, ((randInt(-100))-1)*20, 45, 45); // Specify the size and initial position of the dots
                var color = "hsl(" + dotColor[i] + ", 0.5, 0.5)" // Creating a variable with a hsl string using the random number generated in dotColor for the hue value
                
                i=i+1
            };  

        var spaceship = paper.image("images/spaceship.png", mouseX, mouseY, 50, 50);
        spaceship.hide();

        var mouseDot = paper.image("images/playerfuel.png", (mouseX-20), (mouseY-20), 40, 40);
        mouseDot.hide();


        var mainMenu = function(){
            startBackground.hide();
            startButton.hide();
            instructionBackground.hide();
            backtomenuButton.hide();
            continueButton.hide();
            gameoverBackground.hide();
            gameoverButton.hide();
            gameoverDistance.hide();
            gameoverTries.hide();
            gameoverHigh.hide();
            fuelScore.hide();
            flyScore.hide();
            fuelbackground.pause();
            flybackground.pause();

            backgroundsound.play();
            backgroundsound.loop = true;
            totaldistance=0
            numberGame=0
            totalDistance.attr({text: totaldistance})
            gameTries.attr({text: numberGame})
            lives=3
            lifenumber.attr({text: lives})
            fuelAmount=50
            currentFuel.attr({text: fuelAmount + "%"});
            flyDistance=0
            lastScore.attr({text: flyDistance})
            highscore=0
            highScore.attr({text: highscore})

            menuBackground.show();
            instructionButton.show();
            speedButton.show();
            playButton.show();
            fuelButton.show()
            currentSpeed.show();
            currentFuel.show();
            lastScore.show();
            highScore.show();
            totalDistance.show();
            lifenumber.show();
            gameTries.show()
        }

        var mainMenuInstruction = function(){
            instructionBackground.hide();
            backtomenuButton.hide();
            instructionsText.hide();
            instructionfuel.hide();
            instructionflight.hide();
            storybuttonunpressed.hide();
            storybuttonpressed.hide();
            fuelbuttonunpressed.hide();
            fuelbuttonpressed.hide();
            flightbuttonunpressed.hide();
            flightbuttonpressed.hide();
            fuelText.hide();
            flightText.hide()

            menuBackground.show();
            instructionButton.show();
            speedButton.show();
            playButton.show();
            fuelButton.show()
            currentSpeed.show();
            currentFuel.show();
            lastScore.show();
            highScore.show();
            totalDistance.show();
            lifenumber.show();
            gameTries.show()
        }

        var backtomain = function(){
            i = 0;
            while (i<150){
                fuelDot[i].attr({"y": ((randInt(-50))-1)*200});

                i=i+1
            };  
            i = 0;
            while (i<300){
                dot[i].attr({"x": ((randInt(-100))-1)*20, "y": ((randInt(-100))-1)*20})
                dot[i].xpos=dot[i].attr('x'); // Set the value of xpos to be the current position of the dot
                dot[i].ypos=dot[i].attr('y');

                i=i+1
            };
            console.log("clicked");
            continueButton.hide();
            fuelCount.hide()
            fuelfly.hide();
            distanceTravelled.hide();
            fuelScore.hide();
            flyScore.hide();
            fuelfull.hide();
            fuelempty.hide();
            fuelbackground.pause();
            flybackground.pause();

            backgroundsound.play();
            backgroundsound.loop = true;
            menuBackground.show();
            instructionButton.show();
            speedButton.show();
            playButton.show();
            fuelButton.show()
            currentSpeed.show();
            currentFuel.show();
            lastScore.show();
            highScore.show();
            totalDistance.show();
            lifenumber.show()
            gameTries.show()
        }

        var instructionPage = function(){
            menuBackground.hide();
            instructionButton.hide();
            speedButton.hide();
            playButton.hide();
            fuelButton.hide()
            currentSpeed.hide();
            currentFuel.hide()
            lastScore.hide();
            highScore.hide();
            totalDistance.hide();
            lifenumber.hide();
            gameTries.hide();
            instructionfuel.hide();
            fuelbuttonpressed.hide();
            flightbuttonunpressed.hide();
            instructionflight.hide();
            storybuttonunpressed.hide();
            fuelbuttonunpressed.hide();
            flightbuttonpressed.hide();
            fuelText.hide();
            flightText.hide();

            instructionBackground.show();
            backtomenuButton.show();
            instructionsText.show();
            storybuttonpressed.show();
            fuelbuttonunpressed.show();
            flightbuttonunpressed.show();
        }

        var fuelinstruction = function(){
            instructionBackground.hide();
            instructionsText.hide();
            storybuttonpressed.hide();
            fuelbuttonunpressed.hide();
            flightbuttonunpressed.hide();
            instructionflight.hide();
            storybuttonunpressed.hide();
            fuelbuttonunpressed.hide();
            flightbuttonpressed.hide();
            flightText.hide()

            instructionfuel.show();
            storybuttonunpressed.show();
            fuelbuttonpressed.show();
            flightbuttonunpressed.show();
            fuelText.show();
        }

        var flightinstruction = function(){
            instructionBackground.hide();
            instructionsText.hide();
            storybuttonpressed.hide();
            fuelbuttonunpressed.hide();
            flightbuttonunpressed.hide();
            instructionfuel.hide();
            fuelbuttonpressed.hide();
            flightbuttonunpressed.hide();
            fuelText.hide();

            instructionflight.show();
            storybuttonunpressed.show();
            fuelbuttonunpressed.show();
            flightbuttonpressed.show();
            flightText.show();
        }

        var speed;
        var speedLevel = function(){
            speed = prompt("Please set your desired speed:\n\nGear 1: Slow\nGear 2: Normal\nGear 3: Fast\nGear 4: Supersonic\nGear 5: Lightning speed\n\nControl input:", "Enter only either 1, 2, 3, 4, or 5");
            
            if (speed!= null) {
                difficultyLevel = Number(speed);
                console.log("User has inputed difficulty level: " + difficultyLevel);
                    
                    // This checks that the converted string is 1-5, otherwise will inform user it's wrong
                    // and prompt again to enter by calling the function levelInput again
                    // Also change text of currentLevel object so that users can see the difficulty value on screen
                    if (difficultyLevel>0 && difficultyLevel<6) {
                        alert("Speed set to: "+ difficultyLevel);
                        currentSpeed.attr({text: difficultyLevel});
                    }
                    else {
                        alert("Inappropriate speed selected. Please only select gears 1-5.");
                        levelInput();
                    }
            }
        }

        i=0
        while(i<300){
            var dotValueX = number(Math.random(),0,1,-10,10); // Generate a random value to be used by each dot
            var dotValueY = number(Math.random(),0,1,-10,10); // Generate a random value to be used by each dot
            moveValue = randInt(difficultyLevel*3);
            dot[i].xpos=dot[i].attr('x'); // Set the value of xpos to be the current position of the dot
            dot[i].ypos=dot[i].attr('y');
            dot[i].xrate=moveValue*2; // Set the rate to be using the random value generated above
            dot[i].yrate=moveValue*2; 

            i=i+1
        }

        var mouseDotDistance;
        var mainInterval;
        var mainEmit;
        var mainScore;
        var mainFuel;

        var draw = function(){
            
            // Create the movement of the array of dots
            i = 0
            while (i<300){

                dot[i].xpos += dot[i].xrate; // Change the xpos and ypos based on the xrate and yrate generated above
                dot[i].ypos += dot[i].yrate;

                dot[i].attr({"x": dot[i].xpos, "y": dot[i].ypos}); // Change the attributes of the dots accordingly
                mouseDotDistance = distance(mouseX, mouseY, dot[i].xpos, dot[i].ypos); // Compute the distance between the cursor and the position of each dot
                if(mouseDotDistance<45){
                    console.log("Hit detected");
                    lives=lives-1
                    lifenumber.attr({text: lives})
                    explosion.play();
                    alert("You lost a life!")
                    if(lives != 0){
                        clearInterval(mainInterval);
                        clearInterval(mainEmit);
                        clearInterval(mainScore);
                        clearInterval(mainFuel);
                        continueButton.show();
                        transpRect.hide();
                        spaceship.hide();
                    } else {
                        clearInterval(mainInterval);
                        clearInterval(mainEmit);
                        clearInterval(mainScore);
                        clearInterval(mainFuel);
                        transpRect.hide();
                        spaceship.hide();
                        i = 0;
                        while (i<300){
                            dot[i].attr({"x": ((randInt(-100))-1)*20, "y": ((randInt(-100))-1)*20})
                            dot[i].xpos=dot[i].attr('x'); // Set the value of xpos to be the current position of the dot
                            dot[i].ypos=dot[i].attr('y');

                            i=i+1
                        };
                        gameoverDistance.attr({text: totaldistance});
                        gameoverTries.attr({text: numberGame});
                        gameoverHigh.attr({text: highscore});
                        gameoverDistance.show();
                        gameoverTries.show();
                        gameoverHigh.show();
                        gameoverBackground.show();
                        gameoverButton.show();
                        fuelCount.hide();
                        fuelfly.hide();
                        fuelScore.hide();
                        flyScore.hide();
                        distanceTravelled.hide();
                        flybackground.pause();
                        gameoversound.play();
                    };
                }
                if(fuelAmount===0){
                    clearInterval(mainInterval);
                    clearInterval(mainEmit);
                    clearInterval(mainScore);
                    clearInterval(mainFuel);
                    fuelempty.show();
                    transpRect.hide();
                    spaceship.hide();

                }
                

                i=i+1;           
            }

            spaceship.attr({"x": mouseX, "y": mouseY});
        }


        var nexttoemit = 0
        var emit = function(i){
            moveValue = randInt(difficultyLevel*3)
            dot[nexttoemit].xpos = ((randInt(-100))-1)*20;
            dot[nexttoemit].ypos = ((randInt(-100))-1)*20;
            dot[nexttoemit].xrate = moveValue*2;
            dot[nexttoemit].yrate = moveValue*2;
            nexttoemit++;
            if(nexttoemit === 300){
                nexttoemit = 0
            }
        }

        var gameScore = function(){
            flyDistance = flyDistance+(10*speed)
            lastScore.attr({text: flyDistance})
            totaldistance = totaldistance+(10*speed);
            totalDistance.attr({text: totaldistance})
            distanceTravelled.attr({text: flyDistance});
            if(flyDistance > highscore){
                highscore = flyDistance
                highScore.attr({text: highscore});
            }
        }

        var gameFuel = function(){
            fuelAmount = fuelAmount-5
            fuelCount.attr({text: fuelAmount + "%"});
            fuelfly.attr({text: fuelAmount + "%"});
            currentFuel.attr({text: fuelAmount + "%"});
        }
        

        var gamePage = function(e){
            if(fuelAmount > 10 && speed>0 && speed<6){
            menuBackground.hide();
            instructionButton.hide();
            speedButton.hide();
            playButton.hide();
            fuelButton.hide()
            currentSpeed.hide();
            currentFuel.hide();
            continueButton.hide();
            lastScore.hide();
            highScore.hide();
            totalDistance.hide();
            lifenumber.hide();
            gameTries.hide();
            fuelScore.hide();
            fuelCount.hide();
            backgroundsound.pause();

            flybackground.play();
            flybackground.loop = true;
            flyScore.show();
            fuelfly.show();
            distanceTravelled.show();
            numberGame=numberGame+1;
            gameTries.attr({text: numberGame})
            flyDistance = 0;
            transpRect.show();
            transpRect.attr({"fill": "white", "fill-opacity": 0}) // Setting box to be transparent
            transpRect.addEventListener("mousemove", function(e){
                mouseX = e.offsetX;
                mouseY = e.offsetY
            });
            transpRect.addEventListener("mouseover", function(e){
                e.currentTarget.style.cursor = "crosshair"
            })
            spaceship.show();
            mainInterval = setInterval(draw, 0); 
            mainEmit = setInterval(emit, 50);
            mainScore = setInterval(gameScore, 10);
            mainFuel = setInterval(gameFuel, 5000);
            } else {
                alert("Your spaceship is not ready for flight!\nPlease check your speed setting or amount of fuel available.")
            } 
        }

            var drawInterval;
            var repeatInterval;

            var fuelDot = [];
            var fuelCreate = function(){
                i = 0;
                while (i<150){
                    fuelsize = (randInt(60)+3)*4
                    fuelDot[i] = paper.image("images/fuelicon.png", randInt(1200), ((randInt(-50))-1)*200, fuelsize, fuelsize); // Specify the size and initial position of the dots
                    var color = "hsl(" + dotColor[i] + ", 0.5, 0.5)" // Creating a variable with a hsl string using the random number generated in dotColor for the hue value
                    fuelDot[i].show()
                    fuelDot[i].xpos=fuelDot[i].attr('x'); // Set the value of xpos to be the current position of the dot
                    fuelDot[i].ypos=fuelDot[i].attr('y');
                    fuelDot[i].xrate=randInt(2); // Set the rate to be using the random value generated above
                    fuelDot[i].yrate=randInt(2);
                    
                    i=i+1
                };  
            };
            
            var fuelDraw = function(){
            i = 0
            while (i<150){
                var area = function(x,y){
                    return x*y;
                }

                fuelDot[i].xpos += fuelDot[i].xrate; // Change the xpos and ypos based on the xrate and yrate generated above
                fuelDot[i].ypos += fuelDot[i].yrate;

                mouseDotDistance = distance(mouseX, mouseY, (fuelDot[i].xpos+(fuelDot[i].attr("width")*0.75)), (fuelDot[i].ypos+(fuelDot[i].attr("height")*0.75))); // Compute the distance between the cursor and the position of each dot

                fuelDot[i].attr({"x": fuelDot[i].xpos, "y": fuelDot[i].ypos}); // Change the attributes of the dots accordingly

                if(lives != 0){
                if(mouseDotDistance <= (mouseDot.attr("width")/2) && mouseDot.attr("width")>=fuelDot[i].attr("width")){
                    fuelDot[i].attr({"y": ((randInt(-50)-1)*200)});
                    fuelDot[i].attr({"y": ((randInt(-50)-1)*200)});
                    fuelDot[i].ypos = fuelDot[i].attr("y");
                    mouseDot.attr({"width": mouseDot.attr("width")+5});
                    mouseDot.attr({"height": mouseDot.attr("height")+5});
                    fuelAmount = fuelAmount+5;
                    console.log("Fuel is " + fuelAmount)
                    currentFuel.attr({text: fuelAmount + "%"});
                    fuelCount.attr({text: fuelAmount + "%"});
                    fuelfly.attr({text: fuelAmount + "%"});
                    fuelcollect.play();
                }

                if(fuelAmount === 100){
                    clearInterval(drawInterval);
                    clearInterval(repeatInterval);
                    fuelfull.show();
                    mouseDot.hide();
                    transpRect.hide();
                };

                if(mouseDotDistance <= (fuelDot[i].attr("width")/2) && mouseDot.attr("width") < fuelDot[i].attr("width")){
                    explosion.play();
                    clearInterval(drawInterval);
                    clearInterval(repeatInterval);
                    continueButton.show();
                    mouseDot.hide();
                    transpRect.hide();
                    lives = lives-1;
                    lifenumber.attr({text: lives});
                    alert("You lost a life!")
                };
                } else {
                    clearInterval(drawInterval);
                    clearInterval(repeatInterval);
                    transpRect.hide();
                    mouseDot.hide();
                    continueButton.hide();
                    fuelCount.hide()
                    fuelfly.hide()
                    i = 0;
                    while (i<150){
                        fuelDot[i].attr({"x": randInt(1200), "y": ((randInt(-50))-1)*200})
                        fuelDot[i].xpos=fuelDot[i].attr('x'); // Set the value of xpos to be the current position of the dot
                        fuelDot[i].ypos=fuelDot[i].attr('y');

                        i=i+1
                    };
                    gameoverDistance.attr({text: totaldistance});
                    gameoverTries.attr({text: numberGame});
                    gameoverHigh.attr({text: highscore});
                    gameoverDistance.show();
                    gameoverTries.show();
                    gameoverHigh.show();
                    gameoverBackground.show();
                    gameoverButton.show();
                    gameoversound.play();
                    fuelbackground.pause();
                    fuelScore.hide();
                }

                i=i+1;           
            }

            mouseDot.attr({"x": (mouseX-(mouseDot.attr("width")/2)), "y": (mouseY-(mouseDot.attr("height")/2))});
            


        }

            var nexttoemit = 0
            var fuelemit = function(i){
                moveValue = randInt(4)
                fuelDot[nexttoemit].xpos = randInt(1200);
                fuelDot[nexttoemit].ypos = ((randInt(-50))-1)*80;
                fuelDot[nexttoemit].xrate = randInt(3);
                fuelDot[nexttoemit].yrate = randInt(3);
                nexttoemit++;
                if(nexttoemit === 150){
                    nexttoemit = 0
                }

            }

            fuelCreate();

        var fuelPage = function(e){
            i=0
            while(i<150){
                fuelDot[i].attr({"y": ((randInt(-50)-1)*200)});
                fuelDot[i].ypos=fuelDot[i].attr('y');
                i=i+1
            }
            if(fuelAmount < 100){
            menuBackground.hide();
            instructionButton.hide();
            speedButton.hide();
            playButton.hide();
            fuelButton.hide()
            currentSpeed.hide();
            continueButton.hide();
            currentFuel.hide();
            lastScore.hide();
            highScore.hide();
            totalDistance.hide();
            lifenumber.hide();
            gameTries.hide();
            fuelfull.hide();
            backgroundsound.pause();

            fuelbackground.play();
            fuelbackground.loop = true
            fuelScore.show();
            fuelCount.show();
            mouseDot.attr({"width": 40, "height": 40});
            nexttoemit=0
            mouseDot.show();
            transpRect.show();
            transpRect.addEventListener("mousemove", function(e){
                mouseX = e.offsetX;
                mouseY = e.offsetY
            });
            transpRect.addEventListener("mouseover", function(e){
                e.currentTarget.style.cursor = "crosshair"
            })
            drawInterval = setInterval(fuelDraw, 20)
            repeatInterval = setInterval(fuelemit, 100)
            } else {
                alert("You already have max fuel!")
            }
        }

        var fuelScore = paper.image("images/fuelscore.png", 900, 10, 300, 100)
        fuelScore.hide();
        var flyScore = paper.image("images/flyscore.png", 800, 10, 300, 100)
        flyScore.hide();
        var fuelCount = paper.text(1030, 60, fuelAmount + "%").attr({'font-size':'25px', 'font-weight':'bold', 'fill':'white'});
        fuelCount.hide();
        var fuelfly = paper.text(1010, 40, fuelAmount + "%").attr({'font-size':'25px', 'font-weight':'bold', 'fill':'white'});
        fuelfly.hide();
        var distanceTravelled = paper.text(1010, 85, flyDistance).attr({'font-size':'25px', 'font-weight':'bold', 'fill':'white'});
        distanceTravelled.hide();


        var transpRect = paper.rect(0,0,pWidth,pHeight);
        transpRect.attr({"fill": "white", "fill-opacity": 0}) 
        transpRect.hide();
        var continueButton = paper.image("images/lifelost.png", 0, 0, pWidth, pHeight);
        continueButton.hide();
        var fuelempty = paper.image("images/fuelempty.png", 0, 0, pWidth, pHeight);
        fuelempty.hide();
        var fuelfull = paper.image("images/fuelfull.png", 0, 0, pWidth, pHeight);
        fuelfull.hide();

        startButton.addEventListener("click", mainMenu);
        instructionButton.addEventListener("click", instructionPage);
        backtomenuButton.addEventListener("click", mainMenuInstruction);
        speedButton.addEventListener("click", speedLevel);
        playButton.addEventListener("click", gamePage);
        fuelButton.addEventListener("click", fuelPage);
        continueButton.addEventListener("click", backtomain);
        gameoverButton.addEventListener("click", mainMenu);
        fuelempty.addEventListener("click", backtomain);
        fuelfull.addEventListener("click", backtomain);
        storybuttonunpressed.addEventListener("click", instructionPage);
        fuelbuttonunpressed.addEventListener("click", fuelinstruction);
        flightbuttonunpressed.addEventListener("click", flightinstruction)
});