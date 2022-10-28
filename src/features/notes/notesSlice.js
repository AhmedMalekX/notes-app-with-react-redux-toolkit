import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { subMinutes } from "date-fns";

const NOTES_URL = "https://jsonplaceholder.typicode.com/posts";

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
        const loadedNotes = action.payload.map((note) => {
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
      });
  },
});

export const selectAllNotes = (state) => state.notes.notes;
export const getNotesStatus = (state) => state.notes.status;
export const getNotesError = (state) => state.notes.error;

export const { addNote, addReaction } = notesSlice.actions;

export default notesSlice.reducer;
