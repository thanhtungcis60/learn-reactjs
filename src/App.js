import logo from './logo.svg';
// import './App.css';
import React, { use, useEffect, useState } from 'react';
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Album';
import ColorBox from './components/ColorBox';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';

function One() {
  return (<div>
    <h2>So 1 tap 1</h2>
    <h3>So 1 tap 2</h3>
  </div>)
}

var Two = function () {
  return (<div>
    <h3>So 2 tap 1</h3>
    <h3>So 2 tap 2</h3>
  </div>)
}
var Three = () => (<div>
  <h3>So 3 tap 1</h3>
  <h3>So 3 tap 2</h3>
</div>)

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍' },
    { id: 2, title: 'We love Easy Frontend! 😎' },
    { id: 3, title: 'They love Easy Frontend! 🚀' },
  ]);

  // Giả định bạn có một state để lưu trữ danh sách bài viết
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      // Logic để fetch danh sách bài viết từ API
      try {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON }); // In ra dữ liệu JSON nhận được

        const { data } = responseJSON; // Lấy trường 'data' từ responseJSON
        setPostList(data); // Cập nhật state `postList` với dữ liệu nhận được
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message); // Xử lý lỗi nếu có
      }
    }
    console.log('PostList effect ');
    fetchPostList(); // Gọi hàm fetchPostList khi component mount

    // TODO: Bạn có thể thêm dependency array vào useEffect nếu cần chạy lại khi có sự thay đổi
    // Ví dụ: useEffect(() => { ... }, [someDependency]);
    // Nếu dependency array là rỗng (`[]`), nó sẽ chỉ chạy một lần sau lần render đầu tiên.
  }, []); // Dependency array rỗng, hàm này sẽ chỉ chạy một lần khi component mount

  useEffect(() => {
    console.log('TODO list effect ');
  });


  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }
  function handleTodoFormSubmit(formValues) {
    console.log("todo form submit", formValues);
    const newTodo = {
      id: todoList.length + 1,
      title: formValues.title,
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>React hooks - PostList</h1>
      {/* <TodoForm onSubmit={handleTodoFormSubmit} ></TodoForm> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      <PostList posts={postList} ></PostList>
    </div>
  );
}

// function App() {
//   const age = 18;
//   const name = 'TTT';
//   const isFemale = true;
//   const student = {
//     name: 'Easy Frontend'
//   };
//   const colorList = ['red', 'green', 'blue'];

//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Xin chào {name} - {age} - {isFemale ? 'Female' : 'Male'}</p>
//         {isFemale ? <p>Female</p> : <p>Male</p>}
//         {isFemale &&
//           (<>
//             <p>Female 1</p>
//             <p>Female 2</p>
//             <p>Female 3</p>
//           </>)
//         }
//         {isFemale &&
//           (<div>
//             <p>Female 1</p>
//             <p>Female 2</p>
//             <p>Female 3</p>
//           </div>)
//         }
//         {isFemale &&
//           (<React.Fragment>
//             <p>Female 1</p>
//             <p>Female 2</p>
//             <p>Female 3</p>
//           </React.Fragment>)
//         }
//         {!isFemale && <p>Male</p>}

//         <p>student.name: {student.name}</p>

//         <ol>
//           {colorList.map(color => <li style={{ color }}>{color}</li>)}
//         </ol>
//       </header>
//        */}

//       {/* <TodoFeature /> */}
//       {/* <AlbumFeature /> */}
//       <ColorBox />
//       {/* <Counter /> */}


//     </div>
//   );
// }


export default App;
