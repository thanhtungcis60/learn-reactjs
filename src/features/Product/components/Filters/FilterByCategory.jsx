import React, { use, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import categoryAPI from 'api/categoryAPI';

FilterByCategory.propTypes = {
    onchange: PropTypes.func,
};

function FilterByCategory({ onchange }) {
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const lstCategory = await categoryAPI.getAll();
                setCategoryList(lstCategory.map((item) => ({
                    id: item.id,
                    name: item.name,
                }
                )));
            } catch (error) {
                console.error('Failed to fetch category list: ', error);
            }
        })();
    }, []);

    return (
        <Box>
            <Typography>DANH MỤC SẢN PHẨM</Typography>
            <ul>
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