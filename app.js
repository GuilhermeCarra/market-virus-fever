const grid = document.querySelector("#grid");
const boardWidth = 17;
const products = ["apples", "oranges", "lemons", "toy", "bread", "ketchup"];

var x = 0;
var username = 10;
var gameOn = false;
var winCondition = false;
var winner = false;
var timeStart;
var totalTime;
var product;

// CHARACTERS VARIABLES
var playerLocation = 287;
var playerDirection = 0;
var babushkaLocation = 285;
var babushkaMove;
var blondLocation = 36;
var blondMove;
var aliceLocation = 117;
var aliceDirection = 0;
var aliceMove;
var gasmaskLocation = 43;
var gasmaskDirection = 0;
var gasmaskMove;
var loggerLocation = 109;
var managerLocation = 188;
var babushkaDirection = 0;
var blondDirection = 10;
var NPCdirectionT = "stopped";

// CHECKS IF USERNAME INPUT IS CORRECT
document.getElementById("submit-btn").addEventListener("click", function(){
    username = document.querySelector("#name").value;
    let errorMsg = document.querySelector("#login-error");
    if (username == "" || username == null || username == " ") {
        errorMsg.classList.remove("hidden")
        errorMsg.innerText = "Please enter an username!";
    } else {
    errorMsg.classList.add("hidden");
    document.querySelector('input[type="submit"]').click();
    }
})

// WHEN A CORRECT USERNAME IS SENT SHOWS GAME SCREEN
const userForm = document.getElementsByTagName("FORM");
userForm[0].addEventListener("submit", function(){
    event.preventDefault();
    username = document.querySelector("#name").value;
    document.querySelector("#start").classList.toggle("hidden");
    document.querySelector("#game").classList.toggle("hidden");
});

// STARTS THE GAME AND SAVES THE STARTING TIME
document.querySelector("#goBtn").addEventListener("click", function(){
    document.querySelector("#instructions").classList.toggle("hidden");
    timeStart = new Date().getTime();
    gameStart();
});

const scenery = [
    "src/scenery/toy.png",
    "src/scenery/apples.jpg", "src/scenery/apples_orange.jpg", "src/scenery/oranges_lemons.jpg", "src/scenery/lemons.jpg",
    "src/scenery/apples_middle.jpg", "src/scenery/apples_orange_middle.jpg", "src/scenery/oranges_lemons.jpg", "src/scenery/lemons_middle.jpg",
    "src/scenery/shelf.jpg", "src/scenery/shelf.jpg", "src/scenery/shelf.jpg", "src/scenery/lemons_end.jpg",
    "src/scenery/ketchup_1.png", "src/scenery/cash_1.png", "src/scenery/cash_2.png","src/chars/cashier_head.gif",
    "src/scenery/ketchup_2.png", "src/scenery/cash_3.png", "src/scenery/cash_4.png", "src/scenery/cash_5.png", "src/chars/cashier_body.gif",
    "src/scenery/bread_1.png", "src/scenery/bread_2.png", "src/scenery/bread_3.png", "src/scenery/cash_6.png","src/scenery/cash_7.png", "src/scenery/cash_8.png", "src/scenery/cash_9.png",
    "src/scenery/bread_4.png", "src/scenery/bread_5.png", "src/scenery/bread_6.png", "src/scenery/cash_10.png", "src/scenery/cash_11.png", "src/scenery/cash_12.png", "src/scenery/cash_13.png", "src/scenery/bread_7.png", "src/scenery/bread_8.png", "src/scenery/bread_9.png",
    "src/scenery/bread_10.png", "src/scenery/bread_11.png", "src/scenery/bread_12.png","src/scenery/table_1.png", "src/scenery/table_2.png",
    "src/scenery/bread_13.png", "src/scenery/bread_14.png", "src/scenery/bread_15.png", "src/scenery/table_3.png", "src/scenery/table_4.png", "src/scenery/bar_1.png", "src/scenery/bar_2.png","src/scenery/bar_3.png",
    "src/scenery/table_5.png", "src/scenery/table_6.png"
];

