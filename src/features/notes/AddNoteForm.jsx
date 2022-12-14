import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewNote } from "./notesSlice";
import { selectAllUsers } from "../users/usersSlice";

export const AddNoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSaveNoteClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewNote({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate('/')
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

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
