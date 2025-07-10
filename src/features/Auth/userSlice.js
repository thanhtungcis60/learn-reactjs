import userApi from 'api/userAPI';
import { createAsyncThunk } from '@reduxjs/toolkit';
import StorageKeys from 'constants/storage-keys';

const { createSlice } = require('@reduxjs/toolkit');

export const register = createAsyncThunk(
  'user/register', async (payload) => {
    //call api to register
    const data = await userApi.register(payload);

    //save data to localStorage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

    //return user data
    return data.user;
  },
)

export const login = createAsyncThunk(
  'user/register', async (payload) => {
    //call api to register
    const data = await userApi.login(payload);

    //save data to localStorage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

    //return user data
    return data.user;
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      //save user to state
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      //save user to state
      state.current = action.payload;
    },
  }
});

const { reducer } = userSlice;
export default reducer;