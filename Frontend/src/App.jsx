import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  let [note, setNote] = useState([
    { title: "Despoahsef", description: "aiuposhdfasd" },
  ]);

  function getShit() {
    axios.get("http://localhost:3000/api/notes").then((dets) => {
      setNote(dets.data.note);
    });
  }

  useEffect(getShit, []);

  function handlePost(title, description) {
    axios
      .post("http://localhost:3000/api/notes", { title, description })
      .then(() => {
        getShit();
      });
  }

  function handleDelete(deleteId) {
    axios.delete(`http://localhost:3000/api/notes/${deleteId}`).then((res) => {
      getShit();
    });
  }

  return (
    <div className="sbkaBaap">
      <form
        onSubmit={(dets) => {
          dets.preventDefault();
          let title = dets.target[0].value;
          let description = dets.target[1].value;

          handlePost(title, description);
        }}
      >
        <input type="text" placeholder="enter the title" />
        <input type="text" placeholder="enter the description" />
        <button type="submit">submit</button>
      </form>
      <div className="notes">
        {note.map(function ({ title, description }, idx) {
          return (
            <div className="note" id={idx}>
              <h1>{title}</h1>
              <p>{description}</p>
              <button
                onClick={() => {
                  handleDelete(note[idx]._id);
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
