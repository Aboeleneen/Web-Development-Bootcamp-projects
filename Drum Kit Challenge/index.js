
var buttons = document.querySelectorAll('button') ;



function play_music(key){
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
function button_animation(key){
	var active_button = document.querySelector("." + key);
	active_button.classList.add("pressed");

	setTimeout(function(){
		active_button.classList.remove("pressed");
	}, 100);
}
// add event listener to buttons
for(var i=0;i<buttons.length;i++){
	console.log(i);
	buttons[i].addEventListener("click" , function(){
		var inner = this.innerHTML ;
		play_music(inner);
		button_animation(inner);
})
}


// add keyboard event listener 
document.addEventListener('keydown' , (event)=>{
		var key = event.key ;
		play_music(key);
		button_animation(key);
});
