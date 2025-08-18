import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import { addToCart } from 'features/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDesciption from '../components/ProductDesciption';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(3),
    },
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
    },
    loading: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%'
    }
}));

function DetailPage(props) {
    const classes = useStyles();
    const match = useRouteMatch();
    const { params: { productId }, url, path } = match;
    // console.log("url", url);
    // console.log("path", path);
    const { product, loading } = useProductDetail(productId);
    const dispatch = useDispatch();

    if (loading) {
        return <Box className={classes.loading}>
            <LinearProgress />
        </Box>;
    }

    const handleAddToCart = ({ quantity }) => {
        // console.log('Add to cart', quantity);
        const action = addToCart({
            id: product.id,
            product,
            quantity
        });
        // console.log(action);
        dispatch(action);
    }

    return (
        <Box className={classes.root}>
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