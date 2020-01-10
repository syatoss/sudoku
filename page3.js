
//####################################################################################################################################################
// this portion of the code creats the sudoku and its styling

//initializes a matrix of 9x9 with garbage values
let sudokuMatrix = 
[['','','','','','','','',''],// row 0 
['','','','','','','','',''],// row 1
['','','','','','','','',''],// row 2
['','','','','','','','',''],// row 3
['','','','','','','','',''],// row 4
['','','','','','','','',''],// row 5
['','','','','','','','',''],// row 6
['','','','','','','','',''],// row 7
['','','','','','','','','']];// row 8

//------------------------------------------------------------------------------------------------------------------------------------------------------------------



//the relevant inputs are created in the html file each with a link to a function onclick and a special id
//with the indexes of the input in the matrix the represnts the sudoku
let container = document.getElementById('container');
for(let i =0; i<sudokuMatrix.length;i++){
    for(let j=0;j<sudokuMatrix.length;j++){//a function to prevent incurrect input is added onkeyup event
        container.innerHTML +=
        '<input type="text" class="sodokuNum" id="box'+i+'_'+j+
        '" onchange="hybridCheck('+i+','+j+',sudokuMatrix['+i+']['+j+'].value,true)" maxlength="1" ' +
        'onkeyup="validateInput('+i+','+j+')" '+'>';
        
    }//for
    container.innerHTML += '<br>';
}//for

//-------------------------------------------------------------------------------------------------------------------------------------------------------



//each of the inputs in the html file is now set to be a coresponding value in the matrix that represents the sudoku
for(let i =0; i<sudokuMatrix.length;i++){
    for(let j=0;j<sudokuMatrix.length;j++){
        sudokuMatrix[i][j] = document.getElementById(('box' +i+'_'+j));
    }//for
}//for

//------------------------------------------------------------------------------------------------------------------------------------------------------------


//the following code seperates the 3x3 boxes inside the matrix for a more clean visual experiance
//the margins and borders are made with vw value for a widows size responsive result
for(let j =0;j<7;j+=3){
    
    for(let i = 0;i<sudokuMatrix.length;i++){
            sudokuMatrix[0+j][i].style.borderTop = '0.1vw solid #000000';
            sudokuMatrix[0+j][i].style.marginTop = '0.5vw';//used to be 1vw
            sudokuMatrix[i][0+j].style.borderLeft = '0.1vw solid #000000';
            sudokuMatrix[i][0+j].style.marginLeft = '0.5vw';
            sudokuMatrix[2+j][i].style.borderBottom = '0.1vw solid #000000';
            sudokuMatrix[2+j][i].style.marginBottom = '0.5vw';
            sudokuMatrix[i][2+j].style.borderRight = '0.1vw solid #000000';
            sudokuMatrix[i][2+j].style.marginRight = '0.5vw';
            
    }//inner for
    for(let k = 0;k<7;k+=3){
        sudokuMatrix[0+j][0+k].style.borderTopLeftRadius = '10px';
        sudokuMatrix[2+j][0+k].style.borderBottomLeftRadius = '10px';
        sudokuMatrix[2+j][2+k].style.borderBottomRightRadius = '10px';
        sudokuMatrix[0+j][2+k].style.borderTopRightRadius = '10px';

    }
}//for

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//the lvl of difficulty is beeing pooled from storage
let lvl = sessionStorage.getItem('difficulty');



//the name of the player is beeing pooled from storage
let playerName = sessionStorage.getItem('userName');
document.getElementById('headlineUp').innerHTML += playerName;//the player nae is added to the headline


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//the following code deals with the creation of the clock.
let sec = 0;//the total time passed in seconds

/**
 * shows the the current number of minutes/secondes if it is a 2 digit number if not and a '0' beforehand
 * 
 * @param {val} val [the current time in second/minutes] 
 */

    function pad ( val ) { return val > 9 ? val : "0" + val; }


    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60);//show the second that passed
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));//shows the nimutes that passed in decimal
    }, 1000);//the interval is set to 1000 miliseconds


    
    createSudoku(lvl);//the sudoku is created by the wanted difficulty lvl

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


/**
 * the function makes sure that the input is the numbers 1-9 only
 * 
 * @param {number} row [the row index of the input]
 * @param {number} col [the colum index of the input]
 * @returns {void}
 */

