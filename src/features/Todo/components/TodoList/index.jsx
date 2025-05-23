import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func
};
TodoList.defaultProps = {
    todoList: [],
    onTodoClick: null

}
function TodoList({ todoList, onTodoClick }) {
    const handleTodoClick = (todo, idx) => {
        if (!onTodoClick) return;
        onTodoClick(todo, idx);
    }
    return (
        <ul className="todo-list">
            {todoList.map((todo, idx) => (
                <li
                    key={todo.id}
                    className={classnames({
                        'todo-item': true,// class luôn có
                        completed: todo.status === 'completed'// class có thể có
                    })}
                    onClick={() => handleTodoClick(todo, idx)}
                >
                    {todo.title}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;