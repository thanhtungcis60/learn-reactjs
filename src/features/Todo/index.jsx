import { useState } from 'react';
import TodoList from './components/TodoList';
import { Route, Switch, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import NotFound from '../../components/NotFound';

TodoFeature.propTypes = {

};

function TodoFeature(props) {
    const match = useRouteMatch();
    return (
        <div>TODO SHARED UI
            <Switch>
                <Route path={match.path} component={ListPage} exact />
                <Route path={`${match.path}/:todoId`} component={DetailPage} exact />
                <Route component={NotFound} />
            </Switch>
        </div>

    );
}

export default TodoFeature;