function validateInput(row,col) {
    if(sudokuMatrix[row][col].value < '1' || sudokuMatrix[row][col].value > '9'){//if the input is invalid then the
        //input field is emptied
        sudokuMatrix[row][col].value = '';
    }
}//func


/**
*the function gets the row and col location of value 
and the value which is a number and then checks 
if this number is alreay in the 3x3 square 
related to that row col location in the matrix
*@param {number} row [the row index of the value]
*@param {number} col [the cilum index of the value]
*@param {string} value [the value in the box being checked]
*@param {boolean} makeVisualChanges [a flag that indicates rather visual chages are needed or not]
*@returns {boolean} [true if there's no value in the square,if there is - false]
*/
function squareCheck(row,col,value,makeVisualChanges){
    let boxCheck=true;
    let saveRow = row;
    let savecol = col;
    //the following two lines set the values of row and col to point to the top left input field of the 3x3 sub matrix
    //that the value being checked is in
    row = Math.floor(row / 3) * 3;//0 3 or 6
    col = Math.floor(col / 3) * 3;//0 3 or 6
    //goes over the sub 3x3 matrix
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (row + i == saveRow && col + j == savecol){
            } else if ((sudokuMatrix[row + i][col + j].value == value)&& sudokuMatrix[row + i][col + j].value != ''){
                boxCheck = false;
                if(!makeVisualChanges)
                    return boxCheck;//if we dont need visual changes retrun false now else continue searching for reocurances
                sudokuMatrix[row + i][col + j].style.color = 'red';//highlights the existing number
            }else if(sudokuMatrix[row+i][col+j].getAttribute('readonly') != 'readonly'){
                sudokuMatrix[row + i][col + j].style.color = 'black';//returns the input color to black
            }else{
                sudokuMatrix[row+i][col+j].style.color = 'rgb(95,95,95)';//if its the preset numbers their color returned it the innitial 
            }
        }
    }
 
    
    return boxCheck;
}






/**
 * recievs a matrix and a value and indexes the function returns true if there is no other couurance
 * of the value in the colum
 * 
 * @param {string} val [the value to be cheked for reocurances a number between 1 and 9]
 * @param {number} row [the row index of the cheked value in the matrix]
 * @param {number} col [the colum index of the cheked value in the matrix]
 * @param {array} mat [a matrix of 9x9 if singe digits from 1-9 to be checked]
 * @param {boolean} makeVisualChanges [a flag that indicates rather visual chages are needed or not]
 * @returns {boolean} [true if the value occures only once, false if more]
 */

function colVarify(row,col,val,makeVisualChanges){
    let colCheck = true;
    for(let i = 0;i < sudokuMatrix.length; i++){//the loop goes over the colum
        if(i == row){//if its the tab being checked - dont check it
            continue;
        }
        if((sudokuMatrix[i][col].value == val)&&sudokuMatrix[i][col].value !=''){//if the number apears then false
            colCheck = false;
            if(!makeVisualChanges)
                return colCheck;//if no visual changes needed return false now else continue searching for reocurances
            sudokuMatrix[i][col].style.color = 'red';//highlights the reocurance
        }else if(sudokuMatrix[i][col].getAttribute('readonly') != 'readonly'){//the relevant initial text color is reset
            sudokuMatrix[i][col].style.color = 'black';
        }else{
            sudokuMatrix[i][col].style.color = 'rgb(95,95,95)';
        }
    }//for
   
    
    return colCheck;//if we got that far the number doesnt apear
    
}//func

/**
 * an array an an index of a value in it and the value itself are passed as parameters and the value is
 * checked for reocurances in the array, it it aprears more than once false is returned
 * if not returned true 
 * 
 * @param {string} val [the value to check for reocurance] 
 * @param {number} col [the index of the value cheked in the array] 
 * @param {array} arr [the array to check the value in] 
 * @param {boolean} makeVisualChanges [a flag that indicates rather visual chages are needed or not]
 * @returns {boolean} [[true if the value occures only once, false if more]]
 * true or false]
 */

