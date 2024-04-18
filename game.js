
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var start=false;
var level=0;
var userctr=0;
$("body").click(function(){
    if(start==false){
        alert("press a button to start");
        window.location.reload();
    }
})
$("body").keypress(function(){
if(!start){
 nextSequence();
 start=true;
}
})
function nextSequence(){
level++;
$("h1").text("Level "+level);
 var random=Math.floor(Math.random()*4);
buttonColour=buttonColours[random];

var clr='#'+buttonColour;

    animatePress(clr);
    playSound(buttonColour);
    
    //alert(buttonColour);

gamePattern.push(buttonColour);
}



$(".btn").on("click",function(){
   
    var userChosenColour=$(this).attr("id");
    
    animatePress('#'+userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    console.log(gamePattern);
    
    if(!gamechk(userClickedPattern,userctr)){
        //alert("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setInterval(()=>{
             $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart" )
        $("body").on("keypress",startover);
    }


    userctr++;
    if(userctr==level){
        userClickedPattern=[];
        userctr=0;
        console.log("completed"+level);
        setTimeout(()=>nextSequence(),2000);
    }
})


function startover(){
    if(start){
        window.location.reload();
    }
}

function playSound(ch){
    var aud=new Audio("./sounds/"+ch+".mp3");
    aud.play();
}

function animatePress(currentColour){
    $(currentColour).addClass("pressed");
    setTimeout(()=>{
        $(currentColour).removeClass("pressed"); 
    },100);
}

function gamechk(userClickedPattern, ind){
   if(userClickedPattern[ind]==gamePattern[ind]){
      return true;
   }
   else return false;
}