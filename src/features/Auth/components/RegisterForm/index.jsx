import React, { use } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form/dist/index.ie11';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
// import InputField from '../../../../components/form-controls/InputField';
import InputField from 'components/form-controls/InputField';
import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
    },

    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },

    title: {
        margin: theme.spacing(2, 0, 3, 0),
        textAlign: 'center',
    },

    submit: {
        margin: theme.spacing(3, 0, 2, 0),
    },
}));
 RegisterForm.propTypes = {
    onSubmit: PropTypes.func
};

function RegisterForm(props) {
    const classes = useStyles();
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
        <div className={classes.root}>
            <Avatar className={classes.avatar}>
                <LockOutlined/>
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Create An Account    
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form}/>
                <InputField name="email" label="Email" form={form}/>
                <InputField name="password" label="Password" form={form}/>
                <InputField name="retypePassword" label="Retype Password" form={form}/>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Create an account    
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;