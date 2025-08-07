import React, { use, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    list: {
        listStyleType: 'none',
        cursor: 'pointer',
    }
}));

FilterByCategory.propTypes = {
    onchange: PropTypes.func,
    categoryList: PropTypes.array,
};

function FilterByCategory({ onchange = null, categoryList = [] }) {
    const classes = useStyles();


    return (
        <Box>
            <Typography>DANH MỤC SẢN PHẨM</Typography>
            <ul className={classes.list}>
                {categoryList.map((category) => (
                    <li key={category.id} onClick={() => onchange(category.id)}>
                        {category.name}
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByCategory;