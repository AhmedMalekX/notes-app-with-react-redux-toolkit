import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "../features/notes/notesSlice";
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    notes: notesSlice,
    users: usersSlice,
  },
});
