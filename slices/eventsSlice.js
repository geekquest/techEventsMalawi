import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  try {
    const response = await axios.get("https://techeventsmw.com/api/all/events");
    return response.data.events;
  } catch (error) {
    throw new Error("Failed to fetch events");
  }
});

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state, action) => {
        state.loading = true;
        state.error = null; // Reset error when fetching starts
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        // Update cache expiry on successful fetch (optional)
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Configure cache behavior (optional)
export const eventsApi = eventsSlice.actions;
export default eventsSlice.reducer;
