import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './common/Layout';
import TodosList from './todos/TodosList'; // Import the TodosList component
import PostsList from './posts/PostsList';
import UsereList from './users/UsersList';
import PhotosList from './photos/PhotosList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<h1>Home page</h1>} />
            <Route path='/todos' element={<TodosList />} />
            <Route path='/posts' element={<PostsList />} />
            <Route path='/users' element={<UsereList />} />
            <Route path='/photos' element={<PhotosList />} />


            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
