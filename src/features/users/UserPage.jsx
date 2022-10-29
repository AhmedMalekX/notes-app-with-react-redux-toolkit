import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import {selectAllNotes, selectNotesByUser} from "../notes/notesSlice";
import { Link, useParams } from "react-router-dom";

export const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const notesForUser = useSelector((state) =>
    selectNotesByUser(state, Number(userId))
  );

  const noteTitles = notesForUser.map((note) => (
    <li key={note.id}>
      <Link to={`/note/${note.id}`}>{note.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{noteTitles}</ol>
    </section>
  );
};
