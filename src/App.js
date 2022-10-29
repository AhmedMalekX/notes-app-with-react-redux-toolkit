import "./App.css";
import { NotesList } from "./features/notes/NotesList";
import { AddNoteForm } from "./features/notes/AddNoteForm";
import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { SingleNotePage } from "./features/notes/SingleNotePage";
import { Header } from "./components/Header";
import {EditNoteForm} from "./features/notes/EditNoteForm";

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<NotesList />} />
        <Route path="note">
          <Route index element={<AddNoteForm />} />
          <Route path=":noteId" element={<SingleNotePage />} />
          <Route path="edit/:noteId" element={<EditNoteForm />} />
        </Route>
      </Routes>
    </>
  );
};
