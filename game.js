// alert("Hello");



var gamePattern=[];

var userClickedPattern=[];

var buttonColors=["red","blue","green","yellow"];

var gameStart=false;
var level=0;

$(document).keypress(function () { 
    
    if(gameStart==false)
    {
        
        nextSequence();
        gameStart=true;
    }
    

});

$(".btn").click(function()
{
    var userChosenColor=this.id;

    animatePress(userChosenColor);

    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

    playSound(userChosenColor);
});



function nextSequence() {

    level++;
    $("h1").text("Level "+level);
   
    var randomNumber=Math.floor(Math.random()*4);
   
    var randomChosenColor=buttonColors[randomNumber];

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);


    playSound(randomChosenColor);
    animatePress(randomChosenColor);

    gamePattern.push(randomChosenColor);
    userClickedPattern=[];
}



function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
       

       if(userClickedPattern.length===gamePattern.length)
       {
            setTimeout(function(){
                nextSequence();
            },1000);
       }
    }
    else{
        var audio =new Audio("sounds/wrong.mp3");
        audio.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[]; 
    gameStart=false;
}




function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");},100);
}
