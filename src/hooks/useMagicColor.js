import React, { useState, useEffect, useRef } from 'react';

// Hàm này trả về một màu ngẫu nhiên khác với màu hiện tại
function randomColor(currentColor) {
    const COLOR_LIST = ['red', 'green', 'yellow']; // Random từ 0 -> 2
    // const random = Math.trunc(Math.random() * 3); // Lỗi trong ảnh, nên dùng giá trị từ randomIndex
    let newIndex;
    let randomIndex; // Khai báo randomIndex ở đây

    // Vòng lặp để đảm bảo màu mới khác với màu hiện tại
    do {
        randomIndex = Math.trunc(Math.random() * COLOR_LIST.length); // Phát sinh số ngẫu nhiên từ 0 đến length-1
        newIndex = randomIndex; // gán giá trị của randomIndex cho newIndex
    } while (COLOR_LIST[newIndex] === currentColor); // Lặp lại nếu màu mới trùng với màu hiện tại

    // console.log(COLOR_LIST[randomIndex]); // Dòng này có thể gây nhầm lẫn nếu không theo dõi randomIndex chính xác
    return COLOR_LIST[newIndex]; // Trả về màu tại newIndex đã được đảm bảo khác màu cũ
}

// Custom hook để quản lý việc thay đổi màu sắc tự động
function useMagicColor() {
    const [color, setColor] = useState('transparent'); // State để lưu trữ màu hiện tại và kích hoạt re-render
    const colorRef = useRef('transparent'); // useRef để lưu trữ màu hiện tại mà không kích hoạt re-render, dùng cho setInterval

    // Thay đổi màu mỗi 1 giây
    useEffect(() => {
        const colorInterval = setInterval(() => {
            // console.log('First color: ', color); // 'color' ở đây sẽ là giá trị ban đầu nếu không có colorRef
            // console.log('Change color: ', colorRef.current); // Sử dụng colorRef.current để lấy giá trị mới nhất

            const newColor = randomColor(colorRef.current); // Lấy màu mới dựa trên màu hiện tại trong ref
            setColor(newColor); // Cập nhật state để re-render component
            colorRef.current = newColor; // Cập nhật giá trị trong ref
        }, 1000);

        // Cleanup function: Clear the interval when the component unmounts
        return () => {
            clearInterval(colorInterval);
        };
    }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component mount

    return color; // Trả về màu hiện tại
}

export default useMagicColor;