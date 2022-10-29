import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { subMinutes } from "date-fns";
import {logDOM} from "@testing-library/react";

const NOTES_URL =
  "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  notes: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  try {
    const response = await axios.get(NOTES_URL);
    return [...response.data];
  } catch (err) {
    return err.message;
  }
});

export const addNewNote = createAsyncThunk(
  "notes/addNewNote",
  async (initialState) => {
    try {
      const response = await axios.post(NOTES_URL, initialState);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (initialNote) => {
    const { id } = initialNote;
    try {
      const response = await axios.put(`${NOTES_URL}/${id}`, initialNote);
      return response.data;
    } catch (err) {
      //return err.message;
      return initialNote; // only for testing Redux!
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (initialNote) => {
    const { id } = initialNote;
    try {
      const response = await axios.delete(`${NOTES_URL}/${id}`);
      if (response?.status === 200) return initialNote;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: {
      reducer(state, action) {
        state.notes.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    addReaction: (state, action) => {
      const { noteId, reaction } = action.payload;
      const existingNote = state.notes.find((note) => note.id === noteId);
      if (existingNote) {
        existingNote.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        let loadedNotes = action.payload.map((note) => {
          note.date = subMinutes(new Date(), min++).toISOString();
          note.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };

          return note;
        });
        state.notes = state.notes.concat(loadedNotes);
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewNote.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete')
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const notes = state.notes.filter(note => note.id !== id);
        state.notes = [...notes, action.payload];
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Delete could not complete')
          return;
        }
        const { id } = action.payload;
        const notes = state.notes.filter(note => note.id !== id);
        state.notes = notes;
      })
  }
});

export const selectAllNotes = (state) => state.notes.notes;
export const getNotesStatus = (state) => state.notes.status;
export const getNotesError = (state) => state.notes.error;

export const selectNoteById = (state, noteId) =>
  state.notes.notes.find((note) => note.id === noteId);

export const { addNote, addReaction } = notesSlice.actions;

export default notesSlice.reducer;
