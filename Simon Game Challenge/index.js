
var buttons = ["yellow" , "red" , "blue" , "green"];
var audio_yellow = new Audio("sounds/yellow.mp3");
var audio_red = new Audio("sounds/red.mp3");
var audio_blue = new Audio("sounds/blue.mp3");
var audio_green = new Audio("sounds/green.mp3");
var audios = [audio_yellow , audio_red , audio_blue ,audio_green];

// add  sounds to buttons 
function play_sound(index , player){
	audios[index].play();
	if(player){
		player_games.push(index);
	}else{
		computer_games.push(index);
	}
}

// add animations to buttons
function play_animation(color){
	$("#" + color).addClass("pressed");

	setTimeout(function(){
		$("#" + color).removeClass("pressed");
	}, 100);
}

// add event listener 
$("#yellow").click(function(){
	play_sound(0 , true);
	play_animation(buttons[0]);
	check();
})

$("#red").click(function(){
	play_sound(1, true);
	play_animation(buttons[1]);
	check();
})

$("#blue").click(function(){
	play_sound(2 , true);
	play_animation(buttons[2]);
	check();
})

$("#green").click(function(){
	play_sound(3 , true);
	play_animation(buttons[3]);
	check();
})

// game play // 
var current_level = 0 ;
var computer_games = [] ;
var player_games = [];
var current_check = 0 ;

function next_level(){
	current_check = 0 ;
	player_games = [];
	current_level++;
	$("#level-title").text("Level " + current_level);
	var random_index  = Math.floor(Math.random()*4);
	play_sound(random_index , false);
	play_animation(buttons[random_index]);
}

// begin the game 
$(document).keypress(function(){
	if(current_level == 0) next_level();
})

// compare player and computer games
function check(){
	if(computer_games[current_check] != player_games[current_check]){
		game_over();
	}
	current_check++;
	if(current_check == current_level){
		player_game = [];
		setTimeout(next_level , 500);
	}
}

function game_over(){
	current_level = 0 ;
	computer_games =[];
	player_games = []; 
	var wrong_audio = new Audio("sounds/wrong.mp3");
	wrong_audio.play();
	$("body").addClass("game-over");
	setTimeout(function(){
		$("body").removeClass("game-over");
	} , 100);
	$("#level-title").text("Game Over Press A Key to Start");
}

