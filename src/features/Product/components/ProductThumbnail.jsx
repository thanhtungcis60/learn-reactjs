import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { LOCAL_HOST, PRODUCT_DEFAULT_PLACEHOLDER } from 'constants/index';

ProductThumbnail.propTypes = {
    product: PropTypes.object,
};

function ProductThumbnail({ product = {} }) {
    const thumbnailUrl = product.thumbnail ? product.thumbnail : `${LOCAL_HOST}/${PRODUCT_DEFAULT_PLACEHOLDER}`;
    return (
        <Box>
            <img src={thumbnailUrl} alt={product.name}
                width="100%"
                onError={(e) => {
                    e.target.onerror = null; // Ngăn gọi lặp vô hạn nếu ảnh fallback cũng lỗi
                    e.target.src = `${LOCAL_HOST}/${PRODUCT_DEFAULT_PLACEHOLDER}`; // Ảnh mặc định bạn đã có
                }} />
        </Box>
    );
}

export default ProductThumbnail;