function rowVarify(row,col,val,makeVisualChanges){
    let rowCheck = true;
    for(let i = 0;i < sudokuMatrix.length;i++){//goes over the row
        if(i == col){//cheks if it is the slot of the value being cheked
            continue;
        }//if
        if((sudokuMatrix[row][i].value == val) && sudokuMatrix[row][i].value != ''){//if the value all ready exists false returned
            rowCheck = false;
            if(!makeVisualChanges)
                return rowCheck;//if no visual changes required then return false now else look for more reocurrances
            sudokuMatrix[row][i].style.color = 'red';//the reocurrance is highlighted
        }else if(sudokuMatrix[row][i].getAttribute('readonly') != 'readonly'){//resets the iniitial text colors 
            sudokuMatrix[row][i].style.color = 'black';
        }else{
            sudokuMatrix[row][i].style.color = 'rgb(95,95,95)';
        }
    }//for
    
    return rowCheck;//if it the function wasnt terminated yet the val doesnt exist
}//func

/**
 * 
 * @param {number} row [the row index of the value checked]
 * @param {number} col [the colum index of the value checked]
 * @param {string} val [a string of a number between 1 and 9]
 * @param {boolean} makeVisualChanges [a flag that in dicates rather or not visual changes should be made of if only
 * true or false should be returned]
 * @returns {boolean} [true if the value can be ligally paced in that slot, false - otherwise]
 */

function hybridCheck(row,col,val,makeVisualChanges){
    if(makeVisualChanges){//does visual chages as well a returning a boolean value
        //its important to let this part of the code to run over errors
        let row1 = rowVarify(row,col,val,makeVisualChanges);
        let col1 = colVarify(row,col,val,makeVisualChanges);
        let square = squareCheck(row,col,val,makeVisualChanges);
        return (row1 && col1 && square);
    }else{//if only the boolean value is needed and the first or the second reusult is flase no need to check the rest
        return (rowVarify(row,col,val,makeVisualChanges)&&colVarify(row,col,val,makeVisualChanges)&&squareCheck(row,col,val,makeVisualChanges));
    }
}//function


/**
 * the function recieves the lvl of difficulty wanted and creats a sudoku at that difficulty lvl and presents it to
 * the user in the page, with the pre set numbers fixed and unchangable
 * the difficulty levels are as follows:
 * easly - 25% of the board is missing (20 numbers)
 * medium - 50% of the board is missing (40 numbers)
 * hard - 75% of the board is missing (60 numbers)
 * 
 * @param {string} lvl [a string that describes the lvl of difficulty for the sudoku] 
 * @returns {void}
 */

function createSudoku(lvl){
    setInputTextColor('black');//set the input color
    buildSudoku(); //builds acomplete solved sudoku
    setDifficultyLvl(lvl);//deletes values from the solved sudoku acording the the wanted difficulty lvl

}//func


/**
 * the function detes values from the solved sudoku according the the wanted difficulty lvl by the player
 * the numbers left get a special color and are set to be 'readonly'
 * 
 * @param {string} lvl [the lvl of difficulty the playes chose] 
 */

function setDifficultyLvl(lvl){
    let toTerminate;// the number of
    let treminated = 0;// the number of boxes that were allready deleted
    switch (lvl){//the number of boxes to terminate(leave blank) from the finished sudoku is decided by the lvl of difficulty
        case 'easy':
            toTerminate = 20;
            break;
        case 'medium':
            toTerminate = 40;
            break;
        case 'hard':
            toTerminate = 60;
            break;        
    }//switch
    let minRowTermination = Math.floor(toTerminate/9)-1;//the minimum boxes to leave blank in each row
    let col;
    let row;
    for(row=0;row<sudokuMatrix.length;row++){
        //chooses how many blank to leave in each row 
        let currRowTerm = Math.floor(Math.random()*(3))+minRowTermination;
        while((currRowTerm >0)){
            col = Math.floor(Math.random()*(sudokuMatrix.length));//generates a number between 0 and 8
            if(sudokuMatrix[row][col].value == ''){//if this box allready empty try again
                continue;
            }//if
            sudokuMatrix[row][col].value = '';
            toTerminate--;
            currRowTerm--;
        }//while
    }//for
        while(toTerminate > 0){//if not enough boxex has been cleared the rest is randomly cleared from the matrix
            col = Math.floor(Math.random()*(sudokuMatrix.length));//generates a number between 0 and 8
            row = Math.floor(Math.random()*(sudokuMatrix.length));//generates a number between 0 and 8
            if(sudokuMatrix[row][col].value == ''){//if this box allready empty try again
                continue;
            }//if
            sudokuMatrix[row][col].value = '';
            toTerminate--;
        }//while
        for(row = 0;row<sudokuMatrix.length;row++){//makes the boxes with numbers inside uneditable to the user
            for(col =0;col<sudokuMatrix.length;col++){
                // sudokuMatrix[row][col].style.color = 'black';//the input is now visible to the user
                if(sudokuMatrix[row][col].value != ''){
                    sudokuMatrix[row][col].style.color = 'rgb(95,95,95)';
                    sudokuMatrix[row][col].setAttribute('readonly', 'readonly');//the user can modify the pre set boxes
                }//if
            }//inner for
        }//for


}//func