const characters = [
    {
        name: "player",
        headL: "src/chars/kien_head.gif",
        bodyL: "src/chars/kien_body.gif",
        legsL: "src/chars/kien_legs.gif",
        headR: "src/chars/kien_right_head.gif",
        bodyR: "src/chars/kien_right_body.gif",
        legsR: "src/chars/kien_right_legs.gif",
        headD: "src/chars/kien_down_head.gif",
        bodyD: "src/chars/kien_down_body.gif",
        legsD: "src/chars/kien_down_legs.gif",
        headU: "src/chars/kien_up_head.gif",
        bodyU: "src/chars/kien_up_body.gif",
        legsU: "src/chars/kien_up_legs.gif"
    },
    {
        name: "babushka",
        headL: "src/chars/babushka_head.gif",
        bodyL: "src/chars/babushka_body.gif",
        legsL: "src/chars/babushka_legs.gif",
        headR: "src/chars/babushka_right_head.gif",
        bodyR: "src/chars/babushka_right_body.gif",
        legsR: "src/chars/babushka_right_legs.gif"
    },
    {
        name: "blond",
        headD: "src/chars/blond_down_head.gif",
        bodyD: "src/chars/blond_down_body.gif",
        legsD: "src/chars/blond_down_legs.gif",
        headU: "src/chars/blond_up_head.gif",
        bodyU: "src/chars/blond_up_body.gif",
        legsU: "src/chars/blond_up_legs.gif"
    },
    {
        name: "logger",
        head: "src/chars/logger_take_head.gif",
        body: "src/chars/logger_take_body.gif",
        legs: "src/chars/logger_take_legs.gif",
        headtop: "src/chars/logger_take_headtop.gif",
    },
    {
        name: "manager",
        head: "src/chars/manager_take_head.gif",
        body: "src/chars/manager_take_body.gif",
        legs: "src/chars/manager_take_legs.gif",
    },
    {
        name: "alice",
        headL: "src/chars/alice_head.gif",
        bodyL: "src/chars/alice_body.gif",
        legsL: "src/chars/alice_legs.gif",
        headR: "src/chars/alice_right_head.gif",
        bodyR: "src/chars/alice_right_body.gif",
        legsR: "src/chars/alice_right_legs.gif",
        headD: "src/chars/alice_down_head.gif",
        bodyD: "src/chars/alice_down_body.gif",
        legsD: "src/chars/alice_down_legs.gif",
        headU: "src/chars/alice_up_head.gif",
        bodyU: "src/chars/alice_up_body.gif",
        legsU: "src/chars/alice_up_legs.gif"
    },
    {
        name: "gasmask",
        headL: "src/chars/gasmask_head.gif",
        bodyL: "src/chars/gasmask_body.gif",
        legsL: "src/chars/gasmask_legs.gif",
        headR: "src/chars/gasmask_right_head.gif",
        bodyR: "src/chars/gasmask_right_body.gif",
        legsR: "src/chars/gasmask_right_legs.gif"
    }
]

// SELECTS ALL DIVS (GRID)
var tiles = document.querySelectorAll(".tile");

// CREATES THE BOARD WITH SCENERY
for (let i = 0; i < grid.childElementCount; i++) {
    if (tiles[i].classList.contains("shelf")){
        var shelf = document.createElement("img");
        shelf.setAttribute("src",scenery[x])
        tiles[i].appendChild(shelf);
        x++
    }
}

