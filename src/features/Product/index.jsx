import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import ListPage from './pages/ListPage';

ProductFeature.propTypes = {

};

function ProductFeature(props) {
    return (
        <div>
            Product Feature
            <Switch>
                <Route path="/products" exact component={ListPage} />
            </Switch>
        </div>
    );
}

export default ProductFeature;