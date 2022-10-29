import { NoteAuthor } from "./NoteAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesSlice";

export const NotesExcerpt = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));
  return (
    <article>
      <h2>{note.title}</h2>
      <p className="excerpt">{note.body.substring(0, 75)}</p>
      <p className="postCredit">
        <Link to={`note/${note.id}`}>View Note</Link>
        <NoteAuthor userId={note.userId} />
        <TimeAgo timestamp={note.date} />
      </p>
      <div>
        <ReactionButtons note={note} />
      </div>
    </article>
  );
};