function gameStart(){
    gameOn = true;
    randomProduct();

    // PRINTING CHARACTERS ON THEIR INITIAL POSITION
    charactersLocation(playerLocation, characters[0], playerDirection);
    charactersLocation(babushkaLocation, characters[1], babushkaDirection);
    charactersLocation(blondLocation, characters[2], blondDirection);
    charactersLocation(loggerLocation, characters[3], NPCdirectionT);
    charactersLocation(managerLocation, characters[4], NPCdirectionT);
    charactersLocation(aliceLocation, characters[5], babushkaDirection);
    charactersLocation(gasmaskLocation, characters[6], babushkaDirection);

    // SETS INTERVALS TO MOVE A SPECIFIC CHARACTER
    babushkaMove = setInterval(function() {
        //LIMITS THE WALKING ZONE FOR THE SPECIFIC CHARACTER
        if((babushkaLocation-1) % boardWidth == 0) {
            babushkaDirection = 1;
        } else if (babushkaDirection == 0 || babushkaLocation == 285) {
            babushkaDirection = -1;
        }
        babushkaLocation += babushkaDirection;
        charactersLocation(babushkaLocation, characters[1], babushkaDirection);
        checkStatus();
    },900);

    blondMove = setInterval(function() {
        if((blondLocation + 17) == 155) {
            blondDirection = -17;
        } else if (blondDirection == 0 || blondLocation == 36) {
            blondDirection = 17;
        }
        blondLocation += blondDirection;
        charactersLocation(blondLocation, characters[2], blondDirection);
        checkStatus();
    },450);

    aliceMove = setInterval(function() {
        if(aliceLocation == 112) {
            aliceDirection = 1;
        } else if (aliceLocation == 117) {
            aliceDirection = -1;
        } else if (aliceLocation == 113 && aliceDirection == 1) {
            aliceDirection = 17;
        } else if (aliceLocation == 215) {
            aliceDirection = -17;
        } else if (aliceLocation == 113 && aliceDirection == -17) {
            aliceDirection = 1;
        }
        aliceLocation += aliceDirection;
        charactersLocation(aliceLocation, characters[5], aliceDirection);
        checkStatus();
    },300);

    gasmaskMove = setInterval(function() {
        if(gasmaskLocation == 43) {
            gasmaskDirection = 1;
        } else if (gasmaskLocation == 47) {
            gasmaskDirection = -1;
        }
        gasmaskLocation += gasmaskDirection;
        charactersLocation(gasmaskLocation, characters[6], gasmaskDirection);
        checkStatus();
    },500);
}

// CREATES A RANDOM PRODUCT (OBJECTIVE) AND SHOW THE OBJECTIVE POP-UP
function randomProduct(){
    product = products[Math.floor(Math.random()*6)];
    let showProduct = document.querySelector("#random-product span");
    let productIMG = document.createElement("IMG");
    productIMG.setAttribute("src", "src/products/"+product+".png");
    showProduct.appendChild(productIMG);
    document.querySelector("#random-product").classList.toggle("hidden");
}

// MOVES ALL CHARACTERS: DELETES LAST SPRITE AND PUTS A NEW ONE BASED ON YOUR MOVE DIRECTION
function charactersLocation(location, characterObj, direction) {
    var character = characterObj.name;
    var bodyLocation = location - boardWidth;
    var headLocation = location - boardWidth - boardWidth;
    var underLegs = location + boardWidth
    var removeSprite = document.querySelectorAll('img[last-position="'+character+'"]');

    //CREATING IMGS FOR THE NEW LOCATION
    let head = document.createElement("img");
    let body = document.createElement("img");
    let legs = document.createElement("img");
    head.setAttribute("last-position", character);
    body.setAttribute("last-position", character);
    legs.setAttribute("last-position", character);

    // CHANGING THE IMAGE SOURCE BASED ON THE DIRECTION
    if  (direction == 1) {
        head.setAttribute("src", characterObj.headR);
        body.setAttribute("src", characterObj.bodyR);
        legs.setAttribute("src", characterObj.legsR);
    } else if (direction == -17) {
        head.setAttribute("src", characterObj.headU);
        body.setAttribute("src", characterObj.bodyU);
        legs.setAttribute("src", characterObj.legsU);
    } else if (direction == 17 || direction == 10) {
        head.setAttribute("src", characterObj.headD);
        body.setAttribute("src", characterObj.bodyD);
        legs.setAttribute("src", characterObj.legsD);
    } else if (direction == - 1 || direction == 0) {
        head.setAttribute("src", characterObj.headL);
        body.setAttribute("src", characterObj.bodyL);
        legs.setAttribute("src", characterObj.legsL);
    } else if (direction == "stopped") {
        if (characterObj.hasOwnProperty("headtop")) {
            let headTop = document.createElement("img");
            headTop.setAttribute("last-position", character);
            headTop.setAttribute("src", characterObj.headtop);
            tiles[headLocation-17].appendChild(headTop);
        }
        head.setAttribute("src", characterObj.head);
        body.setAttribute("src", characterObj.body);
        legs.setAttribute("src", characterObj.legs);
    }

    // REMOVING SPRITES OF THE LAST MOVEMENT
    if (direction == -1 || direction == 1) {
        tiles[location-direction].classList.remove(character);
        tiles[headLocation-direction].removeChild(removeSprite[0]);
        tiles[bodyLocation-direction].removeChild(removeSprite[1]);
        tiles[location-direction].removeChild(removeSprite[2]);

        // REMOVING SOCIAL DISTANCE IF A NPC MOVES
        if (character != "player") {
            tiles[bodyLocation-direction-direction].classList.remove("social-distance");
            tiles[location-direction-direction].classList.remove("social-distance");
            tiles[underLegs-direction-direction].classList.remove("social-distance");
            tiles[location].classList.remove("social-distance");
        }
    }
    if (direction == -17 || direction == 17) {
        tiles[location-direction].classList.remove(character);
        tiles[headLocation-direction].removeChild(removeSprite[0]);
        tiles[bodyLocation-direction].removeChild(removeSprite[1]);
        tiles[location-direction].removeChild(removeSprite[2]);

        if (character != "player") {
            tiles[location-direction-direction+1].classList.remove("social-distance");
            tiles[location-direction-direction].classList.remove("social-distance");
            tiles[location-direction-direction-1].classList.remove("social-distance");
            tiles[location].classList.remove("social-distance");
        }
    }
    // ADDING SOCIAL DISTANCE IF IT IS AN NPC MOVING
    if (character != "player") {
        tiles[location+1].classList.add("social-distance");
        tiles[location-1].classList.add("social-distance");
        tiles[bodyLocation+1].classList.add("social-distance");
        tiles[bodyLocation-1].classList.add("social-distance");
        tiles[bodyLocation].classList.add("social-distance");
        tiles[underLegs+1].classList.add("social-distance");
        tiles[underLegs-1].classList.add("social-distance");
        tiles[underLegs].classList.add("social-distance");
    }
    // ADDING IMG ELEMENTS ON THEIR NEW POSITION
    tiles[headLocation].appendChild(head);
    tiles[bodyLocation].appendChild(body);
    tiles[location].appendChild(legs);
    tiles[location].classList.add(character);
}

