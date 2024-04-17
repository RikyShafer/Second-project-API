// מיובאת הספריות והרכיבים הנדרשים
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// הגדרת הרכיב UpdateTodos
const UpdateTodos = ({ id, todo, fetchTodos, setSelectedTodo  }) => {
  // הגדרת משתנים מקומיים באמצעות useState
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [completed, setCompleted] = useState(false);

  // הגדרת משתנה לניווט באמצעות React Router
  const navigate = useNavigate();

  // useEffect המפעיל שאילתא לשרת לפי המזהה של המשימה
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get(`http://localhost:2134/api/Todo/${id}`);
        setTitle(data.title || "");
        setTags(data.tags || []);
        setCompleted(data.completed || false);
      } catch (error) {
        console.error('שגיאה בשליפת המשימה:', error);
      }
    };

    // קריאה לפונקציה המביאה את המשימה מהשרת
    fetchTodos();

  }, [id]);

  // פונקציה המטפלת בשינויים בטופס
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

  // פונקציה המטפלת בשליחת הטופס
  const submitForm = async (event) => {
    event.preventDefault();

    try {
      // שליחת בקשת PUT לשרת
      await axios.put(`http://localhost:2134/api/Todo/`, {
      _id: id,
      title,
      tags,
      completed,
    });
      // איפוס selectedTodo ל-nul כדי לסגור את החלון
      setSelectedTodo(null);

      // קריאה לפונקציה המביאה מחדש את המשימות מהשרת
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect שמטפל בניווט לדף המשימות לאחר השמירה
  useEffect(() => {
    navigate("/todos");
  }, [navigate]);

  // הצגת הרכיב ב-HTML
  return (
    <>
      <form onSubmit={submitForm} className="form">
        {/* הזנת נתוני המשימה לטופס */}
        <div className="tytyty"> 
          <div className="form-input">
            <input
              value={title}
              placeholder={todo.title}
              required
              name="title"
              onChange={handleChange}
            />
            <input
              value={tags.join(",")}
              placeholder={todo.tags}
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
            <button type="submit">שמירה</button>
          </div>
        </div>
      </form>
    </>
  );
};

// ייצוא הרכיב UpdateTodos כיבוש ברירת המחדל
export default UpdateTodos;
