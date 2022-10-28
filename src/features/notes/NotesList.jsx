import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllNotes,
  getNotesStatus,
  getNotesError,
  fetchNotes,
} from "./notesSlice";
import { NotesExcerpt } from "./NotesExcerpt";

export const NotesList = () => {
  const dispatch = useDispatch();

  const notes = useSelector(selectAllNotes);
  const notesStatus = useSelector(getNotesStatus);
  const notesError = useSelector(getNotesError);

  useEffect(() => {
    if (notesStatus === "idle") {
      dispatch(fetchNotes());
    }
  }, [notesStatus, dispatch]);

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

  return (
    <section>
      <h2>Notes</h2>
      {content}
    </section>
  );
};