/**
 * the function goes over an array of inputs in the html file and clears its values up
 * 
 * @param {array} arr [the array of inputs from the html file] 
 * @returns {void}
 */

function clearRow(arr){
    for(let i = 0;i<arr.length;i++){
        arr[i].value = '';
        arr[i].removeAttribute('readonly');//makes sure that there are no 'left over' readonly values
    }//for
}//func

/**
 * the function clears out the entire sudoku
 * 
 * @returns {void} 
 */

function clearSudoku(){
    for(let i = 0;i<sudokuMatrix.length;i++){
        clearRow(sudokuMatrix[i]);
    }
}//func


/**
 * the function goes over the sudoku and sets all of the text colors inside the input fields to the color inputed
 * 
 * @param {string} str [the color that the text should be changed to]
 * @returns {void}
 */

function setInputTextColor(str){
    for(let row=0;row<sudokuMatrix.length;row++){
        for(let col =0;col<sudokuMatrix.length;col++){
            sudokuMatrix[row][col].style.color = str;
        }//inner for
    }//for
}

/**
 * the function recievs an index of a row in the sudoku and generates a random combination of the numbers 1-9 in that row
 *  
 * @param {number} row 
 */

function rowGenerate(row) {
    let limit = 1944;//the limit for trys to construct the row
    let num = 0;
    for (let col = 0; col < sudokuMatrix.length; col++) {
        num = Math.floor(Math.random() * 9) + 1;//value from 1 to 9 that is tested for the current possition
        while (!hybridCheck(row, col, num,false)) {
            num = Math.floor(Math.random() * 9) + 1;//if the number doesnt fit roll a different number
            if (row >= 1) {//if its the first row no need to reduce the number of trys allowed
                limit--;
                if (limit <= 0) {//if wee tried to many times and still faiiling clear the row and return false
                    clearRow(sudokuMatrix[row]);
                    return false;
                }
            }
            }
        sudokuMatrix[row][col].value = num;//if the number fits put it in the (row,col) index
    }
    return true;//reaching here the row was constructed sucssesfuly
  }
  /**
  * the function fills the sudoko rows with random numbers from 1 - 9  
  * if it fails within the number of limits she delets the row before and then try again
  * * @returns {void}
  */


  function fillSoduko(){
    for(let row = 0;row<sudokuMatrix.length;row++){
        while(rowGenerate(row) == false){//if the current row falied to construct empty the previus row and recunstruct it
            //in a diffent order
            row--;
            clearRow(sudokuMatrix[row]); 
            rowGenerate(row);
        }
    }
  }


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//the following piece of code is an alternate way to build the sudoku using recursion, sice this method wasnt tought
//in class this algorithm was disgaurded and not used, but the algorithm itsel works fine, so its construction was kept
//for demonstration purposes only
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


/**
 * this function bouild recursively the sudoku
 * 
 * @returns {void} 
 */

function buildSudoku(){
    let sucssesfulyBuilt = buildSudoku1();//about 6/10 times the constructon reaches a point that no othe value is
    //ac\plicable to the next slot and the cunstructuon failes, if such thing happens the sudoku is deleted and another
    //constuction is atempted
    while(!sucssesfulyBuilt){
        clearSudoku();
        sucssesfulyBuilt = buildSudoku1();
    }
}//func


