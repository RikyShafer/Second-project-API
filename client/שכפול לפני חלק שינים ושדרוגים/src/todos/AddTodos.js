// מיובא הספריות הנדרשות
import { useState } from "react";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

// הגדרת הרכיב AddTodos
const AddTodos = ({ fetchTodos, onAdd }) => {
  // הגדרת משתנים מקומיים לקבלת הקלטים מהטופס
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [completed, setCompleted] = useState(false);

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
    if (!title) return;

    try {
      // שליחת בקשת POST לשרת
      await axios.post("http://localhost:2134/api/Todo", {
        title,
        tags,
        completed,
      });

      // איפוס יצירת המשתנים לתוך הטופס
      setTitle("");
      setTags([]);
      setCompleted(false);

      // התראה לרכיב האב להפעיל אנימציה
      fetchTodos();
      onAdd();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <> 
    {/* // טופס ההוספת משימה */}
    <form onSubmit={submitForm} className="form">

      <div className="tytyty">
      {/* <Link to="/todos" >  <FontAwesomeIcon icon={faRightFromBracket} style={{ backgroundColor: "white" }} /> </Link> */}

        {/* קלט עבור כותרת המשימה */}
        <div className="form-input"></div>
        <input
          value={title}
          placeholder="נא להוסיף כותרת"
          required
          name="title"
          onChange={handleChange}
        />

        {/* קלט עבור התגיות (נפרדות בפסיק) */}
        <input
          value={tags.join(",")}
          placeholder="תגיות (נפרדות בפסיק)"
          name="tags"
          onChange={handleChange}
          type="text"
        />

        {/* קלט עבור הסטטוס "הושלמה" */}
        <input
          type="checkbox"
          checked={completed}
          name="completed"
          onChange={handleChange}
        />
        <label htmlFor="completed">הושלמה</label>

        {/* כפתור לשליחת הטופס */}
        <button disabled={!title} type="submit">
          שלח
        </button>
      </div>
    </form>
    </>
  );
};

// ייצוא הרכיב AddTodos כיבוש ברירת המחדל
export default AddTodos;
