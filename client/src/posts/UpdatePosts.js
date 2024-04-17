import React, { useState, useEffect } from 'react'; // יבוא של מודולים מהספרייה 'react'
import axios from 'axios'; // יבוא של מודול axios מהספרייה 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// הגדרת קומפוננטת UpdatePosts כקומפוננטה פונקציונלית עם פרמטרים id, post, fetchPosts, setSelectedPosts
const UpdatePosts = () => {
  const { id } = useParams();

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

      navigate('/posts');
    } catch (error) {
      console.error(error);
    }
  };



  // הצגת הקומפוננטה
  return (
    <>
      <form onSubmit={submitForm} className="form">
        <div className="tytyty">
          <div className="form-input">
            {/* שדה קלט לכותרת עם ערך ופלייסהולדר */}
            <input
              value={title}
              placeholder={title}
              name="title"
              onChange={handleChange}
            />
            {/* שדה קלט לגוף עם ערך ופלייסהולדר */}
            <input
              value={body}
              placeholder={body}
              name="body"
              onChange={handleChange}
              type="text"
            />

            {/* כפתור שליחת הטופס */}
            <button type="submit">Save</button>
            <Link to="/posts"><FontAwesomeIcon icon={faRightFromBracket} /></Link>

          </div>
        </div>
      </form>
    </>
  );
};

export default UpdatePosts; // ייצוא הקומפוננטה UpdatePosts לשימוש במקומות אחרים באפליקציה
