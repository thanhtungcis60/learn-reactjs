import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),//2 đơn vị tương ứng với 16px
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
    range: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        '& > span': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

FilterByPrice.propTypes = {
    onchange: PropTypes.func,
};

function FilterByPrice({ onchange }) {
    const classes = useStyles();
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0
    });
    const handleSubmit = () => {
        console.log('Submit price filter:', values);
        if (onchange) {
            onchange(values);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        })
        );
    };
    return (
        <Box className={classes.root}>
            <Typography variant='subtitle2'>CHỌN KHOẢNG GIÁ</Typography>
            <Box className={classes.range}>
                <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
                <span>-</span>
                <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />
            </Box>

            <Button variant='outlined' color='primary' size='small' onClick={handleSubmit}>Áp dụng</Button>
        </Box>
    );
}

export default FilterByPrice;