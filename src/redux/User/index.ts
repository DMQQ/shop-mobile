import { createSlice } from "@reduxjs/toolkit";

interface CredentialsProps {
  name: string;
  surname: string;
  address: string;
  phone_number: string;
}

const User = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    token: "",
    name: "",
    user_id: -1,

    credentials: {
      name: "",
      surname: "",
      address: "",
      phone_number: "",
    },
  },
  reducers: {
    setLoggedIn(state) {
      state.isLoggedIn = true;
    },

    setCredentials(state, { payload }) {
      state.credentials.address = payload.address;
      state.credentials.name = payload.name;
      state.credentials.surname = payload.surname;
      state.credentials.phone_number = payload.phone_number;
    },

    setCredentialsKey(state, { payload }) {
      state.credentials[payload.key as keyof CredentialsProps] = payload.value;
    },
  },
});

export const userReducers = User.reducer;
export const userActions = User.actions;
