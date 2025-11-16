import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const submitBooking = createAsyncThunk('booking/submit', async (payload) => {
  // Simulate server submit
  await new Promise((res) => setTimeout(res, 800));
  // Return saved booking
  return { id: Date.now(), ...payload };
});

const slice = createSlice({
  name: 'booking',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    bookingStatus: 'created'
  },
  reducers: {
    advanceStatus: (state) => {
      const order = ['created', 'processing', 'confirmed', 'ticketed'];
      const i = order.indexOf(state.bookingStatus);
      state.bookingStatus = order[Math.min(i + 1, order.length - 1)];
    },
    resetStatus: (state) => {
      state.bookingStatus = 'created';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBooking.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(submitBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(submitBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Submission failed';
      });
  }
});

export const { advanceStatus, resetStatus } = slice.actions;
export default slice.reducer;
