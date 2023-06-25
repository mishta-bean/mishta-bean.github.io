/*File: myScript.js

Assignment: HW4 Part 2, adding jQuery sliders and tabs

Written by: Max Tighe, 
    Computer Science Student at UMass Lowell
    contact: max_tighe@student.uml.edu

Date created: 6/10/2023

Date updated: 6/24/2023

Description: A javascript program for table generation.
    The checkInput function verifies that each field
    has valid input and informing the user of required
    field corrections.
    The createTable function generates a table of numbers
    before converting them to an HTML table, which is
    then written and displayed to the file index.html.

    This has been updated to utilize jQuery's Input Validation
    plugin for input sanitization, as well as Jquery's slider
    and tab widgets.

    jQuery's Input Validation plugin can be found here:
    https://jqueryvalidation.org/

    jQuery's UI library can be found here:
    https://cdnjs.com/libraries/jqueryui

*/


//is called on page load, gets jQuery stuff ready
function init(){

    /* custom jquery method to check if begin field
    is smaller than the end field.
    Code is inspired by:
    https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
    */
    
    $.validator.addMethod("lessThan",
    function (value, element, param) {
        var endVal = document.getElementById(param).value;
        return value < endVal;
    }, "Begin field must be less than end field.");


    //horizontal begin slider and field
    $('#horiz-slider-begin').slider({
        value: $("#hBeginMult").value,
        max:99, min:-99,
    });

    $('#horiz-slider-begin').on('slide', 
        function(event, ui) {
            $("#hBeginMult").attr('value', (ui.value));
            $("#hBeginMult").prop('value', (ui.value));
            document.getElementById("hBeginMult").value = $('#horiz-slider-begin').slider('option', 'value');
            checkInputs();
        },
    );
    $('#hBeginMult').change(
        function(event, ui){
            $('#horiz-slider-begin').slider('value', $(this).val());
            checkInputs();
        }
    );

    //horizontal end slider and field
    $('#horiz-slider-end').slider({
        value: $("#hEndMult").value,
        max:99, min:-99,
    });

    $('#horiz-slider-end').on('slide', 
        function(event, ui) {
            $("#hEndMult").attr('value', (ui.value));
            $("#hEndMult").prop('value', (ui.value));
            checkInputs();
        },
    );
    $('#hEndMult').change(
        function(event, ui){
            $('#horiz-slider-end').slider('value', $(this).val());
            checkInputs();
        }
    );

    //vertical begin slider and field
    $('#vert-slider-begin').slider({
        value: $("#vBeginMult").value,
        max:99, min:-99,
    });

    $('#vert-slider-begin').on('slide', 
        function(event, ui) {
            $("#vBeginMult").attr('value', (ui.value));
            $("#vBeginMult").prop('value', (ui.value));
            checkInputs();
        },
    );
    $('#vBeginMult').change(
        function(event, ui){
            $('#vert-slider-begin').slider('value', $(this).val());
            checkInputs();
        }
    );

    //vertical end slider and field
    $('#vert-slider-end').slider({
        value: $("#vEndMult").value,
        max:99, min:-99,
    });

    $('#vert-slider-end').on('slide', 
        function(event, ui) {
            $("#vEndMult").attr('value', (ui.value));
            $("#vEndMult").prop('value', (ui.value));
            checkInputs();
        },
    );
    $('#vEndMult').change(
        function(event, ui){
            $('#vert-slider-end').slider('value', $(this).val());
            checkInputs();
        }
    );
}


