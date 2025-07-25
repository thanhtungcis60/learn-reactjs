import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form/dist/index.ie11';
import * as yup from "yup";
// import InputField from '../../../../components/form-controls/InputField';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';

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
    progress: {
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0
    }
}));
RegisterForm.propTypes = {
    onSubmit: PropTypes.func
};

function RegisterForm(props) {
    const classes = useStyles();
    const schema = yup.object().shape({
        fullName: yup.string()
            .required('Please enter your fullname')
            .test('should has at least two words', 'Please enter at least two words', (values) => {
                return values.split(' ').length >= 2;
            }),
        email: yup.string()
            .required('Please enter your email')
            .email('Please enter a valid email address'),
        password: yup.string()
            .required('Please enter your password')
            .min(6, 'Password must be at least 6 characters long'),
        retypePassword: yup.string()
            .required('Please retype your password')
            .oneOf([yup.ref('password')], 'Password does not match'),

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

    const { isSubmitting } = form.formState;

    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }
        // form.reset(); //reset form after submit //đóng lại để sửa khi mà gặp lỗi
    }
    return (
        <div className={classes.root} >
            {isSubmitting && <LinearProgress className={classes.progress} />}
            <Avatar className={classes.avatar}>
                <LockOutlined />
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Create An Account
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="retypePassword" label="Retype Password" form={form} />
                <Button disabled={isSubmitting} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Create an account
                </Button>
            </form>
        </div >
    );
}

export default RegisterForm;