// PLAYER MOVEMENTS WITH KEYBOARD EVENTS
document.addEventListener("keydown", function() {
    if (gameOn) {
        switch (event.key) {
        case "Down": // ADDING TWO CASES FOR I.E. EXPLORER SUPPORT
        case "ArrowDown":
            playerDirection = 17;
            if (playerLocation > 288) return;
            if((tiles[playerLocation+17]).classList.contains("shelf")) return;
            playerLocation += playerDirection;
            charactersLocation(playerLocation, characters[0], playerDirection);
            checkStatus();
            break;

        case "Up":
        case "ArrowUp":
            if (playerLocation - (boardWidth *2 ) < boardWidth) return;
            if((tiles[playerLocation+-17]).classList.contains("shelf")) return;
            playerDirection = -17;
            playerLocation += playerDirection;
            charactersLocation(playerLocation, characters[0], playerDirection);
            checkStatus();
            break;

        case "Left":
        case "ArrowLeft":
            playerDirection = -1;
            if(playerLocation % boardWidth == 0) return;
            if((tiles[playerLocation-1]).classList.contains("shelf")) return;
            playerLocation += playerDirection;
            charactersLocation(playerLocation, characters[0], playerDirection);
            checkStatus();
            break;

        case "Right":
        case "ArrowRight":
            playerDirection = 1;
            if((playerLocation+1) % boardWidth == 0) return;
            if((tiles[playerLocation+1]).classList.contains("shelf")) return;
            playerLocation += playerDirection;
            charactersLocation(playerLocation, characters[0], playerDirection);
            checkStatus();
            break;

        case "Spacebar":
        case " ":
            if (tiles[playerLocation+1].classList.contains(product) ||
            tiles[playerLocation-1].classList.contains(product) ||
            tiles[playerLocation+17].classList.contains(product) ||
            tiles[playerLocation-17].classList.contains(product)
            ){
                winCondition = true;
                let pickLocation =  playerLocation-(17*3);
                if (pickLocation < 0) pickLocation = playerLocation+17
                let okItem = document.createElement("IMG");
                okItem.setAttribute("src", "src/got_item.gif");
                tiles[pickLocation].appendChild(okItem);
                let winImage = document.createElement("IMG");
                winImage.setAttribute("src", "src/finish.gif");
                tiles[202].appendChild(winImage);
                setTimeout(function(){
                    tiles[pickLocation].removeChild(tiles[pickLocation].lastChild);
                },1000);
            }
            break;
        }
    }
});

