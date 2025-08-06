import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onchange: PropTypes.func,
};

function ProductFilters({ filters, onchange }) {
    const handleCategoryChange = (newCategoryID) => {
        if (!onchange) return;
        const newFilters = { categoryId: newCategoryID };
        onchange(newFilters);
    };
    const handleChange = (newPriceObj) => {
        if (onchange) {
            onchange(newPriceObj);
        }
    };
    return (
        <div>
            <FilterByCategory onchange={handleCategoryChange} />
            <FilterByPrice onchange={handleChange} />
            <FilterByService filters={filters} onchange={handleChange} />
        </div>
    );
}

export default ProductFilters;