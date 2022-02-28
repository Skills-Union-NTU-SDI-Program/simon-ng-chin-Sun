//set global variables
var displayTaskCreate = document.getElementById('displayTaskCreate');
var pdf = document.getElementById('displayPDF');
var myTaskForm = document.getElementById("myTaskForm");
//set array off tsks - fixed DB
let taskDB = [{ title: 'Economcis Test', datetime:'19/2/2022 4:00 PM', level: 'Priority' }];
// append task db to html
var getRow = document.getElementById("taskTable").rows.length;

taskDB.forEach(element => {
    //append existing data to table task
    //https://www.w3schools.com/jsref/met_table_insertrow.asp (source)
    
    var tableTask = document.getElementById("taskTable");
    var row = tableTask.insertRow(getRow);
    var cell_title = row.insertCell(0);
    var cell_date = row.insertCell(1);
    var cell_lvl = row.insertCell(2);
    var cell_btn = row.insertCell(3);
    cell_btn.className = 'text-right';

    cell_title.innerHTML = element['title'];
    cell_date.innerHTML = element['datetime'];
    cell_lvl.innerHTML = element['level'];
    cell_btn.innerHTML = `<button onclick="deleteTask(this)">Delete</button>`; //set html button using string
});
//insert pdf for display under grid information - block to display and none to hide the task grid 

function openPDF(pdfSrc) {
    pdf.style.display = 'block';
    displayTaskCreate.style.display = 'none';
    document.getElementById('embedPDF').src = pdfSrc;
}

function openCreateTask() {
    event.preventDefault();
    displayTaskCreate.style.display = 'block';
    pdf.style.display = 'none';
}
// prevent page from refreshing the page - critical function for form
function createTask() {
    event.preventDefault();
    var getTitle = myTaskForm.elements.item(0).value;
    var getDateDue = myTaskForm.elements.item(1).value;
    var getLevel = myTaskForm.elements.item(2).value;

    //form validation - link to popup box
    if (getTitle == "" && getDateDue == "" && getLevel == "") {
        alert( "Please enter task detail!" );
        myTaskForm.elements.item(0).focus() ;
        return false;
    }else if( getTitle == "" ) {
        alert( "Please provide task title!" );
        myTaskForm.elements.item(0).focus() ;
        return false;
    }else if (getDateDue == "") {
        alert( "Please provide date & time!" );
        myTaskForm.elements.item(1).focus() ;
        return false;
    }else if (getLevel == "") {
        alert( "Please provide level!" );
        myTaskForm.elements.item(2).focus() ;
        return false;
    }else{
        createForm(getTitle, getDateDue, getLevel);
    }
}

function createForm(formTitle, formDateTime, formLevel) {
    //append new data to task table
    var tableTask = document.getElementById("taskTable");
    var row = tableTask.insertRow(getRow);
    var cell_title = row.insertCell(0);
    var cell_date = row.insertCell(1);
    var cell_lvl = row.insertCell(2);
    var cell_btn = row.insertCell(3);
    cell_btn.className = 'text-right';//dom

    cell_title.innerHTML = formTitle;

    //convert date & time
    var date = new Date(formDateTime);
    const d = date.toLocaleDateString(); //convert date to d/m/y

    const timeString12hr = new Date(formDateTime).toLocaleTimeString('en-US', {hour12:true,hour:'numeric',minute:'numeric'});
    
    const newDateTime = d+' '+timeString12hr;
    cell_date.innerHTML = newDateTime;

    cell_lvl.innerHTML = formLevel;
    cell_btn.innerHTML = `<button onclick="deleteTask(this)">Delete</button>`;

    //add new data entry to existing data array
    const newDB = [{ title: formTitle, datetime: newDateTime, level: formLevel }];
    taskDB = [ ...newDB, ...taskDB];
    
    //close & reset form
    displayTaskCreate.style.display = 'none';
    myTaskForm.reset();
}

function deleteTask(getRow) {
    event.preventDefault();
    displayTaskCreate.style.display = 'none';

    alert('Confirm to delete task?');
    var i = getRow.parentNode.parentNode.rowIndex; //get current index of row
    document.getElementById('taskTable').deleteRow(i) //remove from table html

    taskDB.splice(i-1, 1);//remove from array
}

//for menu
function getNav(getID) {
    if (getID == 'navHome') {
        document.getElementById('myTask').style.display = 'block';
        document.getElementById('myInfo').style.display = 'block';
    } else if(getID == 'navTask') {
        document.getElementById('myTask').style.display = 'block';
        document.getElementById('myInfo').style.display = 'none';
        pdf.style.display = 'none';
    } else if (getID == 'navInfo') {
        document.getElementById('myInfo').style.display = 'block';
        document.getElementById('myTask').style.display = 'none';        
        displayTaskCreate.style.display = 'none';
    }
}