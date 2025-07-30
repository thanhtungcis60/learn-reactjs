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
            const newFilters = { ...filters, categoryId: newCategoryID };
            onchange(newFilters);
        }
    };
    const handlePriceChange = (newPrice) => {
        if (onchange) {
            const newFilters = { ...filters, salePrice: newPrice };
            onchange(newFilters);
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