import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';
import { Add } from '@material-ui/icons';
import AddToCartForm from '../components/AddToCartForm';
import ProductMenu from '../components/ProductMenu';
import ProductAdditional from '../components/ProductAdditional';
import ProductReviews from '../components/ProductReviews';
import ProductDesciption from '../components/ProductDesciption';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {},
    left: {
        width: '400px',
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
    right: {
        flex: '1 1 0',
        padding: theme.spacing(1.5),
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'row wrap',
        marginTop: '20px',
        paddingBottom: '20px',
    }
}));

function DetailPage(props) {
    const classes = useStyles();
    const match = useRouteMatch();
    const { params: { productId }, url, path } = match;
    console.log("url", url);
    console.log("path", path);
    const { product, loading } = useProductDetail(productId);

    if (loading) {
        return <Box>Loading...</Box>;
    }

    const handleAddToCart = (values) => {
        console.log('Add to cart', values);
    }

    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product} />
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCart} />
                        </Grid>
                    </Grid>
                </Paper>

                <ProductMenu />
                <Switch>
                    <Route exact path={path} >
                        <ProductDesciption product={product} />
                    </Route>
                    <Route path={`${path}/additional`}>
                        <ProductAdditional />
                    </Route>
                    <Route path={`${path}/reviews`} >
                        <ProductReviews />
                    </Route>
                </Switch>
            </Container>
        </Box>
    );
}

export default DetailPage;