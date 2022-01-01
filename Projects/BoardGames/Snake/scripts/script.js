
var mainContentVue = new Vue();       // to put data in HTML x
var game = new Game(); 
 
$(document).ready(function()
{
	importNavbar("snake", "Snake");
	$('#gameUnderDev').css("display","");
	
    mainContentVue = new Vue({
        el: '#mainContent',
        data: {
            game : game 
        }
	});  

	$(document).on('keydown' , function(e) 
	{ 
		var key = e.keyCode || e.which;
		switch(key)
		{ 
			case 37: case 65 : // a and left
			{
				game.moveLeft();
				break;
			}
			case 39:  case 68: // d and right
			{
				game.moveRight();
				break;
			}
			case 38: case 87: // w and up
			{
				game.moveUp();
				break;
			}
			case 40: case 83: // s and down
			{
				game.moveDown();
				break;
			}
		}
		
	}); 
	
	$(document.body).on('click',"#start", function()
    {
		game.status = 0;
		game.startGame();
	});
	 
	$(document.body).on('click',"#btnLeft", () => game.moveLeft() );
	$(document.body).on('click',"#btnRight", () => game.moveRight() );
	$(document.body).on('click',"#btnUp", () => game.moveUp() );
	$(document.body).on('click',"#btnDown", () => game.moveDown() );
	
});