const answer = { text: '', correct: false };
var questiontext = [
    "Which of these classic rock bands was famously responsible for the naming of 'led zeppelin'?",
    "Frontman Geddy Lee was a part of which band?",
    "Dave Mustaine was fired from which heavy metal band before starting megadeth?",
    "Which of these singers had a famous superbowl wardrobe malfunction?",
    "Which of these bands' fans are colloquially known as 'dead heads'?"]

class question{
    constructor(txt){
        this.txt = txt;
        this.choices = [];
    }
    setChoice(thenum, newchoice){
        this.choices[i] = newchoice;
    }

}
var questionCount = 0; 
var questions = [];
var a1 = [];
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
for(var j=0; j<questiontext.length; j++){
    questions[j] = new question(questiontext[j]);
    var choices = [];
    for(var i = 0; i<4; i++){
        choices[i]= answer;
        choices[i].text = anstextarr[j][i];
        if(i===1){
           choices[i].correct = true;
        }
        else{
            choices[i].correct = false;
        }
        questions[j].setChoice(i, choices[i]);
        console.log(questions[j].choices[i].text);
        console.log(questions[j].choices[i].correct);
        
    }
}