// CHECKS IF THE GAME IS OVER
function checkStatus(){
    // IF PLAYER ENTERED THE SOCIAL DISTANCE
    if (tiles[playerLocation].classList.contains("social-distance")) {
        stopGame();
        setTimeout(function(){
            document.querySelector("#game-lost").classList.toggle("hidden");
        },700);
    }
    // IF PLAYER HAS THE OBJECTIVE AND IS ON THE RIGHT SPOT
    if (tiles[playerLocation].classList.contains("win") && winCondition) {
        winner = true;
        stopGame();
        document.querySelector("#win-firework").classList.toggle("hidden");
        setTimeout(function(){
            document.querySelector("#game-win").classList.toggle("hidden");
        },700);
    }
}

var restartBtn = document.getElementsByClassName("restartBtn");
    for  (let iBtn = 0; iBtn < restartBtn.length; iBtn++) {
        restartBtn[iBtn].addEventListener("click", restartGame);
    }

// STOP GAME MOVES IF IT'S OVER
function stopGame() {
    // ADD CSS EFFECT FILTER IF GAME IS LOOSE
    if (!winner) {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].classList.toggle("losing");
        }
    }
    gameOn = false;
    clearInterval(babushkaMove);
    clearInterval(blondMove);
    clearInterval(aliceMove);
    clearInterval(gasmaskMove);
    //CALCS AND SHOWS THE GAME TIME
    var timeEnd = new Date().getTime();
    totalTime = Math.floor((timeEnd - timeStart) / 1000);
    let gameTime = document.querySelectorAll(".game-time")
    for (let i = 0; i < gameTime.length; i++) {
        gameTime[i].innerText = totalTime;
    }
}

// RESETS ALL VARIABLES TO BEGIN A NEW GAME
function restartGame() {
    document.querySelector("#game").classList.toggle("hidden");
    document.querySelector("#start").classList.toggle("hidden");
    document.querySelector("#instructions").classList.toggle("hidden");
    document.querySelector("#random-product").classList.toggle("hidden");
    if (winner) {
        document.querySelector("#game-win").classList.toggle("hidden");
        document.querySelector("#win-firework").classList.toggle("hidden");
        saveScore();
    } else {
        document.querySelector("#game-lost").classList.toggle("hidden");
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].classList.toggle("losing");
        }
    }
    if (winCondition) {
        let removeWinImg = document.querySelector(".win img");
        removeWinImg.parentNode.removeChild(removeWinImg);
    }
    let removeSocialDistance = document.querySelectorAll(".social-distance");
    for (i = 0; i < removeSocialDistance.length; i++) {
        removeSocialDistance[i].classList.remove("social-distance");
    }

    let removeProductImg = document.querySelector("#random-product span img");
    removeProductImg.parentNode.removeChild(removeProductImg);

    // REMOVES ALL CHARACTERS MAKES SURE THAT THE SCENERY IS NOT REMOVED
    let resetCharacters = document.querySelectorAll("IMG");
    for (let i = 0; i < resetCharacters.length; i++) {
        if (resetCharacters[i].hasAttribute("last-position")) {
            resetCharacters[i].parentNode.removeChild(resetCharacters[i]);
        }
    }
    babushkaLocation = 285;
    blondLocation = 36;
    playerLocation = 287;
    babushkaDirection = 0;
    blondDirection = 10;
    playerDirection = 0;
    aliceLocation = 117;
    aliceDirection = 0;
    gasmaskLocation= 43;
    gasmaskDirection = 0;
    winCondition = false;
    winner = false;
}

// SAVES SCORES ON THE INITIAL PAGE
function saveScore(){
    var userLI = document.createElement("LI");
    var scoreLI = document.createElement("LI");
    userLI.classList.add("strong");
    userLI.innerText = username.toUpperCase();
    scoreLI.innerText = totalTime + " seconds";
    document.querySelector("#score ul").appendChild(userLI);
    document.querySelector("#score ul").appendChild(scoreLI);
}