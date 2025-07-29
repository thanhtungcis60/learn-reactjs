import { Skeleton } from '@material-ui/lab'; // or @mui/lab if using MUI v5
import { Box, Grid } from '@material-ui/core'; // or @mui/material if using MUI v5
import PropTypes from 'prop-types'; // Make sure you have prop-types installed if using
import Product from './Product';

ProductList.propTypes = {
    data: PropTypes.array,
};

ProductList.defaultProps = {
    data: [],
};

function ProductList({ data }) {
    return (
        <Box>
            <Grid container>
                {data.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;