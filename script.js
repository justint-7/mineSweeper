//tried to apply name spacing-- work in progress!
const app={};
//this gridData holds the data for the mine field (x,y coordinates of mines)
app.gridData =[];
//counter for mines that will be displayed and changed as the user marks more mines)
app.mineCounter = 0;
//setting this as false in the beginning
app.gameOver= false;
//counter for how many squares have been revealed
app.revealCount=0;
//used to make the restart button not show startup alert when calling app.init
app.startAlertPlayed=false;


//random number generator that will not exceed the maximum value input as second parameter
app.randomNumber= (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  //reveal method that will be called when a square is selected and subsequently revealed (by the click or by the cascade)
  //there are 10 cases.. 0-8 represent numbers that correspond to the number of bombs surrounding the revealed square in question, while 10 means that the square actually contains a bomb and it is game over
app.reveal=(x,y)=>{
    app.revealCount+=1;
    let tempId= y*16+x;
    switch (app.gridData[x][y]){
        case 0:
            $(`#${tempId}`).addClass('revealed zero');  
            $('p')[tempId].revealed = true;       
            break;
        case 1:
            $(`#${tempId}`).addClass('revealed one');
            $('p')[tempId].revealed = true;
            break;
        case 2:
            $(`#${tempId}`).addClass('revealed two');
            $('p')[tempId].revealed = true;
            break;
        case 3:
            $(`#${tempId}`).addClass('revealed three');
            $('p')[tempId].revealed = true;
            break;
        case 4:
            $(`#${tempId}`).addClass('revealed four');
            $('p')[tempId].revealed = true;
            break;
        case 5:
            $(`#${tempId}`).addClass('revealed five');
            $('p')[tempId].revealed = true;
            break;
        case 6:
            $(`#${tempId}`).addClass('revealed six');
            $('p')[tempId].revealed = true;
            break;
        case 7:
            $(`#${tempId}`).addClass('revealed seven');
            $('p')[tempId].revealed = true;
            break;
        case 8:
            $(`#${tempId}`).addClass('revealed eight');
            $('p')[tempId].revealed = true;
            break;    
        case 10:
            //10 = bomb...........when a bomb is clicked its game over so i put the game over behaviour here
            $(`#${tempId}`).addClass('revealed');
            $('p')[tempId].revealed = true;
            $('p')[tempId].textContent= 'X';
            //so that the alert only pops up once when we call upon this method again
            if (app.gameOver===false) {
                alert('Game over! You clicked a bomb!')};
            app.gameOver= true;
            //reveal the entire field
            for (let i = 0; i <256; i++){
                if($('p')[i].revealed===false){
                app.reveal($('p')[i].xGrid,$('p')[i].yGrid);
                };
            }; 
            break;
        default:
            console.log('error')
    };

}

//this is a cascade method that will reveal all surrounding squares of a square with no bombs around it-- and will spread/propogate this behaviour if there is a connected square with no bombs around it
//there are 8 if statements that will each check a square that surrounds the targeted square (e.g. top left, top , top right, left, right, bottom left,bottom bottom right)
//each if statement first checks if any value will go out of the array bounds and crash the script, then it checks the value of the square and reveals it. if it is 0 then it calls upon itself to repeat the process on the new target square before continuing to check the other surrounding squares.
//lastly in each if statement is a statement that makes sure that the square being investigated isnt already revealed. this is so that it will not infinitely loop when it checks a surrounding square that has a value of 0 and attempts to propogate the cascade to the previous square.
app.cascade=(x,y,gridWidth,gridHeight) =>{
//top left 
if (x-1>=0 && y-1>=0 && app.gridData[x-1][y-1]===0 && $('p')[(y-1)*16+x-1].revealed===false){
    app.reveal(x-1,y-1);  
    app.cascade(x-1,y-1,gridWidth,gridHeight)
                          
}
else if (x-1>=0 && y-1>=0 && app.gridData[x-1][y-1]!==0&& $('p')[(y-1)*16+x-1].revealed===false){
    app.reveal(x-1,y-1);
};

//left check
if (x-1>=0 && app.gridData[x-1][y]===0&& $('p')[y*16+x-1].revealed===false){
    app.reveal(x-1,y);   
    app.cascade(x-1,y,gridWidth,gridHeight);
         
}
else if(x-1>=0 && app.gridData[x-1][y]!=0&& $('p')[y*16+x-1].revealed===false){
    app.reveal(x-1,y);
};

// bottom left
if (x-1>=0 && y+1<gridWidth && app.gridData[x-1][y+1]===0&& $('p')[(y+1)*16+x-1].revealed===false){
    app.reveal(x-1,y+1); 
    app.cascade(x-1,y+1,gridWidth,gridHeight);
}
else if(x-1>=0 && y+1<gridWidth && app.gridData[x-1][y+1]!==0&& $('p')[(y+1)*16+x-1].revealed===false){
    app.reveal(x-1,y+1);
};

//top check
if (y-1>=0 && app.gridData[x][y-1]===0&& $('p')[(y-1)*16+x].revealed===false){
    app.reveal(x,y-1);   
    app.cascade(x,y-1,gridWidth,gridHeight);
 
}
else if(y-1>=0 && app.gridData[x][y-1]!==0&& $('p')[(y-1)*16+x].revealed===false){
    app.reveal(x,y-1);   
};


// bottom
if (y+1<gridWidth && app.gridData[x][y+1]===0&& $('p')[(y+1)*16+x].revealed===false){
    app.reveal(x,y+1);   
    app.cascade(x,y+1,gridWidth,gridHeight);

}
else if (y+1<gridWidth && app.gridData[x][y+1]!==0&& $('p')[(y+1)*16+x].revealed===false){
    app.reveal(x,y+1);
};

//top right check
if (x+1<gridHeight && y-1>=0 && app.gridData[x+1][y-1]===0&& $('p')[(y-1)*16+x+1].revealed===false){
    app.reveal(x+1,y-1);    
    app.cascade(x+1,y-1,gridWidth,gridHeight);

}
else if(x+1<gridHeight && y-1>=0 && app.gridData[x+1][y-1]!==0&& $('p')[(y-1)*16+x+1].revealed===false){
    app.reveal(x+1,y-1);
};

//right check
if (x+1<gridHeight && app.gridData[x+1][y]===0&& $('p')[y*16+x+1].revealed===false){
    app.reveal(x+1,y);    
    app.cascade(x+1,y,gridWidth,gridHeight);

}
else if(x+1<gridHeight && app.gridData[x+1][y]!==0&& $('p')[y*16+x+1].revealed===false){
    app.reveal(x+1,y);
};

//bottom right check
if (x+1<gridHeight && y+1<gridWidth && app.gridData[x+1][y+1]===0&& $('p')[(y+1)*16+x+1].revealed===false){
    app.reveal(x+1,y+1);   
    app.cascade(x+1,y+1,gridWidth,gridHeight);
 
}
else if (x+1<gridHeight && y+1<gridWidth && app.gridData[x+1][y+1]!==0&& $('p')[(y+1)*16+x+1].revealed===false){
    app.reveal(x+1,y+1);
};
};

//click behaviour
app.click= (gridWidth,gridHeight) =>{
    let tempId= 0;
    //diable context menu on right click
    $('p').on('contextmenu', function (event){
        event.preventDefault();
        //redefine right click behaviour
        //tempid yields the jquery p index position -- hard coded for a 16x16 grid
        tempId= this.yGrid*16+this.xGrid;
        //right click will allow user to mark a square as a mine and right clicking it again will remove the mark
        //first if statement will restrict this right click behaviour to non-revealed squares
        if ($('p')[tempId].revealed===false){
            //toggle the marked state by toggling a class
            $(`#${tempId}`).toggleClass('marked');
            $('p')[tempId].marked= !$('p')[tempId].marked;
        if ($('p')[tempId].marked=== true){
            //marking a square will lower the mine counter by 1
            app.mineCounter -=1;
            $('.bombCounter').text(app.mineCounter);
        }
        else {
            //unmarking a square increase the mine counter by 1
            app.mineCounter +=1;
            $('.bombCounter').text(app.mineCounter);
        };
        };   
    });
    //left click behaviour
    $('p').on('click', function (event){
        tempId= this.yGrid*16+this.xGrid;
        //hard coded for rows of 16 at the moment; does math to find the index of click square given x and y coordinates
        // when clicked, read what the value of the square is supposed to be, and then give it the appropriate classes to reveal it
        if ($('p')[tempId].revealed ===false){
        switch (app.gridData[this.xGrid][this.yGrid]){
            //if the square clicked has no bombs around it, initiate cascading behaviour and reveal the square
            case 0:
                app.reveal(this.xGrid,this.yGrid);
                app.cascade(this.xGrid,this.yGrid,gridWidth,gridHeight);                    
                break;
            default:
                //otherwise just reveal the square
                app.reveal(this.xGrid,this.yGrid);
            };
        };
        if (app.revealCount>=256-40 && app.gameOver===false){
            alert("CONGRATULATIONS! YOU'VE WON!");
        };    
    });
};



//setup minefield information (randomize which boxes will have bombs)
//create grid based on width and height parameters
app.mineField = (numberofBombs, gridWidth, gridHeight) =>{
    //generate and display html elements that will serve as squares, and give each square a unique id that corresponds with their index number
    for (let i = 0; i< (gridWidth*gridHeight);i++){
        $('.flexContainer').append(`<p id=${i} >0</p>`);
    }

//give each p element an x and y key+value that cooresponds to their grid position
    //temp counter variable
    let gridCounter = 0;
    //temp array variable to append to a bigger array (app.gridData) which will contain the numerical values of each square (and whether or not the square is a bomb);
    let tempArray = [];

    //iterate through each square
    for (let i= 0; i< gridHeight; i++){
        for (let j=0; j< gridWidth; j++){
            //giving each p object (which will are our squares) coordinates in case I need to refer to it in the future
            $('p')[gridCounter].xGrid= j;
            $('p')[gridCounter].yGrid= i;
            //index position stored under .value
            $('p')[gridCounter].value= gridCounter;
            $('p')[gridCounter].revealed=false;
            $('p')[gridCounter].marked=false;
            //arbitrary setup number of 11 assigned to this temp array each iteration
            tempArray.push(11);
            gridCounter += 1;
  
        };
        //setup the dimensions of our information grid by appending the temp array each time the for loop iterates to a new row
        app.gridData.push(tempArray)
        //empty temp array for next row of interations
        tempArray = [];

    };
    //we now have a grid with the dimensions of gridHeight and gridWidth, and all squares hold the value of 11.

    //time to randomize which squares will have bombs
    // 2 temp bomb variables to make code easier to understand
    let xBomb = 0;
    let yBomb = 0;
    // generate 2 random coordinates (one for x, one for y) and repeat for as many times required until the number of bombs equals the parameter
    for (let i = 0; i< numberofBombs; i++){
        xBomb = app.randomNumber(0,gridWidth-1);
        yBomb = app.randomNumber(0,gridHeight-1);

        //if statement to check if a bomb already exists in the randomized coordinates. if no bomb (value of 11), set a bomb (value of 10);
        if (app.gridData[xBomb][yBomb]===11){
        app.gridData[xBomb][yBomb]=10;
        }
        //if there is a bomb there, i-1 means that this generation loop will iterate an extra time to make up for the overlapping bomb generation
        else if(app.gridData[xBomb][yBomb]===10){
            i-=1;
        };
    };
  //we now have a multi-dimension array that has bombs (value of 10), and "empty" cells (value of 11);
  //we will now assign squares with a value of 11 their proper numerical value based on surrounding bombs

    //temp variable to serve as a counter for what each square's number value is based on how many bombs are around it
    let tempSquareValue=0;

    //iterate through each square and check if surround squares have a bomb (value of 10)
    for (let i= 0; i< gridHeight; i++){
        for (let j=0; j< gridWidth; j++){
            
            if (app.gridData[i][j]===11){
                //top left check
                if (i-1>=0 && j-1>=0 && app.gridData[i-1][j-1]===10){
                    tempSquareValue +=1;
                };
                //left check
                if (i-1>=0 && app.gridData[i-1][j]===10){
                    tempSquareValue +=1;
                };
                // bottom left check
                if (i-1>=0 && j+1<gridWidth && app.gridData[i-1][j+1]===10){
                    tempSquareValue +=1;
                };
                //top check
                if (j-1>=0 && app.gridData[i][j-1]===10){
                    tempSquareValue +=1;
                };
                // bottom check
                if (j+1<gridWidth && app.gridData[i][j+1]===10){
                    tempSquareValue +=1;
                };
                //top right left check
                if (i+1<gridHeight && j-1>=0 && app.gridData[i+1][j-1]===10){
                    tempSquareValue +=1;
                };
                //right check
                if (i+1<gridHeight && app.gridData[i+1][j]===10){
                    tempSquareValue +=1;
                };
                //bottom right check
                if (i+1<gridHeight && j+1<gridWidth && app.gridData[i+1][j+1]===10){
                    tempSquareValue +=1;
                };
                //assign the square a value based on the counted bombs
                app.gridData[i][j]=tempSquareValue;
                //reset temp variable for next iteration
                tempSquareValue = 0;
            };
        };
    };
};
    
app.setGUI= () =>{
    //here i transfered the array minefield information to a key-value pair attached to jquery array of 'p's (which are the squares)
    for (i=0;i<$('p').length;i++){
        $('p')[i].gridValue=(app.gridData[$('p')[i].xGrid][$('p')[i].yGrid]);
        $('p')[i].textContent=($('p')[i].gridValue);
    }
}

app.startAlert=()=>{
    //instructions that appear as an alert at initial loadup, but dont appear when restarting
    if (app.startAlertPlayed===false){
    alert('Welcome to MineSweeper! Use left click to reveal squares, and right click to mark squares as mines. Each revealed square contains a number that represents how many mines are surrounding that particular square. To win you must click and reveal all squares that do not contain mines. Goodluck!');
    app.startAlertPlayed=true;
    };
}

//restart button that empties the grid and reinitializes
app.restartButton=()=>{
    $('button').on('click',function (event){
        $('.flexContainer').empty();
        app.init(40,16,16);
    });
};

//app initilization
//some variable reset to default values here because i use app.init to restart the game when the restart button is pressed
app.init = (bombs,width,height) => {
    app.gridData=[];
    app.revealCount= 0;
    app.gameOver= false;
    app.mineCounter= bombs;
    $('.bombCounter').text(app.mineCounter);
    app.mineField (bombs,width,height);
    app.setGUI();
    app.click(width,height);
    app.startAlert();
    app.restartButton();
};


//document ready!
//currently some code is hard coded for a 16x16 grid, but with a few adjustments these dimensions can be changed (work in progress)
$(document).ready(function(){
    app.init(40,16,16);
});



