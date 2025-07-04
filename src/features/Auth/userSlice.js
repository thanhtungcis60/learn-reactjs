import userApi from 'api/userAPI';
import { createAsyncThunk } from '../../../node_modules/@reduxjs/toolkit/dist/createAsyncThunk';

const { createSlice } = require('@reduxjs/toolkit');

const register = createAsyncThunk(
  'user/register',
  async (payload) => {
    //call api to register
    const data = await userApi.register(payload);

    //save data to localStorage
    localStorage.setItem('access_toke', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));

    //return user data
    return data.user;
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      //save user to state
      state.current = action.payload;
    },
  }
});

const { reducer } = userSlice;
export default reducer;