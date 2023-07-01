/* 
File: ScrabbleScript.js

Assignment: HW5, Scrabble

Written by: Max Tighe, 
    Computer Science Student at UMass Lowell
    contact: max_tighe@student.uml.edu

Date created: 6/26/2023

Date updated: 7/1/2023

Description: A javascript file for
        scrabble functionality for index.html.
        Generates placeable tiles and board 
        positions, and makes various calculations based
        on placed tiles.
*/


// Global object for the current
// available board pieces
var boardPieces;

//global variable for 
//player's total score
var totalScore = 0;

//global for
//player's current score
var currScore;

function init(){

    //JSON functionality would have gone here
    boardPieces = resetPieces();

    dealPieces(7);

    $(".scrabble-tile").draggable();

    //creating board spaces
    for(var i = 0; i < 15; i++){

        var boardPos = document.createElement("li");

        $(boardPos).addClass("board-tile");

        $(boardPos).addClass("empty");

        $(boardPos).attr("id", "board-position-"+i)

        if(i == 2 || i == 12){
            $(boardPos).addClass("wordMult");
        }

        if(i == 6 || i == 8){
            $(boardPos).addClass("letterMult");
        }

        $("#tile-row").append(boardPos);

    }

    $(".board-tile").droppable({

        accept: ".scrabble-tile",

        // ui.draggable gets you the object that 
        // was dragged onto the droppable
        drop: function(event, ui){

            $(this).css({
                "background-color":"blue"
            });

            $(this).addClass("filled");

            $(this).removeClass("empty");

            $(ui.draggable).detach().css({top:0, left:0}).appendTo(this);

            checkWord();
        },

        out: function(event, ui){

            $(this).css({
                "background-color":"red"
            });

            $(this).addClass("empty");

            $(this).removeClass("filled");

            checkWord();
        }
    });

    $("#scoreboard").text("SCORE: " + 0);

}


function checkWord(){

    // generate array of letters

    // determine if word is complete (no gaps in array)

    //gaps in array are marked as "BLANK"

    var prev;

    //array of raw letter values, 
    // NO HTML OBJECTS
    var word = [];

    var endofWord = false;

    for(var i = 0; i < 15; i++){
        if(i == 0){
            // since there's no previous, make previous the current tile
            prev = $("#board-position-0");
        }

        //if the word has just begun/has not ended
        if(endofWord == false){

            // if the current board position has 
            // a tile, and the previous doesn't,
            // then this must be the start of a word

            if($("#board-position-"+i).hasClass("filled")
                && $(prev).hasClass("empty")){
            
                prev = ("#board-position-"+i);

                word.push($("#board-position-"+i));
            }

            else if($("#board-position-"+i).hasClass("filled")
            && $(prev).hasClass("filled")){
        
            prev = ("#board-position-"+i);

            word.push($("#board-position-"+i));
            }

            //both are blank
            else if($("#board-position-"+i).hasClass("empty")
            && $(prev).hasClass("empty")){

                prev = ("#board-position-"+i);
            }

            // the previous was a letter, but 
            // the current is blank
            else if($("#board-position-"+i).hasClass("empty")
            && $(prev).hasClass("filled")){

                endofWord = true;
            }

        }

        //word has ended, no more
        //words or stray tiles may
        //be placed.
        else{

            if( checkTile("#board-position-"+i) != "BLANK"){
        
                // error
                $("#scoreboard").text("Warning: invalid word, please ensure all tiles have no gaps in between them.");

                return;
            }

        }

    }


    // apply bonuses to appropriate tiles / word
    
    //check tile bonuses

    var wordMult = 1;

    currScore = Number(0);

    for(var j = 0; j < word.length; j++){

        if($(word[j]).hasClass("wordMult")){
            wordMult = (wordMult * 2);
        
            currScore += tileValue(checkTile(word[j]));
        }
        else if($(word[j]).hasClass("letterMult")){
            currScore += tileValue(checkTile(word[j])) * 2;
        }

        else{
            currScore += tileValue(checkTile(word[j]));
        }

    }

    currScore = currScore * wordMult;

    // display result in score
    $("#scoreboard").text("SCORE: " + currScore);
}

// returns letter if one exists, otherwise returns "BLANK"
// for empty place on board
function checkTile(target){

    // if there is no tile on this
    // spot on the board

    if($(target).hasClass("empty")){
        return "BLANK";
    }

    // if a tile does exist
    else{
        return $(target).find(".scrabble-tile").attr("letter");
    }

}

