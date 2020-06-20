// get random values for two players
var player_one = Math.floor(Math.random()*6)+1;
var player_two = Math.floor(Math.random()*6)+1;

// get the path for images
var path_one = "images/dice" + player_one + ".png" ;
var path_two = "images/dice" + player_two + ".png" ;

// add the paths to the elements
document.querySelector('.img1').setAttribute("src" , path_one);
document.querySelector(".img2").setAttribute("src" , path_two);

// change the header 
var result = " " ;
if(player_one == player_two){
	result = "Draw" ;
}else if(player_one > player_two){
	result = "Player one win";
}else{
	result = "Player two win";
}

document.querySelector("h1").textContent = result ;