/**
 * this function bouild recursively the sudoku
 * 
 * @returns {boolean} [true if the suduku is constructed sucssefully false othewise]
 */

 function buildSudoku1(){
     let helpArr = ['1','2','3','4','5','6','7','8','9'];
     let firstNum = Math.floor(Math.random()*9);//a random number between 0-8 is rolled
     firstNum = helpArr.splice(firstNum-1,1);//now the variable holds the value from the array at the place rolled in
     //the previous line and the array is reduced
     return  (recursiveConstruction(0,0,firstNum) || recursiveConstruction(0,0,helpArr[0]) ||
     recursiveConstruction(0,0,helpArr[1]) || recursiveConstruction(0,0,helpArr[2]) ||
     recursiveConstruction(0,0,helpArr[3]) || recursiveConstruction(0,0,helpArr[4]) ||
     recursiveConstruction(0,0,helpArr[5]) || recursiveConstruction(0,0,helpArr[6]) ||
     recursiveConstruction(0,0,helpArr[7]));//attemts to build a sudoku with all the values from 1 through 9
 }


/**
 * the function is the main algorithm that constructs a solved sudoku by backtracking tecnique
 * 
 * @param {number} row [the row index of the number that is tested for input to the matrix]
 * @param {number} col [the col index of the number that is tested for input to the matrix]
 * @param {string} val [the value that is tested for in put in the specific slot in the matrix]
 * @returns {boolean} [true if the sudoku constructed sucssesfully false othewise]
 */

function recursiveConstruction(row,col,val){
    if(row == 9){
        return true;//if we reached the non existing 9th row then the sudoku is constructed
    } 
    if(!hybridCheck(row,col,val,false)){
        return false;//if the number doesnt fit return false
    }
    sudokuMatrix[row][col].value = val;
    let helpArr = ['1','2','3','4','5','6','7','8','9'];
    let firstNum = Math.floor(Math.random()*9);//randomly picking an index in the array
    firstNum = helpArr.splice(firstNum-1,1);//the number picked from the array reduced from it
    
    //attemts to bould a sudoku with all the numbers 1-9 put in the next slot, since putting the numbers in their
    //currect orderr will preduce the same sudoku each time the first numbers tested is chosen randomly
    if(col == 8){//makes sure that at the end of th line the first index of the next line will be checked
        return  (recursiveConstruction(row+1,0,firstNum) || recursiveConstruction(row+1,0,helpArr[0]) ||
     recursiveConstruction(row+1,0,helpArr[1]) || recursiveConstruction(row+1,0,helpArr[2]) ||
     recursiveConstruction(row+1,0,helpArr[3]) || recursiveConstruction(row+1,0,helpArr[4]) ||
     recursiveConstruction(row+1,0,helpArr[5]) || recursiveConstruction(row+1,0,helpArr[6]) ||
     recursiveConstruction(row+1,0,helpArr[7]));
    }else{
        return  (recursiveConstruction(row,col+1,firstNum) || recursiveConstruction(row,col+1,helpArr[0]) ||
     recursiveConstruction(row,col+1,helpArr[1]) || recursiveConstruction(row,col+1,helpArr[2]) ||
     recursiveConstruction(row,col+1,helpArr[3]) || recursiveConstruction(row,col+1,helpArr[4]) ||
     recursiveConstruction(row,col+1,helpArr[5]) || recursiveConstruction(row,col+1,helpArr[6]) ||
     recursiveConstruction(row,col+1,helpArr[7]));
    }

}//func

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//end of the recurssive function
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




  /**
   * the function crates a new sudoku with the previous difficulty level
   * 
   * @returns {void}
   */
  function resetSudoku(){
    clearSudoku();
    createSudoku(lvl);
    sec = 0;//times reset

}


 /**
   * the function show an alert if the playe sucsseded in the game or if he failed
   * 
   * @returns {void}
   */

  function finalCheck(){
    for(let row = 0;row<sudokuMatrix.length;row++){
        for(let col = 0;col<sudokuMatrix.length;col++){
            if(!hybridCheck(row,col,sudokuMatrix[row][col].value,false) || sudokuMatrix[row][col].value == ''){
                alert('Sorry, the solution is incorrect');
                window.location.href = 'page2.html';
                return;//if at least one mistake is fount the sudoku is incorrect and the function terminates
            }
        }
    }
    alert('Your time is '+ document.getElementById("minutes").innerHTML+':'+document.getElementById("seconds").innerHTML+
    '\nCongradulations! you have sucssefully finished the sudoku');//returns message with the time of compeation
    window.location.href = 'page2.html';
    return;
  }

