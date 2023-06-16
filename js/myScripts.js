/*File: myScript.js

Assignment: Creating a multiplication table

Written by: Max Tighe, 
    Computer Science Student at UMass Lowell
    contact: max_tighe@student.uml.edu

Date created: 6/10/2023

Date updated: 6/16/2023

Description: A javascript program for table generation.
    The checkInput function verifies that each field
    has valid input and informing the user of required
    field corrections.
    The createTable function generates a table of numbers
    before converting them to an HTML table, which is
    then written and displayed to the file index.html.
*/


//verifies inputs before creating table
function checkInputs() {

    rsltMsg = document.getElementById("result-message");

    rsltMsg.textContent = "";

    oldTable = document.getElementById("mult-table-container").childNodes;

    for(var t = 0; t < oldTable.length; t++){
        oldTable[t].remove();
    }

    var hBegin = document.getElementById("hBeginMult").value;
    var hEnd = document.getElementById("hEndMult").value;
    var vBegin = document.getElementById("vBeginMult").value;
    var vEnd = document.getElementById("vEndMult").value;

    var msg = "";

    //every field must be filled
    // every field must have a number entered

    if(hBegin.length == 0){
        msg += "no input in horizontal begin field, ";
    }
    else if(isNaN(hBegin)){
        msg += "invalid input in horizontal begin field, ";
    }

    if(hEnd.length == 0){
        msg += "no input in horizontal end field, ";            
    }
    else if(isNaN(hEnd)){
        msg += "invalid input in horizontal end field, ";
    }

    if(vBegin.length == 0){
        msg += "no input in vertical begin field, ";            
    }
    else if(isNaN(vBegin)){
        msg += "invalid input in vertical begin field, ";
    }

    if(vEnd.length == 0){
        msg += "no input in vertical end field, ";            
    }
    else if(isNaN(vEnd)){
        msg += "invalid input in vertical end field, ";
    }

    // no begin input may be larger than their end inputs
    if( (!isNaN(hBegin) && !isNaN(hEnd) && hBegin > hEnd) ||  (!isNaN(vBegin) && !isNaN(vEnd) && vBegin > vEnd) ){
        
        if(hBegin > hEnd && vBegin > vEnd){
            msg += "horizontal and vertical fields' beginning inputs are \n" 
                    + "larger than their end inputs, ";            
        }
        else if(hBegin > hEnd && vBegin <= vEnd){
            msg += "horizontal field's beginning input is larger than the end input, ";            
        }
        else if(hBegin <= hEnd && vBegin > vEnd){
            msg += "vertical field's beginning input is larger than the end input, ";         
        }
    }


    if(msg != ""){
        msg += "please resolve these conflicts before submitting.";
        document.getElementById("errorMessage").textContent = msg;
        return;
    }
    else {
        rsltMsg.textContent = "result:";
        createTable(hBegin, hEnd, vBegin, vEnd);
    }


}

function createTable(hBegin, hEnd, vBegin, vEnd) {

    var rowSize = parseInt(hEnd-hBegin + 1); //horizontal mult
    var colSize = parseInt(vEnd-vBegin + 1); //vertical mult

    var multRow = Array(rowSize);
    var multCol = Array(colSize);

    for(var l = 0; l < rowSize; l++){
        multRow[l] = Number(Number(hBegin) + l);
    }

    for(var m = 0; m < colSize; m++){
        multCol[m] = Number(Number(vBegin) + m);
    }

    var fillVal = 0;

    // End MUST be larger than Begin
    var multMatrix = [...Array(rowSize)];

    for(var i = 0; i < multCol.length; i++){

        multMatrix[i] = [];

        for(var j = 0; j < multRow.length; j++){
            multMatrix[i][j] = multCol[i] * multRow[j];
        }
    }

    //actually creating the table
    var multTable = document.createElement("table");

    document.getElementById("mult-table-container").appendChild(multTable);
    multTable.style.margin = "auto";


    // first row, list multRow
    var tRow = multTable.insertRow();

    var tCell = tRow.insertCell();
    tCell.textContent = " ";
    tCell.style.fontWeight = 'bolder';
    tCell.style.backgroundColor = 'grey';

    for(var s = 0; s < rowSize; s++){
        var tCell = tRow.insertCell();
        tCell.textContent = multRow[s];
        tCell.style.fontWeight = 'bolder';
        tCell.style.backgroundColor = 'grey';
    }

    //creating rows
    for(var q = 0; q < colSize; q++){

        var tRow = multTable.insertRow();

        // mult number of the corresponding column
        var tCell = tRow.insertCell();
        tCell.textContent = multCol[q];
        tCell.style.fontWeight = 'bolder';
        tCell.style.backgroundColor = 'grey';


        //creating columns
        for(var r = 0; r < rowSize; r++){
            var tCell = tRow.insertCell();
            tCell.textContent = multMatrix[q][r];
        }

    }

}