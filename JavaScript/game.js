// TO HANDLE THE PLAYERS SELECTIONS
var selectedPiece = {
 pieceImg: "",
 type: "",
 amountPlaced: 0
};

//WHOS TURN IT IS
var turn = true;

//HUMAN PIECES, HOW MANY OF WHICH THEY HAVE, AND MAKES OBJECTS OF THEM 
var humanPieces = { 
 rocks: { 
  numOfrocks: 0,
  allrocks:[]},
 papers: { 
  numOfpapers: 0,
  allpapers: []},
 scissors: { 
  numOfscissors: 0,
  allscissors: []}
};

var compPieces = { 
 rocks: { 
  numOfrocks: 0,
  allrocks:[]},
 papers: { 
  numOfpapers: 0,
  allpapers: []},
 scissors: { 
  numOfscissors: 0,
  allscissors: []}
};

function createAnewObject() {
 
 //SEES IF TO CREATE HUMAN OR COMPUTER PIECES
 var whichObj;
 if (turn === "true") {
  window.alert(thetype);
  var thetype = selectedPiece.type;
  /*humanPieces[type]["all" + type]["numOf" + type] = humanPieces[type]["make" + type]["char" + type]*/
  var wtf = humanPieces[thetype]["all" + type]["numOf" + thetype];
  window.alert(wtf);
 }
 else {
  whichObj = "compPieces";
 }

 //whichObj.[selectedPiece.type]
 
}
function createrocks() {
  
}
function createpapers() {}
function createscissors() {}
 
//ADDS THE IMAGE TO THE SELECTED SQUARE
function computersPieces() {
 
 //FINDS THE APPROPRIATE PIECES FOR THE GAME
 compPieces.papers.numOfpapers = humanPieces.rocks.numOfrocks;
 compPieces.scissors.numOfscissors = humanPieces.papers.numOfpapers;
 compPieces.rocks.numOfrocks = compPieces.scissors.numOfscissors;
 
 var rockies = compPieces.rocks.numOfrocks;
 var scisseries = compPieces.scissors.numOfscissors;
 var papery = compPieces.papers.numOfpapers;
 var compSideTR = document.getElementById("boardgame").getElementsByTagName("tr");
 var statusBar = document.getElementById("status").getElementsByTagName("table")[1];
 statusBar.style.visibility = "visible";
 
 var count = 0;
 
 //ADDS THE COMPUTERS PIECES
var tableRow = document.getElementById("boardgame").getElementsByTagName("tr");
 for (var xxx = 0; xxx < 5; xxx++) {
  var tableR = tableRow[xxx].getElementsByTagName("td");
  for (var xx = 0; xx < 3; xx++) {
   statusBar = statusBar.getElementsByTagName("td")[count];
   if (rockies === 0) {
   if (scisseries === 0) {
    tableR[xx + 9].style.background = "url('levels/paper2') no-repeat center";
    statusBar.style.background = "url('levels/paper2') no-repeat center";
    papery--;
   }
   else {
    tableR[xx + 9].style.background = "url('levels/rock2') no-repeat center";
    statusBar.style.background = "url('levels/rock2') no-repeat center";
    scisseries--;
   }
  }
   else {
    tableR[xx + 9].style.background = "url('levels/scissors2.jpg') no-repeat center";
    statusBar.style.background = "url('levels/scissors2.jpg') no-repeat center";
    rockies--;
   }
   statusBar.style.backgroundSize = "contain";
   count++;
   }
  }
  
}
 
function userAddsGamePiece() {
 
 //CHECKS TO MAKE SURE ITS A YELLOW BACKGROUND
 if (this.style.backgroundColor === "yellow") {
  
  //SHOWS THE STATUS TABLE AND ADDS THE CHARACTERS AS YOU GO
  var statusTD = document.getElementById("status").getElementsByTagName("table")[0].getElementsByTagName("td");
  document.getElementById("status").getElementsByTagName("table")[0].style.visibility = "visible";
  statusTD[selectedPiece.amountPlaced].style.background = selectedPiece.pieceImg;
  statusTD[selectedPiece.amountPlaced].style.backgroundSize = "contain";
  statusTD[selectedPiece.amountPlaced].style.backgroundColor = "white";
  
  //SHOWS THE IMAGE TO THE SELECTED SQUARE
  this.className = "human";
  this.style.background = selectedPiece.pieceImg;
  this.style.backgroundColor = "white";
  this.style.backgroundSize = "contain";
  
  //KEEPS RECORD OF AMOUNT OF ROCKS AND CREATES AN OBJECT
  switch(selectedPiece.type) {
   case "rocks": {
    humanPieces.rocks.allrocks[humanPieces.rocks.numOfrocks] = createrocks();
    humanPieces.rocks.numOfrocks+= 1;
    break;
   }
   case "papers": {
    humanPieces.papers.allpapers[humanPieces.papers.numOfpapers] = createpapers();
    humanPieces.papers.numOfpapers+= 1;
    break;
   }
   case "scissors": {
    humanPieces.papers.allpapers[humanPieces.scissors.numOfscissors] = createscissors();
    humanPieces.scissors.numOfscissors+= 1;
   break;
   }
  }
  //chia
  selectedPiece.amountPlaced++;
 
 //WHEN ALL 10 PIECES ARE PLACED ON THE BOARD
 if (selectedPiece.amountPlaced === 10) {
  var allImgs = document.getElementById("characters").getElementsByTagName("img");
   
  //REMOVES THE IMAGE EVENTS & CHANGES THE BORDERS TO BLACK
  for (var abc = 0; abc < 3; abc++) {
  
   allImgs[abc].style.border = "3px solid black";
   if (allImgs[abc].removeEventListener) {
    
    allImgs[abc].removeEventListener("click", OfSelected);
   }
   else if (allImgs[abc].detachEvent) {
    allImgs[abc].detachEvent("onclick", OfSelected);
   }
  }
  
  //REMOVES ALL TDS EVENTS
  for (var ab = 0; ab < 5; ab++) {
   var theTR = document.getElementById("boardgame").getElementsByTagName("tr")[ab];
   for (var a = 0; a < 3; a++) {
    var theTD = theTR.getElementsByTagName("td")[a];
    
    //REMOVES THE YELLOW FROM THE TABLE
    if (theTD.style.backgroundColor === "yellow") { 
     theTD.style.backgroundColor = "";
    }
    if (theTD.removeEventListener) {
     theTD.removeEventListener("click", userAddsGamePiece);
    }
    else if (theTD.detachEvent) {
     
     theTD.detachEvent("onclick", userAddsGamePiece);
    }
   }
  }
  //STARTS UP THE COMPUTERS PIECES NOW
  setInterval(computersPieces, 1000);
  }
 }
}

