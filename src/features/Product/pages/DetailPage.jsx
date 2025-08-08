import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import ProductThumbnail from '../components/ProductThumbnail';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import useProductDetail from '../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';

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
    const { params: { productId } } = match;
    const { product, loading } = useProductDetail(productId);

    if (loading) {
        return <Box>Loading...</Box>;
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
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default DetailPage;