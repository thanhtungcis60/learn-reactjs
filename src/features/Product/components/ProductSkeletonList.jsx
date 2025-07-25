import { Skeleton } from '@material-ui/lab'; // or @mui/lab if using MUI v5
import { Box, Grid } from '@material-ui/core'; // or @mui/material if using MUI v5
import PropTypes from 'prop-types'; // Make sure you have prop-types installed if using

ProductSkeletonList.propTypes = {
    length: PropTypes.number,
};

ProductSkeletonList.defaultProps = {
    length: 6,
};

function ProductSkeletonList({ length }) {
    return (
        <Box>
            <Grid container>
                {Array.from(new Array(length)).map((x, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Box padding={1}>
                            <Skeleton variant="rect" width="100%" height={118} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductSkeletonList;