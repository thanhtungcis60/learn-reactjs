import React, { useEffect } from 'react';


function formatDate(now) {
    if (!now) return '';
    const hours = String(now.getHours()).padStart(2, '0');// `0${now.getHours()}`.slice(-2);
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
function useClock() {
    const [timeString, setTimeString] = React.useState('');
    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date();
            const newTimeString = formatDate(now);
            setTimeString(newTimeString);
        }, 1000);
        return () => {
            // Cleanup function to clear the interval when the component unmounts

            clearInterval(clockInterval);
        };
    }, []);
    return {
        timeString
    };
}

export default useClock;