import { createSlice, nanoid } from "@reduxjs/toolkit";
import { subMinutes } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Hello world",
    content: "Hello world from ReactJs",
    date: subMinutes(new Date(), 10).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Hello There",
    content: "Hello There from ReactJs",
    date: subMinutes(new Date(), 5).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: {
      reducer(state, action) {
        state.push(action.payload);
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
      const existingNote = state.find((note) => note.id === noteId);
      if (existingNote) {
        existingNote.reactions[reaction]++;
      }
    },
  },
});

export const selectAllNotes = (state) => state.notes;

export const { addNote, addReaction } = notesSlice.actions;

export default notesSlice.reducer;
