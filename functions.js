//calling the function in window.onload to make sure the HTML is loaded

var boxes, position;
var con, points, gameArea, resetBtn, stopBtn;
var t, oldPos, oldPosR, totalPoints;
var pos, n, speed, overlap, points, total;
var rightDir, win, scoreWord;
var score = ['Ouch!','Good!','Great!','Awesome!','Fantastic!'];

alert ("Just pile the boxes!");

function init() {
    boxes = [];
    position = [];
    pos = 0;
    n = 0;
    speed = 2;
    overlap = 0;
    totalPoints = 0;
    rightDir = false;
    win = true;
    scoreWord = "Score";
    progress = document.getElementById("progress");
    gameArea = document.getElementById("gameArea");
    resetBtn = document.getElementById("reset");
    stopBtn = document.getElementById("btn");
    points = document.getElementById("points");
    total = document.getElementById("total");
    con = document.createElement("div");
    boxes[n] = document.createElement("div");
    con.id = 'container';
    boxes[n].id = 'box';
    gameArea.insertBefore(con,stopBtn);
    con.appendChild(boxes[n]);
    
    t = setInterval(move, 10);
}

function move() {
    if (pos <= 0) { rightDir = true; }
    if (pos >= 155) { rightDir = false; }

    pos = rightDir? pos+speed : pos-speed;
    boxes[n].style.left = pos+'px';
}

function stop(){
     clearInterval(t);
     navigator.vibrate(50);
     stopBtn.disabled = true;

     position[n] = pos;
     check();
     
     if (n < 4 && win){
        n++;
        boxes[n] = boxes [n-1].cloneNode();
        boxes[n].style.bottom = n*51 + "px";
        con.insertBefore(boxes[n], boxes[n-1]);
        speed += 1;
        stopBtn.disabled = false;
        t = setInterval(move, 10);
    } else {
        setTimeout(endGame, 1000);
    }
}

function check() {
    oldPos = position[n-1];
    oldPosR = oldPos + 50;
    if (pos > oldPos && pos < oldPosR) {
        overlap = oldPosR - pos;
        scoreWord = score[n];
    } else if (pos+50 > oldPos && pos+50 < oldPosR) {
        overlap = pos+50 - oldPos;
        scoreWord = score[n];
    } else if (pos == oldPos && pos+50 == oldPosR) {
        overlap = 50;
    } else {
        if (n != 0){
            overlap = 0;
            scoreWord = score[0];
            win = false;
        }
    }
    
    if(overlap != 0) {
        progress.innerHTML = scoreWord;
        points.innerHTML = "+"+overlap;
        totalPoints += overlap;
        total.innerHTML = totalPoints;
    }
}

function endGame(){
    var result = "Score";
    
    if (win) {
        if (totalPoints == 200) {
            result = "Perfection!";
        }
    } else {
        result = "Try Again!";
    }
    
    finalScore.style.display = "block";
    finalScore.innerHTML = totalPoints;
    progress.innerHTML = result;
    scoreBoard.style.display = "none";
    gameArea.style.display = "none";
    resetBtn.style.display = "inline";
}

function reset(){
    resetBtn.style.display = "none";
    progress.innerHTML = "Score";
    gameArea.removeChild(con);
    gameArea.style.display = "block";
    scoreBoard.style.display = "block";
    finalScore.style.display = "none";
    total.innerHTML = 0;
    points.innerHTML = 0;
    stopBtn.disabled = false;
    init();
}

window.onload = init;