//verifies inputs before creating table
function checkInputs() {

    rsltMsg = document.getElementById("result-message");

    rsltMsg.textContent = "";

    oldTable = document.getElementById("mult-table-container").childNodes;

    for(var t = 0; t < oldTable.length; t++){
        oldTable[t].remove();
    }

    var hBegin = +document.getElementById("hBeginMult").value;
    var hEnd = +document.getElementById("hEndMult").value;
    var vBegin = +document.getElementById("vBeginMult").value;
    var vEnd = +document.getElementById("vEndMult").value;

    var msg = "";

    // check inputs
    $("#multInputs").validate();

    var validInputs = true;
    
    /* go through each input field and check if they were valid.
       code is based on approaches listed in:
    */ https://stackoverflow.com/questions/18907198/jquery-make-sure-all-form-fields-are-filled
    $('#multInputs').each(function(){
        if( $(this).valid() == false){
            validInputs = false;
        }
    });


    if(validInputs == true){

        /* for an unknown reason, the begin field will reset its value,
            but not its displayed value, causing invalid inputs to go through
            once the user is warned for the first time.
            This if statement prevents that loophole from occuring. */
        if( (hBegin < hEnd) && (vBegin < vEnd) ){
            rsltMsg.textContent = "result:";
            document.getElementById("errorMessage").textContent = "";
            createTable(hBegin, hEnd, vBegin, vEnd);

            document.getElementById("saveBtn").disabled = false;
        }
        else { 
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
            msg += "Please resolve all conflicts before submitting.";
            document.getElementById("errorMessage").textContent = msg;
            document.getElementById("saveBtn").disabled = true;
        }
    }

    else {
        msg += "Please resolve all conflicts before submitting.";
        document.getElementById("errorMessage").textContent = msg;
        document.getElementById("saveBtn").disabled = true;
        return;
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

// saves the table into its own jQuery tab
function save(){

    var hBegin = +document.getElementById("hBeginMult").value;
    var hEnd = +document.getElementById("hEndMult").value;
    var vBegin = +document.getElementById("vBeginMult").value;
    var vEnd = +document.getElementById("vEndMult").value;

    //save the HTML table
    table = document.getElementById("mult-table-container");


    //html object duplication was learned from:
    // https://www.w3schools.com/jsref/met_node_clonenode.asp
    saveTable = table.cloneNode(true);


    tabList = document.getElementsByTagName("ul");

    newListing = document.createElement('li');

    newRef = document.createElement("a");

    var x = tabList[0].getElementsByTagName("li").length;

    newRef.href = "#tab" + x;

    newRef.textContent = hBegin + " x " + hEnd + ", " + vBegin + " x " + vEnd;

    newListing.appendChild(newRef);

    //buttons for selection/deletion
    closeBtn = document.createElement("button");
    closeBtn.className = "closeButton";
    closeBtn.type = "button";
    closeBtn.textContent = "X";
    closeBtn.setAttribute('onclick', "deleteTab(this)");

    checkBtn = document.createElement("input");
    checkBtn.className = "checkButton";
    checkBtn.id = "check";
    checkBtn.type = "checkbox";
    checkBtn.onclick = "selectTab(this)";

    newListing.appendChild(checkBtn);
    newListing.appendChild(closeBtn);
    
    tabList[0].appendChild(newListing);

    tabMult = document.createElement("div");

    tabMult.id = "tab" + x;

    tabMult.setAttribute("tabindex", x);

    tabMult.appendChild(saveTable);

    savedTabs = document.getElementById("saved-tables");

    savedTabs.append(tabMult);

    $("#saved-tables").tabs({
        unselected: true
    });

    $("#saved-tables").tabs("refresh");

    return;
}

//selects a tab for deletion of multiple tables
function selectTab(target){
    if(target.checked == true){
        target.checked == false;
    }
    else{
        target.checked == true;
    }
}


// deletes single tab
function deleteTab(target){

    // if the target is the close button
    if(target.className == "closeButton"){

        targDiv = target.parentNode.getAttribute("aria-controls");

        //deletes table associated with tab
        $("#"+targDiv).remove();

        //deletes tab itself
        $(target.parentNode).remove();

        $("#saved-tables").tabs("refresh");
    }

    // if the target is part of multiple deletion
    else{
        targDiv = target.getAttribute("aria-controls");

        //deletes table associated with tab
        $("#"+targDiv).remove();

        //deletes tab itself
        $(target).remove();

        $("#saved-tables").tabs("refresh");
    }
}


// deletes multiple tabs at once.
// currently malfunctions heavily
function deleteMultTabs(){

    var elementsList = document.getElementsByTagName("li");

    // search for tabs marked for deletion
    // if a checked is found to be true, the tab is deleted
    for(var i = 0; i < elementsList.length; i++){
        
        var check = elementsList[i].getElementsByClassName("checkButton");

        if(check[0].checked){
            deleteTab(elementsList[i]);
        }
    }
}