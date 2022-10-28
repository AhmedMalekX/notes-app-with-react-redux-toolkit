import { NoteAuthor } from "./NoteAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

export const NotesExcerpt = ({ note }) => {
  return (
    <article>
      <h3>{note.title}</h3>
      <p>{note.body.substring(0, 100)}</p>
      <p className="postCredit">
        <NoteAuthor userId={note.userId} />
        <TimeAgo timestamp={note.date} />
      </p>
      <div>
        <ReactionButtons note={note} />
      </div>
    </article>
  );
};
