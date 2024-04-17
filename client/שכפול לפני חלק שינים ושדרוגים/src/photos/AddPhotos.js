// מיובא הספריות הנדרשות
import { useState } from "react";
import axios from "axios";

// הגדרת הרכיב AddTodos
const AddPhotos = ({ fetchPhotos, onAdd }) => {
  // הגדרת משתנים מקומיים לקבלת הקלטים מהטופס
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // פונקציה המטפלת בשינויים בטופס
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "imageUrl":
        setImageUrl(value);
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
      await axios.post("http://localhost:2134/api/Photo", {
        title,
        imageUrl,
      });

      // איפוס יצירת המשתנים לתוך הטופס
      setTitle("");
      setImageUrl("");

      // התראה לרכיב האב להפעיל אנימציה
      fetchPhotos();
      onAdd();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // טופס ההוספת משימה
    <form onSubmit={submitForm} className="form">
      <div className="tytyty">
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
          value={imageUrl}
          placeholder="imag"
          name="imageUrl"
          onChange={handleChange}
          type="text"
        />

       

        {/* כפתור לשליחת הטופס */}
        <button disabled={!title} type="submit">
          שלח
        </button>
      </div>
    </form>
  );
};

// ייצוא הרכיב AddTodos כיבוש ברירת המחדל
export default AddPhotos;
