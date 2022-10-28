import { useSelector } from "react-redux";
import { selectAllNotes } from "./notesSlice";
import { NoteAuthor } from "./NoteAuthor";
import { TimeAgo } from "./TimeAgo";
import {ReactionButtons} from "./ReactionButtons";

export const NotesList = () => {
  const notes = useSelector(selectAllNotes);

  const orderedNotes = notes
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedNotes = orderedNotes.map((note) => (
    <article key={note.id}>
      <h3>{note.title}</h3>
      <p>{note.content.substring(0, 100)}</p>
      <p className="postCredit">
        <NoteAuthor userId={note.userId} />
        <TimeAgo timestamp={note.date} />
      </p>
      <div>
        <ReactionButtons note={note} />
      </div>
    </article>
  ));

  return (
    <section>
      <h2>Notes</h2>
      {renderedNotes}
    </section>
  );
};
