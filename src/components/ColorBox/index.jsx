import React, { useState } from 'react';
import './ColorBox.scss';

ColorBox.propTypes = {

};
function getRandomColor() {
    const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue'];
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}
function ColorBox(props) {
    const [color, setColor] = useState(() => {
        // get color from local storage
        const colorFromStorage = localStorage.getItem('box_color') || 'deeppink';
        console.log(colorFromStorage);
        return colorFromStorage;
    });

    function handleBoxClick() {
        // get random color -> set color
        const newColor = getRandomColor();
        setColor(newColor);
        localStorage.setItem('box_color', newColor);
    }
    return (
        // <div>
        //     {color}
        //     <button onClick={() => setColor('black')}>Change to black</button>
        //     <button onClick={() => setColor('white')}>Change to white</button>
        // </div>
        <div
            className='color-box'
            style={{ backgroundColor: color }}
            onClick={handleBoxClick}>
            COLOR BOX
        </div>
    );
}

export default ColorBox;