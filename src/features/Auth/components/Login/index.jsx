import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';
import { login } from 'features/Auth/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

Login.propTypes = {
    closeDialog: PropTypes.func,
};


function Login(props) {
    const { closeDialog } = props;
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            const action = login(values); // Giả định 'register' là một createAsyncThunk hoặc một action creator khác
            const resultAction = await dispatch(action);// Gọi action để đăng nhập
            // unwrapResult chỉ có sẵn nếu 'action' là một createAsyncThunk action
            // import { unwrapResult } from '@reduxjs/toolkit'; 
            const user = unwrapResult(resultAction);

            enqueueSnackbar('Login successfully!', { variant: 'success', autoHideDuration: 3000 });
            if (closeDialog) {
                closeDialog(); // Đóng dialog nếu có
            }

        } catch (error) {
            console.log('Failed to register:', JSON.stringify(error));
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 5000 });
        }
    };
    return (
        <div>
            <LoginForm onSubmit={handleSubmit}></LoginForm>
        </div>
    );
}

export default Login;