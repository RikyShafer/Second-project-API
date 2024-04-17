// מיובאת הספריות והרכיבים הנדרשים
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// הגדרת הרכיב UpdateTodos
const UpdatePhotos = ({ id, photo, fetchPhotos, setSelectedPhotos }) => {
  // הגדרת משתנים מקומיים באמצעות useState
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // הגדרת משתנה לניווט באמצעות React Router
  const navigate = useNavigate();

  // useEffect המפעיל שאילתא לשרת לפי המזהה של המשימה
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await axios.get(`http://localhost:2134/api/Photo${id}`);
        setTitle(data.title || "");
        setImageUrl(data.imageUrl ||"");
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

      // איפוס selectedTodo ל-nul כדי לסגור את החלון
      setSelectedPhotos(null);

      // קריאה לפונקציה המביאה מחדש את המשימות מהשרת
      fetchPhotos();
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect שמטפל בניווט לדף המשימות לאחר השמירה
  useEffect(() => {
    navigate("/photos");
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
              placeholder={photo.title}
              required
              name="title"
              onChange={handleChange}
            />
            <input
              value={imageUrl}
              placeholder={photo.imageUrl}
              name="imageUrl"
              onChange={handleChange}
              type="text"
            />
          
            <button type="submit">שמירה</button>
          </div>
        </div>
      </form>
    </>
  );
};

// ייצוא הרכיב UpdateTodos כיבוש ברירת המחדל
export default UpdatePhotos;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const UpdatePhotos = ({ id, photo, fetchPhotos, selectedPhotos }) => {
//   const [title, setTitle] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get(`http://localhost:2134/api/Photo/${id}`);
//         setTitle(data.title || "");
//         setImageUrl(data.imageUrl || "");
//       } catch (error) {
//         console.error('Error fetching Photo:', error);
//       }
//     };

//     fetchData();

//   }, [id]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     switch (name) {
//       case "title":
//         setTitle(value);
//         break;
//       case "imageUrl":
//         setImageUrl(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const submitForm = async (event) => {
//     event.preventDefault();

//     try {
//       await axios.put(`http://localhost:2134/api/Photo/${id}`, {
//         title,
//         imageUrl,
//       });

//       selectedPhotos(null);
//       fetchPhotos();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     navigate("/photos");
//   }, [navigate]);

//   return (
//     <>
//       <form onSubmit={submitForm} className="form">
//         <div className="tytyty">
//           <div className="form-input">
//             <label>
//               Title:
//               <input
//                 value={title}
//                 required
//                 name="title"
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Image URL:
//               <input
//                 value={imageUrl}
//                 name="imageUrl"
//                 onChange={handleChange}
//                 type="text"
//               />
//             </label>
//             <button type="submit">Save</button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default UpdatePhotos;
