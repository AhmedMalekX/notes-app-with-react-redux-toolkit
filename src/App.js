import "./App.css";
import { NotesList } from "./features/notes/NotesList";
import { AddNoteForm } from "./features/notes/AddNoteForm";
import { Layout } from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { SingleNotePage } from "./features/notes/SingleNotePage";
import { EditNoteForm } from "./features/notes/EditNoteForm";
import { UserPage } from "./features/users/UserPage";
import { UsersList } from "./features/users/UsersList";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NotesList />} />
        <Route path="note">
          <Route index element={<AddNoteForm />} />
          <Route path=":noteId" element={<SingleNotePage />} />
          <Route path="edit/:noteId" element={<EditNoteForm />} />
        </Route>
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
