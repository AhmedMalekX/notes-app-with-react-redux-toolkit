import { useSelector } from "react-redux";
import { selectAllNotes, getNotesStatus, getNotesError } from "./notesSlice";
import { NotesExcerpt } from "./NotesExcerpt";

export const NotesList = () => {
  const notes = useSelector(selectAllNotes);
  const notesStatus = useSelector(getNotesStatus);
  const notesError = useSelector(getNotesError);

  let content;
  if (notesStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (notesStatus === "succeeded") {
    const orderedNotes = notes
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedNotes.map((note) => (
      <NotesExcerpt key={note.id} note={note} />
    ));
  } else if (notesStatus === "failed") {
    content = <p>{notesError}</p>;
  }

  return <section>{content}</section>;
};
