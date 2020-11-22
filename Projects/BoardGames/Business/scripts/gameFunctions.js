

function startGame()
{
	
	$("#startcontrols").css("display","none");
	$("#gameControls").css("display","");
	$("#btnTrade").css("display","");
	$("#btnLogs").css("display","");
	$("#saveGame").prop('disabled', false); 

	setupTrade();
	setupChanceChest();
	gameStarted = true;
}


function rollDice()
{
	isChanceOn = true;
	var cnt=0;	
	var diceRollAnim = setInterval(function()
	{
		if(cnt==5)
		{
			clearInterval(diceRollAnim);
			play();
			return;
		}
		cnt+=1;
		i = cnt%3;
		diceVal1 = Math.floor(Math.random() * 6) + 1;
		diceVal2 = Math.floor(Math.random() * 6) + 1;
		diceValTotal = diceVal1 + diceVal2;
		$('#dice1').attr("src","images/dice/diceRoll"+i.toString()+".PNG");
		$('#dice2').attr("src","images/dice/diceRoll"+(2-i).toString()+".PNG");

	},200);
}



function play()
{
	$('#dice1').attr("src","images/dice/dice"+diceVal1.toString()+".PNG");
	$('#dice2').attr("src","images/dice/dice"+diceVal2.toString()+".PNG");
	
	
	var currCoin = $("#"+players[currPlayer].color+"Coin");
	if(players[currPlayer].inJail && (diceVal1 != diceVal2) ) // show jail popup
	{
		var jailQstn = document.createElement('div');
		$(jailQstn).addClass("logItem").html("Pay "+rupeeSym+"100 OR wait till you roll a double?");
	
		Swal.fire({
			title: "You are in Jail!",
			text: jailQstn.innerHTML,
			imageUrl: "images/"+players[currPlayer].color+"Jail.PNG",
			imageWidth: 200,
			imageHeight: 200,
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: "Pay "+rupeeSym+"100",
			cancelButtonText: "Wait",
			allowOutsideClick: false
		}).then((result) => 
		{
			if (result.isConfirmed) 
			{
				var log = new Log(currPlayer,-1,100,"jail");
				log.prependLogDiv();
				log.performTransaction();
				refreshGameUI();
				
				Swal.fire(
				'',"Paid "+rupeeSym+"100 to get out of Jail",
				'success'
				)

				players[currPlayer].inJail = false;
				moveCoin(currCoin);
			}
			else
				isChanceOn = false;
		});

	} 
	else
	{	
		players[currPlayer].inJail = false;
		moveCoin(currCoin);
	}

	if(diceVal1 == diceVal2 && !players[currPlayer].inJail)
	{
		consecutiveDoubles += 1;
		if(consecutiveDoubles < 3)
			diceRolled = false;
		else
		{
			moveBackWithoutGO(10);
					
			Swal.fire({
				title: "Going to Jail for OverSpeeding!",
				imageUrl: "images/"+players[currPlayer].color+"Jail.PNG",
				imageWidth: 200,
				imageHeight: 200,
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'OK',
				allowOutsideClick: false
			});
			consecutiveDoubles = 0;
		}
	}
	return;
}

function moveCoin()
{ 
	var currCoin = $("#"+players[currPlayer].color+"Coin");
	isChanceOn = true;
	cnt = 0;
	var coinMoveAnim = setInterval(function()
	{
		if(cnt == diceValTotal)
		{
			clearInterval(coinMoveAnim);
			checkCell();
			isChanceOn = false;
			return;
		}
		cnt+=1;
		players[currPlayer].position = players[currPlayer].position + 1;
		
		if(players[currPlayer].position == 40)
		{
			players[currPlayer].position = 0;
			var log = new Log(-1,currPlayer,200,"as salary");
			log.prependLogDiv();
			log.performTransaction();
		}

		players[currPlayer].topVal = board[players[currPlayer].position].topVal;
		players[currPlayer].leftVal = board[players[currPlayer].position].leftVal;
		currCoin.animate(
		{
			"top":(players[currPlayer].topVal).toString()+"px",
			"left":(players[currPlayer].leftVal).toString()+"px"
		},300);

	},300);
	
}

function moveBackWithoutGO(endPos)
{
	var currCoin = $("#"+players[currPlayer].color+"Coin");

	var coinMoveAnim = setInterval(function()
	{
		if(players[currPlayer].position == endPos)
		{
			clearInterval(coinMoveAnim);
			checkCell()
			return;
		}
		
		if(players[currPlayer].position > 30 && endPos < 30)
			players[currPlayer].position = 30;
		else if(players[currPlayer].position > 20 && endPos < 20)
			players[currPlayer].position = 20;
		else if(players[currPlayer].position > 10 && endPos < 10)
			players[currPlayer].position = 10;
		else
			players[currPlayer].position = endPos;

		players[currPlayer].topVal = board[players[currPlayer].position].topVal;
		players[currPlayer].leftVal = board[players[currPlayer].position].leftVal;
		currCoin.animate(
		{
			"top":(players[currPlayer].topVal).toString()+"px",
			"left":(players[currPlayer].leftVal).toString()+"px"
		},500);

	},500);

}

