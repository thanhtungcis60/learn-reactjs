import { FilledInput, FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField
    .propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function PasswordField(props) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const { form, name, label, disabled } = props;
    const { errors, formState } = form;
    const hasError = !!errors[name];//formState.touched[name] && errors[name];
    console.log(errors[name], formState.touched[name]);
    return (
        <div>
            {/* <Controller
                name={name}
                control={form.control}
                as={TextField}
                margin="normal"
                variant="outlined"
                fullWidth
                label={label}
                disabled={disabled}
                error={!!hasError} //Material UI
                helperText={errors[name]?.message}//Material UI
            /> */}
            <FormControl error={hasError} fullWidth margin='normal' variant="outlined">
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Controller
                    name={name}
                    control={form.control}
                    as={OutlinedInput}
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={label}
                    disabled={disabled}
                //Material UI
                />
                <FormHelperText>
                    {errors[name]?.message}
                </FormHelperText>
            </FormControl>
        </div>
    );
}

export default PasswordField;