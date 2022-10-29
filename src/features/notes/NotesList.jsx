import { useSelector } from "react-redux";
import { selectNoteIds, getNotesStatus, getNotesError } from "./notesSlice";
import { NotesExcerpt } from "./NotesExcerpt";

export const NotesList = () => {
  const orderedNoteIds = useSelector(selectNoteIds);
  const notesStatus = useSelector(getNotesStatus);
  const notesError = useSelector(getNotesError);

  let content;
  if (notesStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (notesStatus === "succeeded") {
    content = orderedNoteIds.map((noteId) => (
      <NotesExcerpt key={noteId} noteId={noteId} />
    ));
  } else if (notesStatus === "failed") {
    content = <p>{notesError}</p>;
  }

  return <section>{content}</section>;
};
