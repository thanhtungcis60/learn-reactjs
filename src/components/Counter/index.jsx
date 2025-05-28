// import React, { useState } from "react";

// Counter.propTypes = {

// };

// function Counter(props) {
//     const [count, setCount] = useState(0);
//     return (
//         <div>
//             {count}
//             <button onClick={() => setCount(x => x + 1)}>Increase</button>
//         </div>
//     );
// }

// export default Counter;

import { useEffect, useRef, useState } from 'react';

// Mặc dù Counter.propTypes = {}; được khai báo, nhưng không có props nào được định nghĩa ở đây.
// Nếu component nhận props, bạn sẽ định nghĩa chúng ở đây.
Counter.propTypes = {};

function Counter() {
    // 1. State để lưu trữ giá trị đếm hiện tại
    const [count, setCount] = useState(0);

    // 2. Ref để lưu trữ giá trị đếm *trước đó*
    // useRef không kích hoạt re-render khi giá trị của nó thay đổi.
    const prevCount = useRef(count); // Giá trị ban đầu của prevCount.current sẽ là 0

    // 3. useEffect để cập nhật prevCount.current mỗi khi 'count' thay đổi
    // Hook này sẽ chạy sau mỗi lần render mà 'count' đã thay đổi.
    useEffect(() => {
        prevCount.current = count; // Gán giá trị 'count' hiện tại cho 'prevCount.current'
    }, [count]); // Dependency array: useEffect này sẽ chạy lại khi 'count' thay đổi

    // Hàm xử lý khi click vào nút "Increase"
    const handleIncreaseClick = () => {
        // Cập nhật giá trị 'count' bằng cách tăng nó lên 1
        // Sử dụng functional update để đảm bảo lấy giá trị 'count' mới nhất
        setCount(x => x + 1);
    };

    return (
        <div>
            {/* Hiển thị giá trị đếm trước đó được lưu trong useRef */}
            <p>Previous: {prevCount.current}</p>
            {/* Hiển thị giá trị đếm hiện tại từ useState */}
            <p>Current: {count}</p>

            <div>
                <button onClick={handleIncreaseClick}>Increase</button>
            </div>
        </div>
    );
}

export default Counter;