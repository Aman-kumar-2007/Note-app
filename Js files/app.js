const addNoteBtn = document.getElementById("addnotebtn");
if (addNoteBtn) {

    addNoteBtn.addEventListener("click", () => {
        const title = document.getElementById("tittleArea").value;
        const content = document.getElementById("notesArea").value;

        if (title.trim() === "" || content.trim() === "") {
            alert("Fill all fields");
            return;
        }

        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        const selectedIndex = localStorage.getItem("selectedNote");

        const note = {
            title: title,
            content: content,
            date: new Date().toLocaleString()
        };

        if (selectedIndex !== null) {
            notes[selectedIndex] = note;
            localStorage.removeItem("selectedNote");
        } else {
            notes.push(note);
        }

        localStorage.setItem("notes", JSON.stringify(notes));

        window.location.href = "dashboard.html";
    });

}




const notesContainer = document.getElementById("dashboard-notesArea");

if (notesContainer) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
      <div class="note">
        <div class="note-top">
          <div class="note-info">
            <p class="note-topic">Work</p>
            <h2>${note.title}</h2>
          </div>
          <div class="note-top-btn">
            <button onclick="deleteNote(${index})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="note-bottom">
          <p>${note.date}</p>
           <button onclick = "editNode(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
      </div>
    `;

        div.classList.add("noteBlock");

        notesContainer.appendChild(div);
    });
}


function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    location.reload();
}


const search = document.getElementById("searchBox");

if (search) {
    search.addEventListener("input", () => {
        let searchVal = search.value.toLowerCase();

        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        const filtered = notes.filter(note =>
            note.title.toLowerCase().includes(searchVal) ||
            note.content.toLowerCase().includes(searchVal)
        );

        displayNotes(filtered);
    });
}

function displayNotes(notesArray) {
    const notesContainer = document.getElementById("dashboard-notesArea");

    notesContainer.innerHTML = "";

    notesArray.forEach((note, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
      <div class="note">
        <div class="note-top">
          <div class="note-info">
            <p class="note-topic">Work</p>
            <h2>${note.title}</h2>
          </div>
          <div class="note-top-btn">
            <button onclick="deleteNote(${index})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="note-bottom">
          <p>${note.date}</p>
           <button><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
      </div>
    `;

        div.classList.add("noteBlock");

        notesContainer.appendChild(div);
    });
}

function editNode(index) {
    localStorage.setItem("selectedNote", index);
    window.location.href = "note.html";
}

if (addNoteBtn) {
    const selectedIndex = localStorage.getItem("selectedNote");
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    if (selectedIndex !== null) {
        const note = notes[selectedIndex];

        document.getElementById("tittleArea").value = note.title;
        document.getElementById("notesArea").value = note.content;
    }

}

