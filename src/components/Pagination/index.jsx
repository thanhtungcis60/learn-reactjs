import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};
Pagination.defaultProps = {
    onPageChange: null,
};

function Pagination(props) {
    const { pagination, onPageChange } = props; // Destructuring props để lấy `pagination` và `onPageChange`
    const { _page, _limit, _totalRows } = pagination;
    // Tính tổng số trang
    const totalPages = Math.ceil(_totalRows / _limit); // Ví dụ: 51 / 10 = 5.1 -> 6 trang

    // Hàm xử lý khi người dùng click vào nút chuyển trang
    function handlePageChange(newPage) {
        if (onPageChange) {
            onPageChange(newPage); // Gọi hàm callback được truyền từ component cha
        }
    }

    return (
        <div className="pagination"> {/* Bạn có thể thêm class cho div này */}
            <button
                disabled={_page <= 1} // Vô hiệu hóa nút "Prev" nếu đang ở trang đầu tiên
                onClick={() => handlePageChange(_page - 1)}
            >
                Prev
            </button>

            <button
                disabled={_page >= totalPages} // Vô hiệu hóa nút "Next" nếu đang ở trang cuối cùng
                onClick={() => handlePageChange(_page + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;