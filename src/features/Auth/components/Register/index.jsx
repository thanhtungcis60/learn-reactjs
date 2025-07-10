import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import { register } from 'features/Auth/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

RegisterForm.propTypes = {
    closeDialog: PropTypes.func,
};


function Register(props) {
    const { closeDialog } = props;
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            // auto set username = email
            values.username = values.email;

            const action = register(values); // Giả định 'register' là một createAsyncThunk hoặc một action creator khác
            const resultAction = await dispatch(action);
            // unwrapResult chỉ có sẵn nếu 'action' là một createAsyncThunk action
            // import { unwrapResult } from '@reduxjs/toolkit'; 
            const user = unwrapResult(resultAction);


            console.log('New user', user);
            enqueueSnackbar('Register successfully!', { variant: 'success', autoHideDuration: 3000 });
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
            <RegisterForm onSubmit={handleSubmit}></RegisterForm>
        </div>
    );
}

export default Register;