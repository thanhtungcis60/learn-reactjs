import React from 'react';
import Hero from './components/Hero';
import './App.scss';
import Counter from './components/Counter';
import { Route } from 'react-router-dom';
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Album';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';

App.propTypes = {

};

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className='app'>
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
      <switch>
        <Route path="/" component={TodoFeature} />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
      </switch>
    </div>
  );
}

export default App;