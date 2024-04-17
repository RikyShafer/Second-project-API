import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './common/Layout';
import TodosList from './todos/TodosList';
import PostsList from './posts/PostsList';
import UsereList from './users/UsersList';
import PhotosList from './photos/PhotosList';
import UpdateTodos from './todos/UpdateTodos';
import UpdatePosts from './posts/UpdatePosts';
import UpdateUsere from './users/UpdateUsers';
import UpdatePhotos from './photos/UpdatePhotos';

import Home from './Home';  // Use 'Home' with a capital 'H'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>

            <Route index element={<Home />} />

            <Route path='/todos' element={<TodosList />} >
              <Route path='/todos/:id' element={<UpdateTodos />} />
            </Route>

            <Route path='/posts' element={<PostsList />} >
              <Route path='/posts/:id' element={<UpdatePosts />} />

            </Route>


            <Route path='/users' element={<UsereList />} >
              <Route path='/users/:id' element={<UpdateUsere />} />

            </Route>
            <Route path='/photos' element={<PhotosList />} >
              <Route path='/photos/:id' element={<UpdatePhotos />} />
            </Route>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
