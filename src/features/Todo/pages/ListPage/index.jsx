import { use, useEffect, useMemo, useState } from 'react';
import TodoList from '../../components/TodoList';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import queryString from 'query-string';
import TodoForm from '../../components/TodoForm';

ListPage.propTypes = {

};

function ListPage(props) {
    const initTodoList = [
        {
            id: 1,
            title: 'Eat',
            status: 'new'
        },
        {
            id: 2,
            title: 'Sleep',
            status: 'completed'
        },
        {
            id: 3,
            title: 'Work',
            status: 'new'
        },
    ];

    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [todoList, setTodoList] = useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = useState(() => {
        //Truy cập đường dẫn http://localhost:3000/todos?status=completed để test
        //http://localhost:3000/todos
        const params = queryString.parse(location.search);
        console.log('params: ', params);
        return params.status || 'all';
    });

    const handleTodoClick = (todo, idx) => {
        const newTodoList = [...todoList];//... clone current array to the new one
        //toggle state
        newTodoList[idx] = { ...newTodoList[idx], status: newTodoList[idx].status === 'new' ? 'completed' : 'new' }
        // newTodoList[idx] = newTodo;

        //update todo list
        setTodoList(newTodoList);
    }
    useEffect(() => {
        // console.log('location change', location.search);
        const params = queryString.parse(location.search);
        setFilteredStatus(params.status || 'all'); //update filtered status

    }, [location.search]); //listen to location change

    const handleShowAllClick = () => {
        // setFilteredStatus('all');
        const queryParams = { status: 'all' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams) //convert object to query string
        });
    }
    const handleShowCompletedClick = () => {
        // setFilteredStatus('completed');
        const queryParams = { status: 'completed' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams) //convert object to query string
        });
    }
    const handleShowNewClick = () => {
        // setFilteredStatus('new');
        const queryParams = { status: 'new' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams) //convert object to query string
        });
    }

    const renderedTodoList = useMemo(() => {
        //filter todo list based on filteredStatus
        return todoList.filter(todo => filteredStatus === 'all' || filteredStatus === todo.status);
    }, [todoList, filteredStatus]); //re-render when todoList or filteredStatus changes

    // console.log(renderedTodoList);
    const handleTodoFormSubmit = (values) => {
        console.log('Form submit:', values); // In ra dữ liệu nhận được từ form

        // Tạo một đối tượng todo mới
        const newTodo = {
            id: todoList.length + 1,
            title: values.title, // Lấy tiêu đề từ giá trị form đã submit
            status: 'new', // Đặt trạng thái mặc định là 'new'
        };

        // Tạo một danh sách todo mới bằng cách thêm newTodo vào cuối danh sách hiện có
        // Sử dụng spread operator (...) để tạo một bản sao mới của mảng, đảm bảo tính bất biến (immutability)
        const newTodoList = [...todoList, newTodo];

        // Cập nhật state todoList với danh sách mới
        setTodoList(newTodoList);
    }
    return (
        <div>
            <h3>TodoForm</h3>
            <TodoForm onSubmit={handleTodoFormSubmit}/>
            <h3>Todo List</h3>
            <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
            <div>
                <button onClick={handleShowAllClick}>Show All</button>
                <button onClick={handleShowCompletedClick}>Show Completed</button>
                <button onClick={handleShowNewClick}>Show New</button>
            </div>
        </div>
    );
}

export default ListPage;