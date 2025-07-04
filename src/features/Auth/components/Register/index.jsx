import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import { register } from 'features/Auth/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';



function Register(props) {
    const dispatch = useDispatch();

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
        } catch (error) {
            console.log('Failed to register:', error);
        }
    };
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}></RegisterForm>
        </div>
    );
}

export default Register;