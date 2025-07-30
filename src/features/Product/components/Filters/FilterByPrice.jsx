import React from 'react';
import PropTypes from 'prop-types';

FilterByPrice.propTypes = {
    onchange: PropTypes.func,
};

function FilterByPrice({ onchange }) {
    return (
        <div>
            Filter by Price
        </div>
    );
}

export default FilterByPrice;