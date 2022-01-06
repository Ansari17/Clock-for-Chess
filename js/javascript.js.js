function show(idToShow) {
	document.getElementById(idToShow).className = "visable";	
}
		
function hide(idToHide) {
	document.getElementById(idToHide).className = "hidden";
}

var turn = 1;
var time1;
var time2;
var paused = false;

var time1String;
var time2String;

function GoBack(){
    show("mainMenu");
    hide("timer");
    hide("backButton")
    location.reload();
}

function Start10Min(){
    hide("mainMenu");
    show("timer");
    show("backButton")
    time1 = 600;
    time2 = 600;
    document.getElementById("timerTitle").innerHTML = "10 Minute Rounds";
    document.getElementById("gamer1Time").innerHTML = "10:00";
    document.getElementById("gamer2Time").innerHTML = "10:00";
}

function Start30Min(){
    hide("mainMenu");
    show("timer");
    show("backButton")
    time1 = 1800;
    time2 = 1800;
    document.getElementById("timerTitle").innerHTML = "30 Minute Rounds";
    document.getElementById("gamer1Time").innerHTML = "30:00";
    document.getElementById("gamer2Time").innerHTML = "30:00";
}


function StartGame(){
    hide("startButton");
    show("gameButtons");
    StartClock(time1, time2);
}

function Switch(){
    if(!paused){
    if(turn == 1){
        document.getElementById("gamer2Time").className="currentTurn";
        document.getElementById("gamer1Time").className="notcurrentTurn";
        turn =2;
        clearInterval(gamer1timer);
        gamer2timer = setInterval(function(){ 
            time2 -=1;
            document.getElementById("gamer2Time").innerHTML = convertToTime(time2);
        }, 1000);

    }else{
        turn =1;
        document.getElementById("gamer1Time").className="currentTurn";
        document.getElementById("gamer2Time").className="notcurrentTurn";

        clearInterval(gamer2timer);
        gamer1timer = setInterval(function(){ 
            time1 -=1;
            document.getElementById("gamer1Time").innerHTML = convertToTime(time1);
        }, 1000);

    }
    }
}


function StartClock(time1, time2){
        if(turn == 1){
            gamer1timer = setInterval(function(){ 
                document.getElementById("gamer1Time").className="currentTurn";
                document.getElementById("gamer2Time").className="notcurrentTurn";
                time1 -=1;
                document.getElementById("gamer1Time").innerHTML = convertToGame(time1);
            }, 1000);
        }
}


function Pause(){
    if(paused){
        paused=false;
        document.getElementById("pauseButton").innerHTML = "Pause";
        if(turn == 1){
            gamer1timer = setInterval(function(){ 
                time1 -=1;
                document.getElementById("gamer1Time").className="currentTurn";
                document.getElementById("gamer2Time").className="notcurrentTurn";
                document.getElementById("gamer1Time").innerHTML = convertToTime(time1);
            }, 1000);
        }else{
            gamer2timer = setInterval(function(){
                document.getElementById("gamer2Time").className="currentTurn"; 
                document.getElementById("gamer1Time").className="notcurrentTurn";
                time2 -=1;
                document.getElementById("gamer2Time").innerHTML = convertToTime(time2);
            }, 1000);
        }

    }else{
        paused=true;
        document.getElementById("pauseButton").innerHTML = "Resume";
        clearInterval(gamer1timer);
        clearInterval(gamer2timer);
    }
    


}


function convertToTime(number){
        var minutes = Math.floor(number / 60);
        var seconds = number - minutes * 60;
        var Stringseconds = seconds.toString();
        if(seconds < 10){
            Stringseconds = "0"+seconds.toString();
        }

 		var time = minutes.toString() + ":" + Stringseconds;
 		if(time == "0:00" && turn == 1){
 			document.getElementById("gamer1Time").innerHTML = "0:00";
 			alert("Time is up. Black wins!");
 			clearInterval(gamer1timer);
        	clearInterval(gamer2timer);
 		}
 		if(time == "0:00" && turn == 2){
 			document.getElementById("gamer2Time").innerHTML = "0:00";
 			alert("Time is up. White wins!");
 			clearInterval(gamer1timer);
        	clearInterval(gamer2timer);
 		}

        return minutes.toString() + ":" + Stringseconds;
}

