import { Box, FilledInput, FormControl, FormHelperText, InputAdornment, InputLabel, makeStyles, OutlinedInput, TextField, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { AddCircleOutline, RemoveCircleOutline, Visibility, VisibilityOff } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

QuantityField
    .propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};
const useStyle = makeStyles(() => ({
    root: {},
    box: {
        maxWidth: '200px',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
    }
}));

function QuantityField(props) {
    const classes = useStyle();
    const { form, name, label, disabled } = props;
    const { errors, setValue } = form;
    const hasError = !!errors[name];//formState.touched[name] && errors[name];
    return (
        <div>
            <FormControl error={hasError} fullWidth margin='normal' variant="outlined" size='small'>
                <Typography>{label}</Typography>
                <Controller
                    name={name}
                    control={form.control}
                    render={({ onChange, onBlur, value, name }) => (
                        <Box className={classes.box}>
                            <IconButton onClick={() => setValue(name, (Number.parseInt(value) ? Number.parseInt(value) - 1 : 1))}>
                                <RemoveCircleOutline />
                            </IconButton>
                            <OutlinedInput
                                id={name}
                                type='number'
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                            <IconButton onClick={() => setValue(name, (Number.parseInt(value) ? Number.parseInt(value) + 1 : 1))}>
                                <AddCircleOutline />
                            </IconButton>
                        </Box>

                    )}

                />
                <FormHelperText>
                    {errors[name]?.message}
                </FormHelperText>
            </FormControl>
        </div>
    );
}

export default QuantityField;