//get refrence 
const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
let database = firebase.database().ref() //getting the refrence point for my database

/**
 * Updates the database with the username and message.
 */
function updateDB(event){ //callback fuction for our button
    event.preventDefault();
    //extracting the value user types in tge textbox
    const username        = usernameElement.value;
    const message         = messageElement.value;
    //emptying the textbox after we press the button
    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    //data schema (structure) the way you want to organize your data
    //added new data into our database
    let value = {
        // 2 colums within each row
        NAME: username,
        MESSAGE: message,
    
    
    };

    database.push(value); //making the row 

}

// Set database "child_added" event listener here
database.on("child_added", addMessagetoBoard);

let messageContainer = document.querySelector(".allMessages")

function addMessagetoBoard(rowData){
    //extract the row data
    let row = rowData.val(); //return an object just like the object we pushed for value
    console.log(row);

    //this is the point where we start using the information from our database
    let name = row.NAME
    let sentence = row.MESSAGE;

    //add a new p tag to the page
    let newP = document.createElement("p");
    newP.innerText = name + ": " + sentence;
    
    messageContainer.appendChild(newP);



}



