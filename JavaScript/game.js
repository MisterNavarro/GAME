// TO HANDLE THE PLAYERS SELECTIONS
var selectedPiece = {
    pieceImg: "",
    type: "",
    amountPlaced: 0,
    explainCount: 0
};

//WHOS TURN IT IS
var turn = true;
//HUMANS CHARACTER SELECTION
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
//COMPUTERS CHARACTER SELECTION
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
//ADDS COMPUTER PIECE IMAGE TO THE SELECTED SQUARE
function computersPieces() {

    //FINDS THE APPROPRIATE PIECES FOR THE GAME
    compPieces.papers.numOfpapers = humanPieces.rocks.numOfrocks;
    compPieces.scissors.numOfscissors = humanPieces.papers.numOfpapers;
    compPieces.rocks.numOfrocks = humanPieces.scissors.numOfscissors;

    var rockies = compPieces.rocks.numOfrocks;
    var scisseries = compPieces.scissors.numOfscissors;
    var papery = compPieces.papers.numOfpapers;
    var statusTable = document.getElementById("status").getElementsByTagName("table")[1];
    statusTable.style.visibility = "visible";

    var count = 0;
    var maxStatusTable = 9;
    //ADDS THE COMPUTERS PIECES
    var tableRow = document.getElementById("boardgame").getElementsByTagName("tr");
    for (var xxx = 0; xxx < 5; xxx++) {
        var tableR = tableRow[xxx].getElementsByTagName("td");
        for (var xx = 0; xx < 3; xx++) {
            //Once all the pieces are set it breaks out
            if (count > maxStatusTable) {
                break;
            }
            var statusBar = statusTable.getElementsByTagName("td")[count];
            if (rockies === 0) {
                if (scisseries === 0) {
                    tableR[xx + 9].style.background = "url('levels/paper2.jpg') no-repeat center white";
                    tableR[xx + 9].style.backgroundSize = "contain";
                    statusBar.style.background = "url('levels/paper2.jpg') no-repeat center white";
                    papery--;
                }
                else {
                    tableR[xx + 9].style.background = "url('levels/scissors2.jpg') no-repeat center white";
                    tableR[xx + 9].style.backgroundSize = "contain";
                    statusBar.style.background = "url('levels/scissors2.jpg') no-repeat center white";
                    scisseries--;
                }
            }
            else {
                tableR[xx + 9].style.background = "url('levels/rock2.jpg') no-repeat center white";
                tableR[xx + 9].style.backgroundSize = "contain";
                statusBar.style.background = "url('levels/rock2.jpg') no-repeat center white";
                rockies--;
            }
            statusBar.style.backgroundSize = "contain";
            statusBar.style.backgroundColor= "white";
            count++;
        }
    }
}

//ADDS SELECTED PIECE TO THE SELECTED SQUARE
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
                    selectedPiece.pieceImg = "url('levels/rock2.jpg') no-repeat center white";
                    selectedPiece.type = "rocks";
                    break;
                }
                case 1: {
                    selectedPiece.pieceImg = "url('levels/paper2.jpg') no-repeat center white";
                    selectedPiece.type = "papers";
                    break;
                }
                case 2: {
                    selectedPiece.pieceImg = "url('levels/scissors2.jpg') no-repeat center white";
                    selectedPiece.type = "scissors";
                    break;
                }
            }
        }
    }

    ShowFreeSpots();

}
//THIS FUNCTION CONTAINS THE PARAGRAPHS FOR THE STORY LINE
function ParagraphForStoryLine(num) {
    var story = [];
    story[0] = "My first (but not last) game created with HTML, CSS, & JAVASCRIPT.<br>" +
        "It was a fun adventure creating this game but man can the simplest things " +
        "we take granted in life can create a migrane when turning it to code.";
    story [1] = "I first began creating my game board.<br>" +
        "Not too big, but not too small. I used JavaScript to show a little bit about" +
        "creating elements by cloning a table row and making 1 table row to 5 table rows.";
    story [2] = "I was so excited when I first started creating the game, I wanted to add levels" +
        "for each characters, I wanted to give them each different movements, range, HP's, and so on." +
        "The more I became invested in it the farther behind I became. All these ideas started but none completed.";
    story[3] = "Had to rethink of this game and go back to basics. First step is choosing your characters. I decided" +
        "to use an object to hold the users selections. To choose which piece they wanted and where they were going" +
        "to place each character.";
    story[4] = "Once the user chooses the character I had a function to run and show on the table which " +
        "square pieces where allowed, by using a \"for\" loop and adding yellow backgrounds to them with events" +
        "I used this function everytime a piece was placed.";
    story[5] =  "I added the images the images to the table data that was calling the function when it was clicked." +
        "I used the \"this\" keyword to recognize which element I needed to add the image to and added a class name" +
        "to the table data to recognize which piece is human and which is the computer.";
    story[6] = "I then saved how many pieces the user chose in an object that has a subset for each character type. " +
        "This way I would be able to choose which computer pieces to add to the table off of the selection the user" +
        "made.";
    story[7] = "Unfortunately time has ran out, what is going to be an amazing game, is only lots of small features" +
        "to show my JavaScript skills. It's the beginning of my next chapter in the technology world, and a great" +
        "decision on the class. Thank you and hope I commented all the code to make things more understandable.";
   //PLAYS THE CORRECT PARAGRAPH
    document.getElementById("explain").getElementsByTagName("p")[0].innerHTML = story[num];
}

