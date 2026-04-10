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

notes.forEach((note, index) => {
    const a = document.createElement("a");

    a.innerHTML = `
        <div class = "note">
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
          </div>      
      `;
    a.href = "/note.html";
    a.style.textDecoration = "none";
    a.id = 'noteBlock';
    notesContainer.appendChild(a);
});


function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    location.reload();
}


const search = document.getElementById("searchBox");

search.addEventListener("input", () => {
    let searchVal = search.value;
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(searchVal) ||
        note.content.toLowerCase().includes(searchVal)
    );

    displayNotes(filtered);

})

function displayNotes(notesArray) {
    const notesContainer = document.getElementById("dashboard-notesArea");

    notesContainer.innerHTML = "";

    notesArray.forEach((note, index) => {
        const a = document.createElement("a");

        a.innerHTML = `
        <div class = "note">
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
          </div>      
      `;
        a.href = "/note.html";
        a.style.textDecoration = "none";
        a.id = 'noteBlock';
        notesContainer.appendChild(a);
    });
}

// displayNotes(notes);

// document.addEventListener("DOMContentLoaded", () => {
//   let notes = JSON.parse(localStorage.getItem("notes") || "[]");
//   displayNotes(notes);
// });

const noteBlock = document.getElementById("noteBlock");

noteBlock.addEventListener("click", () => {
    window.location.href = "note.html";

    const title = document.getElementById("tittleArea").value;
    const content = document.getElementById("notesArea").value;

    console.log(title);
})