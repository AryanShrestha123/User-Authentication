import { useState, useEffect } from "react";
import api from "../api";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data); console.log(data); })
            .catch((err) => {
                console.log(err.response?.data);
                alert(JSON.stringify(err.response?.data));
            });
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Note deleted successfully");
            else alert("Failed to delete note");
            getNotes();
        }).catch((err) => {
            console.log(err.response?.data);
            alert(JSON.stringify(err.response?.data));
        });
    }

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", { content, title }).then((res) => {
            if (res.status === 201) alert("Note created successfully");
            else alert("Failed to create note");
            getNotes();
        }).catch((err) => {
            console.log(err.response?.data);
            alert(JSON.stringify(err.response?.data));
        });
    }

 return <div>
    <div>
        <h2>Notes</h2>

    </div>
    <h2>Create Note</h2>
    <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
        <br />

        <label htmlFor="content">Content:</label>
        <textarea
            placeholder="Content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
        />
        <br />
        <button type="submit">Create Note</button>
    </form>
 </div>
}

export default Home;