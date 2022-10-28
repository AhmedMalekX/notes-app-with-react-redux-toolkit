import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Test User" },
  { id: "1", name: "Test Admin" },
  { id: "2", name: "Test Moderator" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
