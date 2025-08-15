import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

ProductDesciption.propTypes = {
    product: PropTypes.object,
};

function ProductDesciption({ product = {} }) {
    const safeDescription = DOMPurify.sanitize(product.description);
    return (
        <Paper elevation={0} style={{ padding: '15px' }}>
            <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
        </Paper>

    );
}

export default ProductDesciption;