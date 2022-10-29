import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { subMinutes } from "date-fns";

const NOTES_URL = "https://jsonplaceholder.typicode.com/posts";

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = notesAdapter.getInitialState({
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
  count: 0,
});

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
    addReaction: (state, action) => {
      const { noteId, reaction } = action.payload;
      const existingNote = state.entities[noteId];
      if (existingNote) {
        existingNote.reactions[reaction]++;
      }
    },
    increaseCount: (state, action) => {
      state.count = state.count + 1;
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
        // state.notes = state.notes.concat(loadedNotes);
        notesAdapter.upsertMany(state, loadedNotes);
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
        // state.notes.push(action.payload);
        notesAdapter.addOne(state, action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          return;
        }
        // const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        // const notes = state.notes.filter((note) => note.id !== id);
        // state.notes = [...notes, action.payload];
        notesAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          return;
        }
        const { id } = action.payload;
        // const notes = state.notes.filter((note) => note.id !== id);
        // state.notes = notes;
        notesAdapter.removeOne(state, id);
      });
  },
});

// export const selectAllNotes = (state) => state.notes.notes;
export const getNotesStatus = (state) => state.notes.status;
export const getNotesError = (state) => state.notes.error;
export const getCount = (state) => state.notes.count;

// export const selectNoteById = (state, noteId) =>
//   state.notes.notes.find((note) => note.id === noteId);

export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
} = notesAdapter.getSelectors((state) => state.notes);

export const selectNotesByUser = createSelector(
  [selectAllNotes, (state, userId) => userId],
  (notes, userId) => notes.filter((note) => note.userId === userId)
);

export const { increaseCount, addReaction } = notesSlice.actions;

export default notesSlice.reducer;
