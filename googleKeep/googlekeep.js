const addNote=document.querySelector("#takeText");
const modalBox=document.querySelector(".modalBox");
const tagTitle=document.querySelector(".getTitle");
const tagDescription=document.querySelector(".getDescription");
const closeBtn=modalBox.querySelector("#closeBtn");
let addBtn=modalBox.querySelector( "#addBtn");
// const getTitle=modalBox.querySelector("input");
// const getDescription=modalBox.querySelector("textarea")

const notes=JSON.parse(localStorage.getItem("notes") ||"[]");
let update= false,updateId;
addNote.addEventListener("click", (event) =>{
    event.preventDefault();
    tagTitle.focus();
       modalBox.classList.add("show");
});
window.onclick = function(e){
    if(e.target == modalBox){
        modalBox.classList.remove("show")
    }
};
closeBtn.addEventListener("click", () =>{ 
    update=false;
    tagTitle.value="";
    tagDescription.value="";
    addBtn.innerText= "add note";
    modalBox.classList.remove("show");
});
function displayNotes(){
    document.querySelectorAll(".note").forEach(note =>note.remove());
    notes.forEach((note,index)=> {
        let content=`<li class="note">
                            <div class="content"><h4>${note.title}</h4><p>${note.description}</p>
                            </div>
                            <div class="settings"><i onclick="showMenu(this)" class="fa-solid fa-ellipsis-vertical"></i>
                                <ul class="menu">
                                    <li onclick="editNotes(${index},'${note.title}', '${note.description}')"><i class="fa-solid fa-pencil"></i>edit</li>
                                    <li onclick="deleteNotes(${index})"><i class="fa-solid fa-trash"></i>delete</li>
                                </ul>
                            </div>
    </li>`
    addNote.insertAdjacentHTML("afterend",content);
    });
}
 displayNotes();
function showMenu(elem){
       elem.parentElement.classList.add("show");
       document.addEventListener("click",e => {
        if(e.target.tagName != "I"|| e.target !=elem){
            elem.parentElement.classList.remove("show");
        }
       });
}  

function deleteNotes(noteId){
     notes.splice(noteId,1);
     localStorage.setItem("notes",JSON.stringify(notes));
     displayNotes(); 
}

function editNotes(noteId,title,description){
    update= true;
    updateId=noteId;
    tagTitle.value=title;
    tagDescription.value=description;
    addNote.click();
    addBtn.innerText= "update";
}
addBtn.addEventListener("click", e => {
    e.preventDefault();
    
    let noteTitle=tagTitle.value;
    let desc=tagDescription.value;
    if(noteTitle || desc) {
       let noteDetails = {
               title:noteTitle,
                description:desc
        }
      if(!update){
        notes.push(noteDetails);
      }else{
        update=false;
        notes[updateId] = noteDetails;

      }
       
    //    console.log(noteDetails);
       localStorage.setItem("notes",JSON.stringify(notes));
       closeBtn.click();
       displayNotes();
       
    }
});