const addNote=document.querySelector("#takeText");
const modalbox=document.querySelector(".modalBox");
const closeBtn=document.querySelector(".closeBtn");
const addBtn=document.querySelector(".addBtn");
const getTitle=document.querySelector(".getTitle");
const getDescription=document.querySelector(".getDescription")

addNote.addEventListener("click", () =>{
       modalbox.classList.add("show");
});
closeBtn.addEventListener("click", ()=>{ 
    modalbox.classList.remove("show");
})
addBtn.addEventListener("click", e=> {
    e.preventDefault();
    let title=getTitle.value;
    let desc=getDescription.value;
       if(title||desc){
       let notedetails={title:title,description:desc};
       const notes=[];
       notes.push(notedetails);
       localStorage.setItem("notes",JSON.stringify(notes));
       }
});