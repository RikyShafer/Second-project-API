// מיובאת הספריות והרכיבים הנדרשים
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// הגדרת הרכיב UpdateTodos
const UpdatePhotos = () => {
  // הגדרת משתנים מקומיים באמצעות useState
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");


  // הגדרת משתנה לניווט באמצעות React Router
  const navigate = useNavigate();

  // useEffect המפעיל שאילתא לשרת לפי המזהה של המשימה
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await axios.get(`http://localhost:2134/api/Photo/${id}`);
        console.log('Received data:', data);
                setTitle(data.title || "");
                 setImageUrl(data.imageUrl || "");
      } catch (error) {
        console.error('שגיאה בשליפת המשימה:', error);
      }
    };

    
    // קריאה לפונקציה המביאה את המשימה מהשרת
    fetchPhotos();

  }, [id]);

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
console.log(imageUrl+"Ddsfd");
console.log(title+"Sff");
  // פונקציה המטפלת בשליחת הטופס
  const submitForm = async (event) => {
    event.preventDefault();

    try {
      // שליחת בקשת PUT לשרת
      await axios.put(`http://localhost:2134/api/Photo`, {
        _id: id,
        title,
        imageUrl,

      });

      navigate('/photos');

    } catch (error) {
      console.error(error);
    }
  };


  // הצגת הרכיב ב-HTML
  return (
    <>
      <form onSubmit={submitForm} className="form">
        {/* הזנת נתוני המשימה לטופס */}
        <div className="tytyty">
          <div className="form-input">
            <input
              value={title}
              placeholder={title}
              name="title"
              onChange={handleChange}
            />
            <input
              value={imageUrl}
              placeholder={imageUrl}
              name="imageUrl"
              onChange={handleChange}
              type="text"
            />

            <button type="submit">שמירה</button>
            <Link to="/photos"><FontAwesomeIcon icon={faRightFromBracket} /></Link>

          </div>
        </div>
      </form>
    </>
  );
};

// ייצוא הרכיב UpdateTodos כיבוש ברירת המחדל
export default UpdatePhotos;

