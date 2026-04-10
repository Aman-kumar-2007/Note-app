const addNoteBtn = document.getElementById("addnotebtn");
if (addNoteBtn) {
    addNoteBtn.addEventListener("click", () => {
        const title = document.getElementById("tittleArea").value;
        const content = document.getElementById("notesArea").value;

        if (title === "" || content === "") {
            alert("Fill all fields");
            return;
        }

        const note = {
            title: title,
            content: content,
            date: new Date().toLocaleString()
        };

        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        window.location.href = "dashboard.html";

    });

}

    const notesContainer = document.getElementById("dashboard-notesArea");
    
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    
    notes.forEach((note , index) => {
        const div = document.createElement("div");
    
    
        div.innerHTML = `
             <div class="note-top">
                    <div class="note-info">
                        <p id="note-topic">Work</p>
                        <h2>${note.title}</h2>
                    </div>
                    <div class="note-top-btn">
                        <button onclick = "deleteNote(${index})"><i class="fa-solid fa-trash"></i></button>
                    </div>
             </div>
    
                <div class="note-bottom">
                    <p>${note.date}</p>
                </div>
      `;
        div.classList.add("note");
    
        notesContainer.appendChild(div);
    });


function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    location.reload();
}


// const search = document.getElementById("searchBox");

// search.addEventListener("input", ()=>{
//     let searchVal = search.value;

//     const filtered = notes.filter(note =>
//     note.title.toLowerCase().includes(value) ||
//     note.content.toLowerCase().includes(value)
//   );

//   displayNotes(filtered);

// })