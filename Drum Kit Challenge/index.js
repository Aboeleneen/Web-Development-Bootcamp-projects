
var buttons = document.querySelectorAll('.drum') ;
var current_song = [] ;


function play_music(key , record){
		if(record) 
			current_song.push(key);

		switch(key){
			case "a" :
					var audio = new Audio('sounds/tom-1.mp3');
					audio.play();
					break;
			case 's' :
					var audio = new Audio('sounds/tom-2.mp3');
					audio.play();
					break;
			case 'd' :
					var audio = new Audio('sounds/tom-3.mp3');
					audio.play();
					break;
			case 'f' :
					var audio = new Audio('sounds/tom-4.mp3');
					audio.play();
					break;
			case 'j' :
					var audio = new Audio('sounds/snare.mp3');
					audio.play();
					break;
			case 'k' :
					var audio = new Audio('sounds/crash.mp3');
					audio.play();
					break;
			case 'l' :
					var audio = new Audio('sounds/kick-bass.mp3');
					audio.play();
					break;
	}
}

// handle button animation 
function button_animation(key , delay){
	var active_button = document.querySelector("." + key);
	active_button.classList.add("pressed");

	setTimeout(function(){
		active_button.classList.remove("pressed");
	}, delay);
}
// add event listener to buttons
for(var i=0;i<buttons.length;i++){
	buttons[i].addEventListener("click" , function(){
		var inner = this.innerHTML ;
		play_music(inner,true);
		button_animation(inner , 100);
})
}

/*
// add keyboard event listener 
document.addEventListener('keydown' , (event)=>{
		var key = event.key ;
		play_music(key);
		button_animation(key , 100);
});


// record a new song 
var record_button = document.querySelector(".btn");
record_button.addEventListener('click' , play_the_song);

function play_the_song(){
	for(var i=0;i<current_song.length;i++){
		play_music(current_song[i] , false);
		button_animation(current_song[i] , 1000);
		
	}
	console.log(current_song.length);
}*/