import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form/dist/index.ie11';
import * as yup from "yup";
// import InputField from '../../../../components/form-controls/InputField';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { SupervisedUserCircle } from '@material-ui/icons';
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
LoginForm.propTypes = {
    onSubmit: PropTypes.func
};

function LoginForm(props) {
    const classes = useStyles();
    const schema = yup.object().shape({
        identifier: yup.string()
            .required('Please enter your email')
            .email('Please enter a valid email address'),
        password: yup.string()
            .required('Please enter your password')

    });
    const form = useForm({
        defaultValues: {
            identifier: '',
            password: ''
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
                <SupervisedUserCircle />
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Login
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="identifier" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <Button disabled={isSubmitting} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Login
                </Button>
            </form>
        </div >
    );
}

export default LoginForm;