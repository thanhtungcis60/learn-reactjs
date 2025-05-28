import React from 'react';
import Hero from './components/Hero';
import './App.scss';
import Counter from './components/Counter';

App.propTypes = {

};

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className='app'>
      <h1>React Hooks - Memoization </h1>
      {/* <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <Hero name="Hero Name" /> */}

      <Counter />
    </div>
  );
}

export default App;