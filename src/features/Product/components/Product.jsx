import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { LOCAL_HOST, PRODUCT_DEFAULT_PLACEHOLDER, THUMBNAIL_PLACEHOLDER } from 'constants/index';

Product.propTypes = {
    product: PropTypes.object,
};

function Product({ product }) {
    const thumbnailUrl = product.thumbnail ? product.thumbnail : `${LOCAL_HOST}/${THUMBNAIL_PLACEHOLDER}`;
    return (
        <Box padding={1} minHeight="215px">
            {/* <Skeleton variant="rect" width="100%" height={118} /> */}
            <Box padding={1}>
                <img
                    src={thumbnailUrl}
                    alt={product.name}
                    style={{
                        width: '100%',
                        height: '150px', // hoặc 200px, tuỳ bạn
                    }}
                    onError={(e) => {
                        e.target.onerror = null; // Ngăn gọi lặp vô hạn nếu ảnh fallback cũng lỗi
                        e.target.src = PRODUCT_DEFAULT_PLACEHOLDER; // Ảnh mặc định bạn đã có
                    }}
                />
            </Box>
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
                <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.salePrice)}
                </Box>
                {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ''}</Typography>
        </Box>
    );
}

export default Product;