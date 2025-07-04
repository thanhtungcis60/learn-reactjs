import React, { useEffect } from 'react';
import Hero from './components/Hero';
import './App.scss';
import Counter from './components/Counter';
import { Route } from 'react-router-dom';
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Album';
import { Link, NavLink, Redirect, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import NotFound from './components/NotFound';
import productAPI from './api/productAPI';
import CounterFeature from './features/Counter';
import styled from 'styled-components';
import Header from 'components/Header';

//Styled-components CSS in JS
const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  color: ${props => props.color || 'green'};
`;

App.propTypes = {

};

function App() {
  const [count, setCount] = React.useState(0);
  // useEffect(() => {
  //   const params = {
  //     _limit:10,
  //   };
  //   const fetchProducts = async () => {
  //     const productList = await productAPI.getAll(params);
  //     console.log({ productList });
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className='app'>
      {/* <Title color="skyblue">Heading</Title> */}
      <Header></Header>
      <h1>React Route</h1>
      {/* <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <Hero name="Hero Name" /> */}
      {/* <Counter /> */}
      <p>
        <NavLink to="/todos">Go to Todo</NavLink>{/* Khác biệt với Link, NavLink sẽ tự động thêm class active nếu đường dẫn hiện tại khớp với đường dẫn của NavLink */}
      </p>
      <p>
        <NavLink to="/albums">Go to Albums</NavLink>
      </p>
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Route
          path="/post-list/:postId"
          exact
          render={({ match }) => (
            <Redirect to={`/posts/${match.params.postId}`} />
          )}
        />
        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  );
}

export default App;