//SHOWS THE FREE SPOTS TO PLACE THE ITEMS AT
function ShowFreeSpots() {
 
 
 //ADDS OR REMOVES EVENTS TO THE SELECTED TD AREAS
 var tableRow = document.getElementById("boardgame").getElementsByTagName("tr");
 for (var xxx = 0; xxx < 5; xxx++) {
  var tableR = tableRow[xxx].getElementsByTagName("td");
  for (var xx = 0; xx < 3; xx++) {
   //CHECKS WHICH TD IS EMPTY AND ADDS EVENTS TO IT
   if (tableR[xx].style.backgroundColor === "") {
    tableR[xx].style.backgroundColor = "yellow";
    if (tableR[xx].addEventListener) {
     tableR[xx].addEventListener("click", userAddsGamePiece, false);
    }
    else if (tableR[xx].attachEvent) {
     tableR[xx].attachEvent("onclick", userAddsGamePiece);
    } 
   }
   //ELSE THERE IS A PIC AND REMOVE THE EVENT FOR IT
   else if (tableR[xx].style.backgroundColor === "white") {
    if (tableR[xx].removeEventListener) {
     tableR[xx].removeEventListener("click", userAddsGamePiece);     
    }
    else if (tableR[xx].detachEvent) {
     tableR[xx].detachEvent("onclick", userAddsGamePiece);
    }
   }
  } 
 }

}

//HOLDS THE VALUE TO MAKE IT EASIER FOR THE HUMAN TO CHOOSE 
function OfSelected() {
 
 //ADDS THE YELLOW BORDER TO THE IMAGES 
 var allImgages= document.getElementById("characters").getElementsByTagName("img");
 for (var zzz = 0; zzz < 3; zzz++) {
  allImgages[zzz].style.border = "3px solid yellow";
 }
 
 //MAKES THE SELECTED IMAGE BORDER RED
 this.style.border = "3px solid red";
 
 //FINDS OUT WHAT IMAGE WAS SELECTED
 for (var zz = 0; zz < 3; zz++) {
  
  if (allImgages[zz].style.border === "3px solid red") {
   switch(zz) {
    case 0: {
     selectedPiece.pieceImg = "url('levels/rock2') no-repeat center";
     selectedPiece.type = "rocks";
     break;
    }
    case 1: {
     selectedPiece.pieceImg = "url('levels/paper2') no-repeat center";
     selectedPiece.type = "papers";
     break;
    }
    case 2: {
     selectedPiece.pieceImg = "url('levels/scissors2.jpg') no-repeat center";
     selectedPiece.type = "scissors";
     break;
    }
   }
  } 
 }
 
 ShowFreeSpots();

}

//ADDS THE EVENTS
function createEvents() {
 
 //ALLOWS THE HUMAN TO CHOOSE BETWEEN THE THREE PICTURES
 var imgStart = document.getElementById("characters").getElementsByTagName("img");
 if (imgStart[0].addEventListener) {
   for (var z = 0; z < 3; z++) {
   imgStart[z].addEventListener("click", OfSelected, false);
   }
 }
 else if (imgStart[0].attachEvent) {
  for (var y = 0; y < 3; y++) {
  imgStart[y].attachEvent("onclick", OfSelected);
  }
 }
}


//CREATES THE BOARD
function createBoard() {
 var trow = document.getElementsByTagName("tr");
 var tcell = document.getElementsByTagName("td");
 var board = document.getElementsByTagName("table")[0];
 var gamesize = 8;
  for (var i = 0; i < 4; i++) {
   board.appendChild(trow[i].cloneNode(true));
  }
 var allImgages= document.getElementById("characters").getElementsByTagName("img");
 for (var zzz = 0; zzz < 3; zzz++) {
  allImgages[zzz].style.border = "3px solid yellow";
 }
 }

 
//SETS UP THE PAGE AND THE FUNCTIONS
function setUpPage() {
 createBoard();
 createEvents();
}

//FIRST EVENT THAT LOADS UP WHEN THE PAGE BECOMES ALIVE
if (window.addEventListener) {
 window.addEventListener("load", setUpPage, false);
}
else if (window.attachEvent) {
 window.attacheEvent("onload", setUpPage);
}