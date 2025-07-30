import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
    currentOrder: PropTypes.string.isRequired,
    onchange: PropTypes.func,
};

function ProductSort({ currentOrder, onchange }) {
    const handleSortChange = (event, newValue) => {
        if (onchange) {
            onchange(newValue);
        }
    };
    return (
        <Tabs
            value={currentOrder}
            onChange={handleSortChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="product sort tabs"
        >
            <Tab label="Giá thấp tới cao" value="asc"></Tab>
            <Tab label="Giá cao xuống thấp" value="desc"></Tab>
        </Tabs>
    );
}

export default ProductSort;