import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../users/usersSlice";
import { deleteNote, selectNoteById, updateNote } from "./notesSlice";

export const EditNoteForm = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const note = useSelector((state) => selectNoteById(state, Number(noteId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.body);
  const [userId, setUserId] = useState(note?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  if (!note) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updateNote({
            id: note.id,
            title,
            body: content,
            userId,
            reactions: note.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/note/${noteId}`);
      } catch (err) {
        console.error("Failed to save the note", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = async () => {
    try {
      setRequestStatus("pending");
      await dispatch(deleteNote({ id: note.id })).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the note", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="noteTitle">Post Title:</label>
        <input
          type="text"
          id="noteTitle"
          name="noteTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="noteAuthor">Author:</label>
        <select id="noteAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="noteContent">Content:</label>
        <textarea
          id="noteContent"
          name="noteContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button
          className="deleteButton"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};
