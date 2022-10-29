import { useSelector } from "react-redux";
import { selectNoteById } from "./notesSlice";
import { NoteAuthor } from "./NoteAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { useParams, Link } from "react-router-dom";

export const SingleNotePage = () => {
  const { noteId } = useParams();
  const note = useSelector((state) => selectNoteById(state, Number(noteId)));

  if (!note) {
    return (
      <section>
        <h2>Page Not Found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h3>{note.title}</h3>
      <p>{note.body.substring(0, 100)}</p>
      <p className="postCredit">
        <Link to={`/note/edit/${note.id}`}>Edit Note</Link>
        <NoteAuthor userId={note.userId} />
        <TimeAgo timestamp={note.date} />
      </p>
      <div>
        <ReactionButtons note={note} />
      </div>
    </article>
  );
};