//THE BUTTONS TO CHANGE THE CONTENT ON THE CLASS EXPLANATION
function changeContent() {
    //IF THE BACK BUTTON IS PRESSED GO BACK A SPACE
    if (this.value === "BACK") {
        //makes sure that the count falls to the negatives
        if (!(selectedPiece.explainCount === 0 ||  1)) {
            selectedPiece.explainCount-= 2;
        }
    }
    //STARTS TO THE BEGINNING IF IT HIT THE END
    if (selectedPiece.explainCount === 7) {
        selectedPiece.explainCount = 0;
    }
    var i = selectedPiece.explainCount;
    var explainImg = document.getElementById("explain").getElementsByTagName("img")[0];
    storyLine = ParagraphForStoryLine(i);
    explainImg.style.background = ("url(levels/explain" + i + ".jpg)");
    explainImg.style.backgroundSize = "contain";
    explainImg.style.backgroundRepeat = "no-repeat";
    selectedPiece.explainCount++;
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

    //ALLOWS THE CLASS EXPLAIN TO BE AN ACTIVE BUTTON
    var explained = document.getElementById("nav").getElementsByTagName("li")[2];
    if (explained.addEventListener) {
        explained.addEventListener("click", ShowOrHideCont, false);
    }
    else if (explained.attachEvent) {
        explained.attachEvent("onclick", ShowOrHideCont);
    }

    //THE BUTTON FEATURES IN THE EXPLAIN CONTAINER
    var expButtons = document.getElementById("explain").getElementsByTagName("input");
    if (expButtons[0].addEventListener) {
        expButtons[0].addEventListener("click", changeContent, false);
        expButtons[1].addEventListener("click", changeContent, false);
    }
    else if (expButtons[0].attachEvent) {
        expButtons[0].attachEvent("onclick", changeContent);
        expButtons[1].attachEvent("onclick", changeContent);
    }
}
//CREATES THE BOARD
function createBoard() {
    var trow = document.getElementsByTagName("tr");
    var board = document.getElementsByTagName("table")[0];
    for (var i = 0; i < 4; i++) {
        board.appendChild(trow[i].cloneNode(true));
    }
    var allImgages= document.getElementById("characters").getElementsByTagName("img");
    for (var zzz = 0; zzz < 3; zzz++) {
        allImgages[zzz].style.border = "3px solid yellow";
    }
    //EVENTS FOR THE RULES CONTAINER
    var dasRules = document.getElementById("nav").getElementsByTagName("li")[1];
    if (dasRules.addEventListener) {
        dasRules.addEventListener("click", ShowOrHideCont, false);
    }
    else if (dasRules.attachEvent) {
        dasRules.attachEvent("onclick", ShowOrHideCont);
    }
}

//SETS UP THE PAGE AND THE FUNCTIONS
function setUpPage() {
    createBoard();
    createEvents();
}

//SHOWS OR HIDES THE EXPLANATION CONTENT
function ShowOrHideCont() {
    var activeContainer;
    var currentContainer;
    var whatsthis = this.innerHTML.toLowerCase();

    //FINDS OUT WHICH ELEMENT TO SHOW FROM THE "LI" BUTTON
    if (whatsthis === "rules") {
        currentContainer = document.getElementById("rules");
        activeContainer = document.getElementById("explain");
    }
    else if (whatsthis === "class explenation") {
        activeContainer = document.getElementById("rules");
        currentContainer = document.getElementById("explain");
    }
    //CHECKS TO SEE IF THE BUTTON WAS PRESSED TO HIDE THE CONTENT OR TO SHOW IT
    if (currentContainer.style.display === "none") {
        currentContainer.style.display = "block";
        activeContainer.style.display = "none";
        if (currentContainer === document.getElementById("explain")) {
            //IF THE EXPLAIN WAS PRESSED, RESETS THE STORY AND PLAYS THE CONTENT
            selectedPiece.amountPlaced = 0;
            changeContent();
        }
    }
    else {
        currentContainer.style.display = "none";
    }
}

//FIRST EVENT THAT LOADS UP WHEN THE PAGE BECOMES ALIVE
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
}
else if (window.attachEvent) {
    window.attacheEvent("onload", setUpPage);
}