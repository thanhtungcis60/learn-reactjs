import logo from './logo.svg';
// import './App.css';
import React from 'react';
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Album';
import ColorBox from './components/ColorBox';
import Counter from './components/Counter';

function One() {
  return (<div>
    <h2>So 1 tap 1</h2>
    <h3>So 1 tap 2</h3>
  </div>)
}

var Two = function () {
  return (<div>
    <h3>So 2 tap 1</h3>
    <h3>So 2 tap 2</h3>
  </div>)
}
var Three = () => (<div>
  <h3>So 3 tap 1</h3>
  <h3>So 3 tap 2</h3>
</div>)

function App() {
  const age = 18;
  const name = 'TTT';
  const isFemale = true;
  const student = {
    name: 'Easy Frontend'
  };
  const colorList = ['red', 'green', 'blue'];

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Xin chào {name} - {age} - {isFemale ? 'Female' : 'Male'}</p>
        {isFemale ? <p>Female</p> : <p>Male</p>}
        {isFemale &&
          (<>
            <p>Female 1</p>
            <p>Female 2</p>
            <p>Female 3</p>
          </>)
        }
        {isFemale &&
          (<div>
            <p>Female 1</p>
            <p>Female 2</p>
            <p>Female 3</p>
          </div>)
        }
        {isFemale &&
          (<React.Fragment>
            <p>Female 1</p>
            <p>Female 2</p>
            <p>Female 3</p>
          </React.Fragment>)
        }
        {!isFemale && <p>Male</p>}

        <p>student.name: {student.name}</p>

        <ol>
          {colorList.map(color => <li style={{ color }}>{color}</li>)}
        </ol>
      </header>
       */}

      <TodoFeature />
      {/* <AlbumFeature /> */}
      {/* <ColorBox /> */}
      {/* <Counter /> */}
    </div>
  );
}

export default App;
