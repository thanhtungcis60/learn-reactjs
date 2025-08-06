import React, { use, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryAPI from 'api/categoryAPI';

const useStyles = makeStyles((theme) => ({
    list: {
        listStyleType: 'none',
        cursor: 'pointer',
    }
}));

FilterByCategory.propTypes = {
    onchange: PropTypes.func,
};

function FilterByCategory({ onchange }) {
    const classes = useStyles();
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const lstCategory = await categoryAPI.getAll();
                const mappedCategories = lstCategory.map((item) => ({
                    id: item.id,
                    name: item.name,
                }));
                setCategoryList([{ id: '', name: 'Tất cả' },
                ...mappedCategories
                ]);
            } catch (error) {
                console.error('Failed to fetch category list: ', error);
            }
        })();
    }, []);

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