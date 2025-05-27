import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};
PostFiltersForm.defaultProps = {
    onSubmit: null,
};

function PostFiltersForm(props) {
    const { onSubmit } = props; // Lấy hàm onSubmit từ props
    const [searchTerm, setSearchTerm] = useState(''); // State để lưu trữ từ khóa tìm kiếm, khởi tạo rỗng
    const typingTimeoutRef = useRef(null); // Sử dụng ref để lưu trữ timeout

    // Hàm xử lý sự thay đổi của input tìm kiếm
    function handleSearchTermChange(e) {
        const value = e.target.value; // Lấy giá trị hiện tại của input
        setSearchTerm(value); // Cập nhật state searchTerm

        // TODO: Trong ảnh, onSubmit được gọi ngay lập tức khi searchTerm thay đổi.
        // Thường thì bạn sẽ muốn debounce hoặc throttle việc này để tránh gọi quá nhiều lần
        // hoặc chỉ gọi khi người dùng nhấn Enter/Submit.
        // Tuy nhiên, để đúng với ảnh, tôi sẽ giữ nguyên logic này.

        if (!onSubmit) return; // Nếu không có hàm onSubmit được truyền vào, thoát

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current); // Xóa timeout cũ nếu có
        }
        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value, // Dữ liệu form để truyền cho onSubmit
            };
            onSubmit(formValues); // Gọi hàm onSubmit với dữ liệu form
        }, 300); // Gọi hàm onSubmit sau 300ms nếu không có thay đổi nào nữa


    }


    return (
        <form /* onSubmit={handleSubmit} */> {/* Uncomment onSubmit={handleSubmit} nếu bạn thêm hàm handleSubmit */}
            <input
                type="text"
                value={searchTerm} // Gán giá trị input với state searchTerm
                onChange={handleSearchTermChange} // Xử lý sự kiện thay đổi input
                placeholder="Search posts..." // Thêm placeholder để gợi ý cho người dùng
            />
        </form>
    );
}

export default PostFiltersForm;