function moveAheadWithGO(endPos)
{
	var currCoin = $("#"+players[currPlayer].color+"Coin");

	var coinMoveAnim = setInterval(function()
	{
		if(players[currPlayer].position == endPos)
		{
			clearInterval(coinMoveAnim);
			checkCell()
			return;
		}
		
		if(endPos > players[currPlayer].position)
		{
			if(players[currPlayer].position < 30 && endPos > 30)
				players[currPlayer].position = 30;
			else if(players[currPlayer].position < 20 && endPos > 20)
				players[currPlayer].position = 20;
			else if(players[currPlayer].position < 10 && endPos > 10)
				players[currPlayer].position = 10;
			else
				players[currPlayer].position = endPos;
		}
		else if(endPos < players[currPlayer].position)
		{
			if(players[currPlayer].position < 10)
				players[currPlayer].position = 10;
			else if(players[currPlayer].position < 20)
				players[currPlayer].position = 20;
			else if(players[currPlayer].position < 30)
				players[currPlayer].position = 30;
			else if(players[currPlayer].position < 40)
				players[currPlayer].position = 0;
		}

		if(players[currPlayer].position == 40 || players[currPlayer].position == 0)
		{
			players[currPlayer].position = 0;
			var log = new Log(-1,currPlayer,200,"as salary");
			log.prependLogDiv();
			log.performTransaction();
		}
		
		players[currPlayer].topVal = board[players[currPlayer].position].topVal;
		players[currPlayer].leftVal = board[players[currPlayer].position].leftVal;
		currCoin.animate(
		{
			"top":(players[currPlayer].topVal).toString()+"px",
			"left":(players[currPlayer].leftVal).toString()+"px"
		},500);

	},500);

}


function checkCell()
{
	
	var currCoin = $("#"+players[currPlayer].color+"Coin");
	var cell = board[players[currPlayer].position];
	var cellRent = cell.getCurrentRent(); 

	if(cellRent != undefined)
	{		
		if(cellRent > 0)
		{
			if(cell.owner != currPlayer)
			{
				var log = new Log(currPlayer,cell.owner,cellRent,"rent",cell.cellName);
				log.prependLogDiv();
				log.performTransaction();
				log.displayLog();
			}
		}
		else
		{
			// Show Sale Modal
			$("#imagePropertySale").attr("src",cell.cardImage);

			if(players[currPlayer].money < cell.price)
				$("#btnBuyProperty").prop('disabled', true); 
			else	
				$("#btnBuyProperty").prop('disabled', false); 
			
			$("#pursePropertySale")[0].innerHTML = " " + rupeeSym + " " + players[currPlayer].money;
			$('#PropertySaleModal').modal({
				backdrop: 'static',
				keyboard: false
			});

		}

	}
	else
	{
		if(cell.cellName == "Chance")
		{
			var chance = chances[diceValTotal];
			chance.process();
		}
		if(cell.cellName == "Chest")
		{
			var chest = chests[diceValTotal];
			chest.process();
		}
		else
		{
			if(cell.position == 10)
			{
				players[currPlayer].inJail = true;
				Swal.fire({
					title: "In Jail!",
					imageUrl: "images/"+players[currPlayer].color+"Jail.PNG",
					imageWidth: 200,
					imageHeight: 200,
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'OK',
					allowOutsideClick: false
				});
			}
			if(cell.position == 4 || cell.position == 38)
			{
				var taxAmt = cell.position == 4 ? 200 : 100;
				var log = new Log(currPlayer,-1,taxAmt,cell.cellName);
				log.prependLogDiv();
				log.performTransaction();
				log.displayLog();
			}
			if(cell.position == 30)
				moveBackWithoutGO(10);
		}
	}
	refreshGameUI();
	return;
}



function changePlayer()
{
	$("#"+players[currPlayer].color+"Data").removeClass("currChanceData");

	currPlayer+=1;
	if(currPlayer == nmbrOfPlayers)
		currPlayer=0;
	
	$("#"+players[currPlayer].color+"Data").addClass("currChanceData");
	
	$(".currentChanceBtns").appendTo("#"+players[currPlayer].color+"Data");
	consecutiveDoubles = 0;

	if(players[currPlayer].bankrupt)
		changePlayer();
}


