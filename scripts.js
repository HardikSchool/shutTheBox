//objects
const dice1 = document.getElementById('d1');
const dice2 = document.getElementById('d2');
const startBtn = document.getElementById('startBtn');
const p1Input = document.getElementById('p1NameIn');
const p2Input = document.getElementById('p2NameIn');
const rollBtn = document.getElementById('roll');
const sumBtn = document.getElementById('sum');
const bothBtn = document.getElementById('both');
const endBtn = document.getElementById('end');
const resetBtn = document.getElementById('reset');
const playerName = document.getElementById('playerCurrent');
const scoreTable = document.getElementById('scoreTable');
const numbers = document.getElementById('numbersKnocked');
const display = document.getElementById('winner');
//variables
const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let round = 0;
let p1N = "";
let p2N = "";
let p1Points = 0;
let p2Points = 0;
let p1TotalPoints = 0;
let p2TotalPoints = 0;
let d1Num  = 6;
let d2Num = 6;
//functions

function addTableRow(){
    scoreTable.innerHTML+=('<tr><td>round '+((round+1)/2)+'</td><td>'+p1Points+'</td><td>'+p2Points+'</td></tr>');
    p1Points=0;
    p2Points=0;
}

function resetBoxes(){
    for(i=0; i<9; i++){
        boxes[i]=0;
        numbers.children[i].setAttribute('class', 'box');
        numbers.children[i].textContent=i+1;
    }
}

function shut(boxNum){
    document.getElementById(boxNum).setAttribute('class', 'shutBox');
    document.getElementById(boxNum).setAttribute('class', 'shutBox');
    document.getElementById(boxNum).textContent ='X';
}

function getRandomNum(){
    return Math.floor(Math.random()*6)+1;
}

function buttonLogic(){
    if(d1Num===d2Num||boxes[d1Num]==="X"||boxes[d2Num]==="X"){
        bothBtn.setAttribute("disabled","disabled");
    }
    if(d1Num+d2Num>9||boxes[d1Num+d2Num]==="X"){
        sumBtn.setAttribute("disabled","disabled");
    }
    if(sumBtn.getAttribute("disabled")==='disabled' && bothBtn.getAttribute("disabled")==='disabled'){
        endBtn.removeAttribute('disabled');
        console.log("working");
    }
}

function findImage(number){
    if(number===1){
        return '/images/one.png';
    }
    if(number===2){
        return '/images/two.png';
    }
    if(number===3){
        return '/images/three.png';
    }
    if(number===4){
        return '/images/four.png';
    }
    if(number===5){
        return '/images/five.png';
    }
    if(number===6){
        return '/images/six.png';
    }
}

function setDice(){
    d1Num = getRandomNum();
    console.log(d1Num);
    dice1.setAttribute('src', findImage(d1Num));
    d2Num = getRandomNum();
    console.log(d2Num);
    dice2.setAttribute('src', findImage(d2Num));
}

function rolled(){
    setDice();
    bothBtn.removeAttribute("disabled");
    sumBtn.removeAttribute("disabled");
    rollBtn.setAttribute("disabled","disabled");
    buttonLogic();
}

function sumBtnPress(){
    boxes[0]+=d1Num+d2Num;
    boxes[d1Num+d2Num]='X';
    shut(d1Num+d2Num);
    sumBtn.setAttribute("disabled","disabled");
    bothBtn.setAttribute("disabled","disabled");
    rollBtn.removeAttribute("disabled");
}

function bothBtnPress(){
    boxes[0]+=d1Num+d2Num;
    boxes[d1Num]='X';
    boxes[d2Num]='X';
    shut(d1Num);
    shut(d2Num);
    sumBtn.setAttribute("disabled","disabled");
    bothBtn.setAttribute("disabled","disabled");
    rollBtn.removeAttribute("disabled");
}

function startGame(){
    p1N = p1Input.value.trim();
    p2N = p2Input.value.trim();
    if(p1N && p2N){
        rollBtn.removeAttribute('disabled');
        document.getElementById('gameArea').removeAttribute('style');
        document.getElementById('upper').setAttribute('style', 'visibility: hidden;');
        playerName.textContent=p1N + "\'s turn";
        console.log('started game');
    }
    else{
        alert('fill in all boxes!!!');
    }
}

function endTurn(){
    endBtn.setAttribute('disabled', 'disabled');
    rollBtn.removeAttribute('disabled');
    if(round%2===0){
        //do p1 stuff
        playerName.textContent=p2N + "\'s turn";
        p1Points+=45-boxes[0];
        p1TotalPoints+=45-boxes[0];
    }
    else{
        //do p2 stuff
        playerName.textContent=p1N + "\'s turn";
        p2Points+=45-boxes[0];
        p2TotalPoints+=45-boxes[0];
        addTableRow();
    }
    resetBoxes();
    round++;
    if(round===10){
        gameEnds();
    }
}

function gameEnds(){
    console.log('game ends');
    dice1.setAttribute('style', 'visibility: hidden;');
    dice2.setAttribute('style', 'visibility: hidden;');
    rollBtn.setAttribute('style', 'visibility: hidden;');
    sumBtn.setAttribute('style', 'visibility: hidden;');
    bothBtn.setAttribute('style', 'visibility: hidden;');
    endBtn.setAttribute('style', 'visibility: hidden;');
    playerName.setAttribute('style', 'visibility: hidden;');
    numbers.setAttribute('style', 'visibility: hidden;');
    resetBtn.removeAttribute('disabled');
    if(p1TotalPoints<p2TotalPoints){
        display.textContent='p1 won!';
    }
    else if(p1TotalPoints>p2TotalPoints){
        display.textContent='p2 won!';
    }
    else{
        //say it's a tie
        display.textContent='Tie!';
    }
}

function resetClick(){
    dice1.removeAttribute('style');
    dice2.removeAttribute('style');
    rollBtn.removeAttribute('style');
    sumBtn.removeAttribute('style');
    bothBtn.removeAttribute('style');
    endBtn.removeAttribute('style');
    playerName.removeAttribute('style');
    numbers.removeAttribute('style');
    resetBtn.setAttribute('disabled', 'disabled');
    display.textContent='Shut the Box!';
    document.getElementById('upper').removeAttribute('style');
    document.getElementById('gameArea').setAttribute('style', 'visibility:hidden');
    scoreTable.innerHTML='<tr><td>.</td><td>Player 1</td><td>Player 2</td></tr>';
    resetBoxes();
    p1TotalPoints=0;
    p2TotalPoints=0;
    round=1;
}

//event listeners
rollBtn.addEventListener('click', rolled);
startBtn.addEventListener('click', startGame);
sumBtn.addEventListener('click', sumBtnPress);
bothBtn.addEventListener('click', bothBtnPress);
endBtn.addEventListener('click', endTurn);
resetBtn.addEventListener('click', resetClick);
