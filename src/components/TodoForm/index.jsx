import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Đảm bảo bạn đã cài đặt prop-types: npm install prop-types hoặc yarn add prop-types


TodoForm.propTypes = {
    onSubmit: PropTypes.func, // `onSubmit` là một hàm
};

TodoForm.defaultProps = {
    onSubmit: null, // Giá trị mặc định của `onSubmit` là null
};
function TodoForm(props) {
    const { onSubmit } = props;
    const [value, setValue] = useState(''); // Giá trị ban đầu của input là chuỗi rỗng

    function handleValueChange(e) {
        console.log(e.target.value); // In ra giá trị hiện tại của input vào console
        setValue(e.target.value); // Cập nhật state `value` với giá trị mới từ input
    }

    function handleSubmit(e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form (tải lại trang)}
        if (!onSubmit) return; // Nếu không có hàm `onSubmit`, không làm gì cả
        const formValue = {
            title: value,
        };
        onSubmit(formValue); // Gọi hàm `onSubmit` với giá trị của input
        setValue(''); // Đặt lại giá trị của input về chuỗi rỗng
    }

    return (
        <form onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={value}
                onChange={handleValueChange}
                // Thêm placeholder để người dùng biết input này dùng để làm gì
                placeholder="Enter new todo..."
            />
        </form>
    );
}


export default TodoForm;