function tileValue(letter){

    if(letter == "A" || letter == "E" || letter == "I" ||
        letter == "O" || letter == "U" || letter == "L" ||
        letter == "N" || letter ==  "S" || letter == "T" ||
        letter == "R")
    {
        return 1;
    }
    
    else if(letter == "D" || letter == "G")
    {
        return 2;
    }

    else if(letter == "B" || letter == "C" || letter == "M" ||
        letter == "P")
    {
        return 3;
    }

    else if(letter == "F" || letter == "H" || letter == "V" ||
            letter == "W" || letter == "Y")
    {
        return 4;
    }

    else if(letter == "K")
    {
        return 5;
    }

    else if(letter == "J" || letter == "X")
    {
        return 8;
    }

    else if(letter == "Q" || letter == "Z")
    {
        return 10;
    }

    else if(letter == "_")
    {
        return 0;
    }

}


function resetPieces(){

    //create fresh set of 100 scrabble tiles

    // JSON structure learned from
    // Ramon Meza and Jason Downing
    var JSONData = {
        "pieces":[
            {"letter": "A", "amount":"9"},
            {"letter": "B", "amount":"2"},
            {"letter": "C", "amount":"2"},
            {"letter": "D", "amount":"4"},
            {"letter": "E", "amount":"12"},
            {"letter": "F", "amount":"2"},
            {"letter": "G", "amount":"3"},
            {"letter": "H", "amount":"2"},
            {"letter": "I", "amount":"9"},
            {"letter": "J", "amount":"1"},
            {"letter": "K", "amount":"1"},
            {"letter": "L", "amount":"4"},
            {"letter": "M", "amount":"2"},
            {"letter": "N", "amount":"6"},
            {"letter": "O", "amount":"8"},
            {"letter": "P", "amount":"2"},
            {"letter": "Q", "amount":"1"},
            {"letter": "R", "amount":"6"},
            {"letter": "S", "amount":"4"},
            {"letter": "T", "amount":"6"},
            {"letter": "U", "amount":"4"},
            {"letter": "V", "amount":"2"},
            {"letter": "W", "amount":"2"},
            {"letter": "X", "amount":"1"},
            {"letter": "Y", "amount":"2"},
            {"letter": "Z", "amount":"1"},
            {"letter": "_", "amount":"2"},
        ]
    };

    return JSONData;
}

// deals pieces to player's hand
function dealPieces(count){

    for(var k = 0; k < count; k++){

        var newLetter = drawTile();

        var newTile = document.createElement("li");

        $(newTile).addClass("scrabble-tile");

        $(newTile).attr('id', newLetter+"-tile");

        $(newTile).attr("letter", newLetter);

        var tileImg = document.createElement("img");

        $(tileImg).addClass("tile");

        if(newLetter == "_"){
            ("graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg");
        }

        else{
            tileImg.src = ("graphics_data/Scrabble_Tiles/Scrabble_Tile_"+ newLetter +".jpg");
        }

        newTile.appendChild(tileImg);

        $("#hand-row").append(newTile);

    }

    $(".scrabble-tile").draggable();

}

// draws a tile from the pile
function drawTile(){

    var chosenTile;

    var chosenLetter;

    //keep choosing until a valid tile is found
    while(true){

        // 'A' - '_'
        chosenLetter = Math.floor(Math.random() * 26);

        if(boardPieces.pieces[chosenLetter].amount > 0){

            boardPieces.pieces[chosenLetter].amount = (boardPieces.pieces[chosenLetter].amount - 1);

            chosenTile = boardPieces.pieces[chosenLetter].letter;

            return chosenTile;
        }
        
    }
}

//removes occupied tiles,
//adjusts total score
function submitMove(){

    var boardPlaces = $("#tile-row").children();

    var tilesPlaced = 0;

    for(var l = 0; l < boardPlaces.length; l++){
        
        if($(boardPlaces[l]).hasClass("filled")){

            $(boardPlaces[l]).css({
                "background-color":"red"
            });

            $(boardPlaces[l]).empty();

            $(boardPlaces[l]).addClass("empty");

            tilesPlaced++;
        }
    }

    //restore tiles in player's hand
    dealPieces(tilesPlaced);

    $("#scoreboard").text("SCORE: " + 0);

    totalScore += currScore;

    $("#total-scoreboard").text("Total Score: " + totalScore);
}

function redrawTiles(){

    //delete tiles in player's hand
    $("#hand-row").empty();

    //restore tiles in player's hand
    dealPieces(7);
}