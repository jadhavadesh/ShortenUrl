import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shortUrlActions } from './shortUrl.actions'

// User Token

const shortUrlSlice = createSlice({
    name: "shortUrl",
    initialState: {
        success: false,
        error: "",
        shortenUrl: "",
        allUrls: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // -------- cases of get all urls api data -------
            .addCase(shortUrlActions.getAllUrlsAction.pending, (state, action) => {
                state.allUrls = [];
                state.error = "";
                state.success = false;
            })
            .addCase(shortUrlActions.getAllUrlsAction.fulfilled, (state, action) => {
                if (action.payload.data.status === 200) {
                    state.allUrls = action.payload.data.urls
                    state.success = true;
                    state.error = "";
                } else {
                    state.allUrls = [];
                    state.success = false;
                    state.error = "Unable to get all short urls.";
                }
            })
            .addCase(shortUrlActions.getAllUrlsAction.rejected, (state, action) => {
                state.allUrls = [];
                state.success = false;
                state.error = action?.payload?.data?.message;
            })

            // -------- cases of shorten url api data -------
            .addCase(shortUrlActions.shortenUrlAction.pending, (state, action) => {
                state.shortenUrl = ''
                state.error = "";
                state.success = false;
            })
            .addCase(shortUrlActions.shortenUrlAction.fulfilled, (state, action) => {
                if (action.payload.data.status === 200) {
                    state.shortenUrl = action.payload.data.url
                    state.success = true;
                    state.error = "";
                } else {
                    state.shortenUrl = '';
                    state.success = false;
                    state.error = "Unable to short url.";
                }
            })
            .addCase(shortUrlActions.shortenUrlAction.rejected, (state, action) => {
                state.shortenUrl = '';
                state.success = false;
                state.error = action?.payload?.data?.message;
            })
    },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export default shortUrlSlice.reducer;
