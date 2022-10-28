import "./App.css";
import { NotesList } from "./features/notes/NotesList";
import { AddNoteForm } from "./features/notes/AddNoteForm";

export const App = () => {
  return (
    <main className="App">
      <AddNoteForm />
      <NotesList />
    </main>
  );
};
