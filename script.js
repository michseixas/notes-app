const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes"); //if there are notes stored, it will show them in the notesContainer
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

//create the note
createBtn.addEventListener("click", ()=>{
    let inputInbox = document.createElement("p");
    let img = document.createElement("img");
    inputInbox.className = "input-box";
    inputInbox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputInbox).appendChild(img);
})


//delete the note
notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");//which means, all the notes created
        notes.forEach(nt => { //loops through each of these input-box elements (notes) and assigns a function to their onkeyup event.
            nt.onkeyup = function(){ //The onkeyup event fires whenever a key is released after typing inside the input-box.
                updateStorage(); //each time a key is released (= typing),  the updateStorage() function is called again to store the content
            }
        })
    }
})

//linebreak for pressing EnterKey
document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();//prevents the creation of a new paragraph or any other default action associated with pressing “Enter”
    }
})

//The preventDefault() method is used here to ensure 
//that pressing “Enter” only inserts a line break, without 
//triggering any of the browser’s usual behaviors associated with 
//the “Enter” key. This is particularly useful when you want to control 
//the exact behavior of the “Enter” key within a content-editable area or 
//when you’re building a custom text editor.