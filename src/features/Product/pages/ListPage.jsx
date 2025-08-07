import { Box, Container, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import productAPI from "api/productAPI";
import { use, useEffect, useMemo, useState } from "react";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductList from "../components/ProductList";
import { Pagination } from "@material-ui/lab";
import ProductSort from "../components/ProductSort";
import ProductFilters from "../components/ProductFilters";
import { Filter } from "@material-ui/icons";
import FilterViewer from "../components/FilterViewer";
import categoryAPI from 'api/categoryAPI';
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import queryString from "query-string";

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
    // const [filters, setFilters] = useState({ _page: 1, _limit: 12, _sort: 'salePrice', _order: 'asc' });
    const [categoryList, setCategoryList] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 12,
            _sort: 'salePrice',
            _order: params._order || 'asc',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true'
        };
    }, [location.search]);

    // const [filters, setFilters] = useState({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit) || 12,
    //     _sort: 'salePrice',
    //     _order: queryParams._order || 'asc'
    // });

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productAPI.getAll(queryParams);
                setProductList(data);
                setPaginationObj(pagination);
            } catch (error) {
                console.error('Failed to fetch product list: ', error);
            }
            setLoading(false);
        })();
    }, [queryParams]);

    useEffect(() => {
        (async () => {
            try {
                const lstCategory = await categoryAPI.getAll();
                const mappedCategories = lstCategory.map((item) => ({
                    id: item.id,
                    name: item.name,
                }));
                setCategoryList([{ id: '', name: 'Tất cả' },
                ...mappedCategories
                ]);
            } catch (error) {
                console.error('Failed to fetch category list: ', error);
            }
        })();
    }, []);
    // useEffect(() => {
    //     const queryParams = queryString.stringify(filters);
    //     history.push({
    //         pathname: history.location.pathname,
    //         search: queryParams,
    //     });
    // }, [filters, history]);

    const handlePageChange = (event, newValue) => {
        // setFilters((prevFiters) => ({ ...prevFiters, _page: newValue }));
        const filters = {
            ...queryParams,
            _page: newValue,
        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    }

    const handleSortChange = (newOrder) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _order: newOrder,
        // }));
        const filters = {
            ...queryParams,
            _order: newOrder,
        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    }
    const handleFiltersChange = (newFilters) => {
        const combined = {
            ...queryParams,
            ...newFilters,
        }
        if (newFilters.hasOwnProperty('categoryId') && newFilters['categoryId'] === '') {
            const { categoryId, ...rest } = combined;// gỡ bỏ key categoryId khỏi combined bằng destructuring
            console.log('rest', JSON.stringify(rest));
            history.push({
                pathname: history.location.pathname,
                search: queryString.stringify(rest),
            });
        } else {
            history.push({
                pathname: history.location.pathname,
                search: queryString.stringify(combined),
            });
        }

    }
    const setNewFilters = (newFilters) => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters),
        });
    };
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters filters={queryParams} onchange={handleFiltersChange} categoryList={categoryList} />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentOrder={queryParams._order} onchange={handleSortChange} />
                            <FilterViewer filters={queryParams} onChange={setNewFilters} categoryList={categoryList} />
                            {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}
                            <Box className={classes.pagination}>
                                <Pagination
                                    count={Math.ceil(paginationObj._totalRows / paginationObj._limit)}
                                    page={paginationObj.page}
                                    color="primary"
                                    onChange={handlePageChange} />
                            </Box>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;