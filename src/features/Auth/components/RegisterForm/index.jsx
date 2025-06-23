import React, { use } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form/dist/index.ie11';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
// import InputField from '../../../../components/form-controls/InputField';
import InputField from 'components/form-controls/InputField';
import { Avatar, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
 RegisterForm.propTypes = {
    onSubmit: PropTypes.func
};

function RegisterForm(props) {
    const schema = yup.object().shape({
        title: yup.string().required('Please enter todo title').min(5, 'Title must be at least 5 characters long')
    });
    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        const { onSubmit } = props;
        if(onSubmit)
        {
            onSubmit(values);
        }
        form.reset(); //reset form after submit
    }
    return (
        <div>
            <Avatar>
                <LockOutlined/>
            </Avatar>
            <Typography component="h3" variant="h5">
                Create An Account    
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form}/>
                <InputField name="email" label="Email" form={form}/>
                <InputField name="password" label="Password" form={form}/>
                <InputField name="retypePassword" label="Retype Password" form={form}/>
            </form>
        </div>
    );
}

export default RegisterForm;