import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onchange: PropTypes.func,
};

function ProductFilters({ filters, onchange }) {
    const handleCategoryChange = (newCategoryID) => {
        if (onchange) {
            const newFilters = { categoryId: newCategoryID };
            onchange(newFilters);
        }
    };
    const handlePriceChange = (newPriceObj) => {
        if (onchange) {
            onchange(newPriceObj);
        }
    };
    return (
        <div>
            <FilterByCategory onchange={handleCategoryChange} />
            <FilterByPrice onchange={handlePriceChange} />
        </div>
    );
}

export default ProductFilters;