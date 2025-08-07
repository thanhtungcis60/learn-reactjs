import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { LOCAL_HOST, PRODUCT_DEFAULT_PLACEHOLDER } from 'constants/index';

ProductThumbnail.propTypes = {
    product: PropTypes.object,
};

function ProductThumbnail(product) {
    const thumbnailUrl = product.thumbnail ? product.thumbnail : `${LOCAL_HOST}/${PRODUCT_DEFAULT_PLACEHOLDER}`;
    return (
        <Box>
            <img src={thumbnailUrl} width="100%" />
        </Box>
    );
}

export default ProductThumbnail;