function refreshGameUI()
{

	var i = 0;
	while(i<nmbrOfPlayers)
	{
		$("#"+players[i].color+"Coin").css("top",(players[i].topVal).toString()+"px");
		$("#"+players[i].color+"Coin").css("left",(players[i].leftVal).toString()+"px");

		$("#"+players[i].color+"CityValue")[0].innerHTML = players[i].properties.length;
		$("#"+players[i].color+"HouseValue")[0].innerHTML = players[i].houseCount;
		$("#"+players[i].color+"HotelValue")[0].innerHTML = players[i].hotelCount;
		$("#"+players[i].color+"MoneyValue")[0].innerHTML = rupeeSym + " " + players[i].money;
		
		if(players[i].money < 1)
			$("#"+players[i].color+"MoneyValue").css("color","red");
		else
			$("#"+players[i].color+"MoneyValue").css("color","black");

		i += 1;
	}
	
	document.querySelectorAll('.bldgCoin').forEach(e => e.remove());

	i = 0;
	while(i<40)
	{
		board[i].showBldg();
		i += 1;
	}
	
	var prevPlayer = currPlayer - 1;
	if(prevPlayer == -1) prevPlayer = nmbrOfPlayers-1;
	$("#"+players[prevPlayer].color+"Data").removeClass("currChanceData");
	$("#"+players[currPlayer].color+"Data").addClass("currChanceData");
	
	$(".currentChanceBtns").appendTo("#"+players[currPlayer].color+"Data");
	consecutiveDoubles = 0;
}

function getRank()
{
	var rank = nmbrOfPlayers;
	var i = 0
	while(i < nmbrOfPlayers)
	{
		if(players[i].bankrupt) 
			rank-=1;
		i += 1;
	}
	return rank;
}

function endGame()
{
	$(".currentChanceBtns").remove();
	$("#btnTrade").prop('disabled', true); 

	$(".dice").remove();
	$("#btnRestartGame").css("display", "");
	$("#saveGame").prop('disabled', true); 

	gameOver = true;
	var i = 0;
	while(i < nmbrOfPlayers)
	{
		if(!players[i].bankrupt)
		{
			$("#" + players[i].color + "BankruptLabel")[0].innerHTML = "W I N N E R"; 
			$("#" + players[i].color + "BankruptData").css("background-color","#2a2")

			players[i].bankruptPlayer(i, 1);
		}
		$("#"+players[i].color+"Data").removeClass("currChanceData");
		i += 1;
	}

	return;
}

$(document).ready(function()
{

	//#region "Initial displays"
	
	$("#menu").css("display","none");
    $(".coin").css("display","none");
	$("#startcontrols").css("display","");
	$("#gameControls").css("display","none");
    $("#endControls").css("display","none");
    $("#btnTrade").css("display","none");
    $("#btnLogs").css("display","none");
	$("#saveGame").prop('disabled', true); 

	//#endregion "Initial displays"

	setupBoard();
	//#region "Game Functions"

	$("#start").click(function()
	{
		setupPlayers();
		startGame();
	});


	$("#diceContainer").click(function()
	{

		if(!gameStarted)
			return;
		if(gameOver)
			return;	
		if(diceRolled)
			return;
		if(isChanceOn)
			return;

		if(players[currPlayer].money < 0)
		{

			Swal.fire({
				title: "Low on Cash!",
				text: "You can Mortgage, Sale or Trade out your properties to get cash",
				confirmButtonColor: '#d33',
				showCancelButton: true,
				confirmButtonText: 'Declare Bankrupt',
				cancelButtonColor: '#3085d6',
				cancelButtonText: 'Get Cash',
			}).then((result) => 
			{
				if (result.isConfirmed) 
				{
					players[currPlayer].bankruptPlayer(currPlayer, getRank());
				}
			});
			return;
		}

		diceRolled = true;
		rollDice();
	});


	$("#btnDone").click(function()
    {
		if(isChanceOn)
			return;
		if(diceRolled)
		{
			changePlayer();
			diceRolled = false;
		}
		return;
	});
	

	$("#btnBuyProperty").click(function()
    {
		var cell = board[players[currPlayer].position];
		
		cell.owner = currPlayer;
		
		$("#PropertySaleModal").modal('hide');

		var log = new Log(currPlayer,-1,cell.price,"buy",cell.cellName);
		log.prependLogDiv();
		log.performTransaction();

		players[currPlayer].properties.push(cell.position);
		players[currPlayer].refreshCityGroups();

		Swal.fire(
			'',"Bought " + cell.cellName + " for " +rupeeSym+ " " + cell.price,
			'success'
		);

		refreshGameUI();
	});


});