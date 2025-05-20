import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  const age = 18;
  const name = "Tung";
  const isMale = true;
  const student = { name: 'Tung' };
  const colotList = ['red', 'green', 'blue'];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Tung Tran</p>
        <p>Xin chao {name} - {age} - {!isMale ? 'Female' : 'Male'}</p>
        {!isMale ? <p>Female</p> : <p>Male</p>}
        {!isMale && <p>Female</p>}
        {isMale && (
          <React.Fragment>
            <p>Male 1</p>
            <p>Male 2</p>
            <p>Male 3</p>
          </React.Fragment>
        )}
        {isMale && (
          <>
            <p>Male 1</p>
            <p>Male 2</p>
            <p>Male 3</p>
          </>
        )}
        {isMale && <p>Male</p>}
        <p>{student.name}</p>
        <ul>
          {colotList.map((color, index) => (
            <li key={index} style={{ color }}>{color}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
