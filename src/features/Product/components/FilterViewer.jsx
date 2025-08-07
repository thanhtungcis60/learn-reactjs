import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
    categoryList: PropTypes.array
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        margin: theme.spacing(2, 0),
        listStyleType: 'none',
        padding: 0,

        '& > li': {
            margin: 0,
            padding: theme.spacing(1)
        }
    }
}));


function FilterViewer({ filters = {}, onChange = null, categoryList = [] }) {
    const classes = useStyles();

    const FILTER_LIST = [
        {
            id: 1,
            getLabel: () => 'Giao hàng miễn phí',
            isActive: (filters) => filters.isFreeShip,
            isVisible: () => true,
            isRemovable: false,
            onRemove: () => { },
            onToggle: (filters) => {
                const newFilters = { ...filters };
                if (newFilters.isFreeShip) {
                    delete newFilters.isFreeShip;
                } else {
                    newFilters.isFreeShip = true;
                }
                return newFilters;
            },
        },
        {
            id: 2,
            getLabel: () => 'Có khuyến mãi',
            isActive: () => true,
            isVisible: (filters) => filters.isPromotion,
            isRemovable: true,
            onRemove: (filters) => {
                const newFilters = { ...filters };
                delete newFilters.isPromotion;
                return newFilters;
            },
            onToggle: () => { },
        },
        {
            id: 3,
            getLabel: (filters) => `Từ ${filters.salePrice_gte || 0} đến ${filters.salePrice_lte || 0}`,
            isActive: () => true,
            isVisible: (filters) => Object.keys(filters).includes('salePrice_gte') || Object.keys(filters).includes('salePrice_lte'),
            // isVisible: (filters) => Object.keys(filters).includes('salePrice_gte') && Number(filters['salePrice_gte']) > 0
            //     || Object.keys(filters).includes('salePrice_lte') && Number(filters['salePrice_lte']) > 0,
            isRemovable: true,
            onRemove: (filters) => {
                const newFilters = { ...filters };
                delete newFilters.salePrice_gte;
                delete newFilters.salePrice_lte;
                return newFilters;
            },
            onToggle: () => { },
        },
        {
            id: 4,
            getLabel: (filters) => `Danh mục: ${filters.categoryId ? categoryList.find(m => m.id === filters.categoryId)?.name : 'Tất cả'}`,
            isActive: () => true,
            isVisible: (filters) => filters.categoryId,
            isRemovable: true,
            onRemove: (filters) => {
                const newFilters = { ...filters };
                delete newFilters.categoryId;
                return newFilters;
            },
            onToggle: (filters) => { },
        },
    ];

    const isVisibleFilter = useMemo(() => {
        return FILTER_LIST.filter((x) => x.isVisible(filters));
    });
    return (
        <Box component="ul" className={classes.root}>
            {isVisibleFilter.map((x) => (
                <li key={x.id}>
                    <Chip
                        label={x.getLabel(filters)}
                        size="small"
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        onClick={x.isRemovable ? null : () => {
                            if (!onChange) return;
                            const newFilters = x.onToggle(filters);
                            onChange(newFilters);
                        }}
                        onDelete={x.isRemovable ? () => {
                            if (!onChange) return;
                            const newFilters = x.onRemove(filters);
                            onChange(newFilters);
                        } : null
                        }
                    />
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;