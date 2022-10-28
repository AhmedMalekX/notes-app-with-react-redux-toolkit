import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNote } from "./notesSlice";
import { selectAllUsers } from "../users/usersSlice";

export const AddNoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const onSaveNoteClicked = () => {
    if (title && content && userId) {
      dispatch(addNote(title, content, userId));

      setTitle("");
      setContent("");
      setUserId("");
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add New Note</h2>
      <form>
        <label htmlFor="noteTitle">Note Title:</label>
        <input
          type="text"
          id="noteTitle"
          name="noteTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="noteContent">Note Content:</label>
        <input
          type="text"
          id="noteContent"
          name="noteContent"
          value={content}
          onChange={onContentChanged}
        />

        <label htmlFor="noteAuthor">Note Author:</label>
        <select id="noteAuthor" onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>

        <button type="button" onClick={onSaveNoteClicked} disabled={!canSave}>
          Add Note
        </button>
      </form>
    </section>
  );
};
