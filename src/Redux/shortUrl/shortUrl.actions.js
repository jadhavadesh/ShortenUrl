import { createAsyncThunk } from '@reduxjs/toolkit';
import { shortUrlService } from '../../Services/shortUrl/shortUrl.service';

// Async Thunk Actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// shorten url Action
const shortenUrlAction = createAsyncThunk(
  'shortUrlSlice/shortenUrlAction', (url, { dispatch, rejectWithValue }) => {
    // dispatch(showHideLoader(true));
    return shortUrlService.shortenUrlService(url)
      .then((response) => {
        setTimeout(() => {
        //   dispatch(showHideLoader(false))
        }, 500)
        return response
      })
      .catch((error) => {
        setTimeout(() => {
        //   dispatch(showHideLoader(false))
        }, 500)
        return rejectWithValue(error?.response)
      })
  }
);

// get all urls action
const getAllUrlsAction = createAsyncThunk(
    'shortUrlSlice/getAllUrlsAction', ( _,{ dispatch, rejectWithValue }) => {
      // dispatch(showHideLoader(true));
      return shortUrlService.getAllUrlsService()
        .then((response) => {
          setTimeout(() => {
          //   dispatch(showHideLoader(false))
          }, 500)
          return response
        })
        .catch((error) => {
          setTimeout(() => {
          //   dispatch(showHideLoader(false))
          }, 500)
          return rejectWithValue(error?.response)
        })
    }
);

// update short code action
const updateShortCodeAction = createAsyncThunk(
    'shortUrlSlice/updateShortCodeAction', ( payload,{ dispatch, rejectWithValue }) => {
      // dispatch(showHideLoader(true));
      return shortUrlService.updateShortCodeService(payload)
        .then((response) => {
          setTimeout(() => {
          //   dispatch(showHideLoader(false))
          }, 500)
          return response
        })
        .catch((error) => {
          setTimeout(() => {
          //   dispatch(showHideLoader(false))
          }, 500)
          return rejectWithValue(error?.response)
        })
    }
);

// Export all auth actions
export const shortUrlActions = {
    shortenUrlAction,
    getAllUrlsAction,
    updateShortCodeAction
}

