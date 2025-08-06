import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Checkbox, FormControl, FormControlLabel, makeStyles, TextField, Typography } from '@material-ui/core';
import { Check } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),//2 đơn vị tương ứng với 16px
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
    list: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',
        '& > li': {
            margin: 0,
            marginTop: theme.spacing(1),
        }
    }
}));

FilterByService.propTypes = {
    filters: PropTypes.object,
    onchange: PropTypes.func,
};

function FilterByService({ filters = {}, onchange }) {
    const classes = useStyles();

    const handleChange = (e) => {
        if (!onchange) return;
        const { name, checked } = e.target;
        onchange({ [name]: checked });
    };
    return (
        <Box className={classes.root}>
            <Typography variant='subtitle2'>DỊCH VỤ</Typography>
            <ul className={classes.list}>
                {
                    [
                        { value: 'isPromotion', label: 'Có khuyến mại' },
                        { value: 'isFreeShip', label: 'Vận chuyển miễn phí' }
                    ].map((service) => (
                        <li key={service.value}>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    name={service.value}
                                    color="primary" />
                            } label={service.label} />
                        </li>
                    ))
                }

            </ul>
        </Box>
    );
}

export default FilterByService;