import React from 'react';
import Hero from './components/Hero';
import './App.scss';
import Counter from './components/Counter';
import { Route } from 'react-router-dom';
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Album';

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
      <Route path="/todos" component={TodoFeature} />
      <Route path="/albums" component={AlbumFeature} />
    </div>
  );
}

export default App;