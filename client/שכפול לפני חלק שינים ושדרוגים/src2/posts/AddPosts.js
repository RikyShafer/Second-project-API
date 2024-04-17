// מיובאות הספריות והרכיבים הנדרשים
import { useState } from "react";
import axios from "axios";

// הגדרת הרכיב AddPosts
const AddPosts = ({ fetchPosts, onAdd }) => {
  // הגדרת משתנים מקומיים באמצעות useState
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // פונקציה שמטפלת בשינויים בטופס
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "body":
        setBody(value);
        break;
      default:
        break;
    }
  };

  // פונקציה המטפלת בשליחת הטופס
  const submitForm = async (event) => {
    event.preventDefault();
    if (!title) return;

    try {
      // שליחת בקשת POST לשרת
      await axios.post("http://localhost:2134/api/Posts", {
        title,
        body,
      });

      // איפוס נתוני הטופס
      setTitle("");
      setBody("");

      // קריאה לפונקציה המביאה מחדש את הפוסטים מהשרת
      fetchPosts();
      onAdd();
    } catch (error) {
      console.error(error);
    }
  };

  // הצגת הרכיב ב-HTML
  return (
    <form onSubmit={submitForm} className="form">
      <div className="tytyty"> 
        <div className="form-input"></div>
        <input
          value={title}
          placeholder="Please add title"
          required
          name="title"
          onChange={handleChange}
        />
        <input
          value={body}
          placeholder="Please add body"
          name="body"
          onChange={handleChange}
          type="text"
        />
        <button disabled={!title} type="submit">
          Send
        </button>
      </div>
    </form>
  );
};

// ייצוא הרכיב AddPosts כיבוש ברירת המחדל
export default AddPosts;
