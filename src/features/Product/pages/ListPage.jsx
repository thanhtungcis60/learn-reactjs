import { Box, Container, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import productAPI from "api/productAPI";
import { useEffect, useState } from "react";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductList from "../components/ProductList";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {},
    left: {
        width: '250px'
    },
    right: {
        flex: '1 1 0',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'row wrap',
        marginTop: '20px',
        paddingBottom: '20px',
    }
}));
ListPage.propTypes = {

};

function ListPage(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [paginationObj, setPaginationObj] = useState({});
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ _page: 1, _limit: 12 });

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productAPI.getAll(filters);
                setProductList(data);
                setPaginationObj(pagination);
            } catch (error) {
                console.error('Failed to fetch product list: ', error);
            }
            setLoading(false);
        })();
    }, [filters]);

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>Left column</Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}
                            <Box className={classes.pagination}>
                                <Pagination
                                    count={Math.ceil(paginationObj._totalRows / paginationObj._limit)}
                                    page={paginationObj.page}
                                    color="primary"
                                    onChange={(event, newValue) => { setFilters((prevFiters) => ({ ...prevFiters, _page: newValue })) }} />
                            </Box>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;