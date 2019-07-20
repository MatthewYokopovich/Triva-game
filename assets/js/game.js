var questiontext = [
    "Which of these classic rock bands was famously responsible for the naming of 'led zeppelin'?",
    "Frontman Geddy Lee was a part of which band?",
    "Dave Mustaine was fired from which heavy metal band before starting megadeth?",
    "Which of these singers had a famous superbowl wardrobe malfunction?",
    "Which of these bands' fans are colloquially known as 'dead heads'?"]
    var a1text = [
        "The Rolling Stones",
       "The Who",
        "Journey",
        "Styx"];
       
       var a2text = [
       "Megadeth",
       "Rush",
       "Pearl Jam",
       "Imagine Dragons"
       ];
       var a3text = [
       "Iron Maiden",
       "Metallica",
       "Black Sabbath",
       "Judas Priest"
       ];
       var a4text = [
       "Nora Jones",
       "Janet Jackson",
       "Britney Spears",
       "Christina Aguilera"
       ];
       var a5text = [
       "Dead or Alive",
       "The Grateful Dead",
       "The Dead Kennedy's",
       "Theory of a deadman"
       ];
var question = {
    text: '',
    answer: [{
        text: '', correct: false 
    },
    {
        text: '', correct: false 
    },
    {
        text: '', correct: false 
    },
    {
        text: '', correct: false 
    }]
};
var timerrunning = false;
var questionCount = 0; 
var numCorrect = 0;
var intervalID;
var time;
var questions = [];
var isgameover = false;

var anstextarr = [];
for(var i = 0;i<questiontext.length; i++){
    if(i===0){
        anstextarr[i] = a1text;
    }
    else if(i===1){
        anstextarr[i] = a2text;
    }
    else if(i===2){
        anstextarr[i] = a3text;
    }
    else if(i===3){
        anstextarr[i] = a4text;
    }
    else if(i===4){
        anstextarr[i] = a5text;
    }
}

function init(){
    var currentQ = question;
    currentQ.html = questiontext[questionCount];
    for(var j =0; j<4; j++){
        currentQ.answer[j].html = anstextarr[questionCount][j];
        switch(j){
            case 1:
                currentQ.answer[j].correct = true;
                break;
            default:
                currentQ.answer[j].correct = false;
        }
    }
        $("#time-remaining").html("30");
        $("#question").html(currentQ.html);
        var temparr = [];
        temparr = JSON.parse(JSON.stringify(currentQ.answer));
        for(var i =3; i>=0; i--){
            var tempind = Math.floor(Math.random()*temparr.length);
            $("#answer"+i).html(temparr[tempind].html);
            $("#answer"+i).val(temparr[tempind].correct);
            var tempobj = temparr.splice(tempind, 1);
        }
        timer();
}

function nextQuestion(isCorrect){
    if(isCorrect){numCorrect++;}
    if(isCorrect && numCorrect===5){
        youWin();
    }
    else if(isCorrect && questionCount<4){
        splashScreen();
    }
    else{
        timeOut();
    }
}
function timer(){
    time = 30;
    timerrunning = true;
    clearInterval(intervalID);
    intervalID = setInterval(decrement, 1000);
}
function decrement(){
    time--;
    $("#time-remaining").html(time);
    if(time===0){
        stop();
        timeOut();
    }
}
function splashScreen(){
    timerunning = false;
    console.log("splash");
    $("#time-remaining").html("00");
    $("#question").html("You got it!");
    for(var i=0; i<4; i++){
        if(!$("#answer"+i).val()){
            $("#answer"+i).html("");
        }
    }
    setTimeout(function(){
        questionCount++;
        init();
    }, 5000);
}
function timeOut(){
    if(questionCount<5){
        console.log("timeout");
        $("#time-remaining").html("00");
        $("#question").html("Oops, looks like the correct answer was:");
        for(var i=0; i<4; i++){
            if(!$("#answer"+i).val()){
                $("#answer"+i).html("");
            }
        }
        setTimeout(function(){
            questionCount++;
            if(questionCount<5){
                init();}
            else{gameOver();}
        }, 5000);
    }
}
function stop(){
    clearInterval(intervalID);
    timerrunning = false;
}
function gameOver(){
        console.log("Game Over");
        isgameover = true;
        stop();
        $("#time-remaining").html("00");
        $("#question").html("You Lost!<br>Better Luck next time.<br>You got "+numCorrect+" question(s) correct and "+(questionCount-numCorrect) + " wrong.");
        $("#answer0").html("Click here to try again");
        $("#answer0").addClass("gameover");
        for(var i=1; i<4; i++){
            $("#answer"+i).html('');
        }
}
function youWin(){
    console.log("You Win!");
    isgameover = true;
    $("#time-remaining").html("00");
        $("#question").html("You Win!<br>Good Job<br>You got "+numCorrect+" question(s) correct and "+(questionCount-numCorrect+1) + " wrong.");
        $("#answer0").html("Click here to try again");
        $("#answer0").addClass("gameover");
        for(var i=1; i<4; i++){
            $("#answer"+i).html('');
        }
}
function reset(){
    timerrunning = false;
    questionCount = 0;
    numCorrect = 0;
    init();
}

$(document).ready(function(){
    init();
    $(".answer").click(function(){
        if(timerrunning){
            stop();
            nextQuestion($(this).val());
        }
    });
    $("#answer0").click(function(){
        if(isgameover)
            reset();
            console.log("called reset");
            isgameover = false;
    });
});