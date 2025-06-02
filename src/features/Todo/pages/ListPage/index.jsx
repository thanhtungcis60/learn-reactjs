import { use, useState } from 'react';
import TodoList from '../../components/TodoList';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import queryString from 'query-string';

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
    const [todoList, setTodoList] = useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = useState(() => {
        //Truy cập đường dẫn http://localhost:3000/todos?status=completed để test
        //http://localhost:3000/todos
        const params = queryString.parse(location.search);
        console.log('params: ', params);
        return params.status || 'all';
    });

    const handleTodoClick = (todo, idx) => {
        //clone current array to the new one
        const newTodoList = [...todoList];//... Clone
        // console.log(todo, idx);
        //toggle state
        newTodoList[idx] = { ...newTodoList[idx], status: newTodoList[idx].status === 'new' ? 'completed' : 'new' }
        // newTodoList[idx] = newTodo;

        //update todo list
        setTodoList(newTodoList);
    }

    const handleShowAllClick = () => {
        setFilteredStatus('all');
    }
    const handleShowCompletedClick = () => {
        setFilteredStatus('completed');
    }
    const handleShowNewClick = () => {
        setFilteredStatus('new');
    }

    const renderedTodoList = todoList.filter(todo => filteredStatus === 'all' || filteredStatus === todo.status);
    // console.log(renderedTodoList);
    return (
        <div>
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