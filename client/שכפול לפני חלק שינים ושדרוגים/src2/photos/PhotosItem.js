// ייבוא רכיבים וספריות נחוצים
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeletePhotos from './DeletePhotos';
import React, { useState } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import UpdatePhotos from './UpdatePhotos';

// הצהרת רכיבים פונקציונליים עם פירוק אבזרים
const PhotosItem = ({ photo, fetchPhotos }) => {
// מצב משתנים לאישור מחיקה ולביצוע שנבחר
  const [, setDeleteConfirmation] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState(null);

// פונקציה לטיפול בפעולת המחיקה
  const handleDelete = (id) => {
    console.log(`Deleting Photo with id: ${id}`);
    setDeleteConfirmation(false);
  };

// פונקציה לטיפול בלחיצת כפתור העדכון
  const handleUpdateClick = (photo) => {
    setSelectedPhotos(photo);
  };
  console.log('Image URL:', photo.imageUrl);
  console.log('Image URL:', `http://localhost:2134/${photo.imageUrl}.jpg`);

  return (
// Container div עבור כל רכיב TodosItem
    <div className='todositem'>
{/* מציג פרטים כלליים */} 
      <div className="detailsGeneral">
        <div className="firstLet">{photo.title && photo.title.charAt(0)}</div>
        {/* {photo.createdAt} */}
      {new Date(photo.createdAt).toLocaleDateString()}

      </div>

{/* מציג פרטים ספציפיים */}
<div className='imgtexst'> 
      <h2 className="details">
        {photo.title} 
        <br></br>
        {photo._id}
        <br></br>
        {/* תמונות:  {photo.imageUrl} */}
      </h2>
      <img src={`http://localhost:2134/${photo.imageUrl}.jpg`} alt="" className='imgPhoto' />
      </div>
{/* מיכל לחצני פעולה */}
      <div className="buttons">

{/* מיכל עבור לחצן המחיקה */}
        <div className='buttonDel'> 
          <DeletePhotos id={photo._id} onDelete={handleDelete} photo={photo} fetchPhotos={fetchPhotos} />
        </div>

{/* מיכל עבור כפתור העדכון */}
        <div className='buttonUpdate'> 
{/* סמל לחצן עדכון */}
          <span className="pen-icon" onClick={() => handleUpdateClick(photo)}>
            <FontAwesomeIcon icon={faPen} id="fa"/>
          </span>
        </div>

{/* עיבוד מותנה של רכיב העדכון כאשר נבחר מטלה */}
        {selectedPhotos && selectedPhotos._id === photo._id && (
          <UpdatePhotos id={selectedPhotos._id} photo={photo} fetchPhotos={fetchPhotos} setSelectedPhotos={setSelectedPhotos} />
        )}
      </div>
    </div>
  );
};

// ייצוא רכיב TodosItem כייצוא ברירת המחדל
export default PhotosItem;
