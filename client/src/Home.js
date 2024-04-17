import React from 'react';
import {NavLink} from 'react-router-dom';

const Home = () => {
  return (
    <div className="Home">
      <h1 className='Home1' >Welcome to our Management System</h1>
      <p className='Home2'>This system allows you to manage tasks, posts, users, and photos.</p>
      <div className='home3'> 
      <NavLink to="/todos">{<h1> Create a new task </h1>}</NavLink>
      <NavLink to="/posts">{<h1> Create a new posts </h1>}</NavLink>
      <NavLink to="/users">{<h1> Create a new users </h1>}</NavLink>
      <NavLink to="/photos">{<h1> Create a new photos </h1>}</NavLink>
      </div>
    </div>
  );
}

export default Home;
