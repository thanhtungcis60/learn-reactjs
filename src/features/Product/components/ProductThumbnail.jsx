import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { LOCAL_HOST, PRODUCT_DEFAULT_PLACEHOLDER } from 'constants/index';

ProductThumbnail.propTypes = {
    product: PropTypes.object,
};

function ProductThumbnail(product) {
    console.log('ProductThumbnail', product.product.thumbnail);
    const thumbnailUrl = product.product.thumbnail ? product.product.thumbnail : `${LOCAL_HOST}/${PRODUCT_DEFAULT_PLACEHOLDER}`;
    return (
        <Box>
            <img src={thumbnailUrl} width="100%" />
        </Box>
    );
}

export default ProductThumbnail;