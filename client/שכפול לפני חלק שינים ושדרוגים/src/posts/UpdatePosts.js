import React, { useState, useEffect } from 'react'; // יבוא של מודולים מהספרייה 'react'
import axios from 'axios'; // יבוא של מודול axios מהספרייה 'axios'
import { useNavigate } from 'react-router-dom'; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'

// הגדרת קומפוננטת UpdatePosts כקומפוננטה פונקציונלית עם פרמטרים id, post, fetchPosts, setSelectedPosts
const UpdatePosts = ({ id, post, fetchPosts, setSelectedPosts }) => {
  const [title, setTitle] = useState(""); // הגדרת משתנה סטייט title עם ערך התחלתי של ריק
  const [body, setBody] = useState([]); // הגדרת משתנה סטייט body עם ערך התחלתי של מערך ריק

  const navigate = useNavigate(); // השמה של פונקצית הניווט useNavigate למשתנה navigate

  // ביצוע פעולות בעת טעינת הקומפוננטה
  useEffect(() => {
    // פונקציה המביאה את פרטי הפוסט מהשרת על פי ה-ID
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:2134/api/Posts/${id}`);
        setTitle(data.title || ""); // השמה של שדה הכותרת מהשרת או ריק אם אין ערך
        setBody(data.body || ""); // השמה של שדה הגוף מהשרת או ריק אם אין ערך
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    };

    fetchPosts(); // קריאה לפונקציה fetchPosts בעת טעינת הקומפוננטה

  }, [id]);

  // פונקציה המתבצעת בעת שינוי בערך של הקלט בטופס
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setTitle(value); // עדכון של שדה הכותרת בהתאם לשינוי בקלט
        break;
      case "body":
        setBody(value); // עדכון של שדה הגוף בהתאם לשינוי בקלט
        break;

      default:
        break;
    }
  };

  // פונקציה המתבצעת בעת שליחת הטופס
  const submitForm = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:2134/api/Posts/`, {
        _id: id,
        title,
        body,
      });

      // האפסת הפוסט הנבחר כדי לסגור את החלון
      setSelectedPosts(null);

      fetchPosts(); // קריאה לפונקציה fetchPosts לרענון הפוסטים
    } catch (error) {
      console.error(error);
    }
  };

  // ביצוע פעולות בעת שינוי בערך של הניווט
  useEffect(() => {
    navigate("/posts");
  }, [navigate]);

  // הצגת הקומפוננטה
  return (
    <>
      <form onSubmit={submitForm} className="form">
        <div className="tytyty">
          <div className="form-input">
            {/* שדה קלט לכותרת עם ערך ופלייסהולדר */}
            <input
              value={title}
              placeholder={post.title}
              required
              name="title"
              onChange={handleChange}
            />
            {/* שדה קלט לגוף עם ערך ופלייסהולדר */}
            <input
              value={body}
              placeholder={post.body}
              name="body"
              onChange={handleChange}
              type="text"
            />

            {/* כפתור שליחת הטופס */}
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdatePosts; // ייצוא הקומפוננטה UpdatePosts לשימוש במקומות אחרים באפליקציה
