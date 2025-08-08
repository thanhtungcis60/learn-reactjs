import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(2),
        boderBottom: `1px solid ${theme.palette.grey[200]}`,
    },
    description: {
        margin: theme.spacing(2, 0),
    },
    priceBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[100],
    },
    salePrice: {
        marginRight: theme.spacing(3),
        fontSize: theme.typography.h4.fontSize,
    },
    originalPrice: {
        marginRight: theme.spacing(2),
        textDecoration: 'line-through',
    }
}));
ProductInfo.propTypes = {
    product: PropTypes.object,
};

function ProductInfo({ product = {} }) {
    console.log('ProductInfo', JSON.stringify(product));
    const classes = useStyles();
    console.log('ProductInfo', JSON.stringify(product, null, 2));
    const { name, description, salePrice, originalPrice, promotionPercent } = product;
    return (
        <Box className={classes.root}>
            <Typography component='h1' variant='h3'>{name}</Typography>
            <Typography variant='body2' className={classes.description}>{description}</Typography>
            <Box className={classes.priceBox}>
                <Box component="span" className={classes.salePrice}>{formatPrice(salePrice)}</Box>
                {promotionPercent > 0 && (
                    <>
                        <Box component="span" className={classes.originalPrice}>{formatPrice(originalPrice)}</Box>
                        <Box component="span">-{promotionPercent} %</Box>
                    </>
                )}

            </Box>
        </Box>
    );
}

export default ProductInfo;