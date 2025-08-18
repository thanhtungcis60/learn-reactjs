import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { cartItemsSumSelector } from './selector';

CartFeature.propTypes = {

};

function CartFeature(props) {
    const cartTotal = useSelector(cartItemsSumSelector);
    return (
        <div>
            Cart Feature {cartTotal}
        </div>
    );
}

export default CartFeature;