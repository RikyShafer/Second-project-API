
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const UpdateTodos = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate()
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get(`http://localhost:2134/api/Todo/${id}`);
        setTitle(data.title || "");
        setTags(data.tags || []);
        setCompleted(data.completed || false);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTodos();
  }, [id]);





  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "tags":
        setTags(value.split(","));
        break;
      case "completed":
        setCompleted(event.target.checked);
        break;
      default:
        break;
    }
  };


const submitForm = async (e) => {
  e.preventDefault();

  try {
    await axios.put("http://localhost:2134/api/Todo/", {
      _id: id,
      title,
      tags,
      completed,
    });


  }
   catch (error) {
    console.error("Error while updating task:", error);
  }
   navigate(`/todos/`);


};

  
  


  return (
    <form onSubmit={submitForm} className="form">
      <div className="tytyty">
        <div className="form-input">
          <input
            value={title}
            placeholder="Title"
            required
            name="title"
            onChange={handleChange}
          />
          <input
            value={tags.join(",")}
            placeholder="Tags"
            name="tags"
            onChange={handleChange}
            type="text"
          />
          <input
            type="checkbox"
            checked={completed}
            name="completed"
            onChange={handleChange}
          />
          <label htmlFor="completed">הושלמה</label>
          <button type="submit" >שמירה           
</button>
          <Link to="/todos"><FontAwesomeIcon icon={faRightFromBracket} /></Link>

        </div>
      </div>
    </form>
  );
};

export default UpdateTodos;
