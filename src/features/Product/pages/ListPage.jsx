import { Box, Container, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import productAPI from "api/productAPI";
import { useEffect, useState } from "react";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductList from "../components/ProductList";

const useStyles = makeStyles((theme) => ({
    root: {},
    left: {
        width: '250px'
    },
    right: {
        flex: '1 1 0',
    },
}));
ListPage.propTypes = {

};

function ListPage(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productAPI.getAll({ _page: 1, _limit: 10 });
                setProductList(data);
            } catch (error) {
                console.error('Failed to fetch product list: ', error);
            }
            setLoading(false);
        })();
    }, []);

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
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;