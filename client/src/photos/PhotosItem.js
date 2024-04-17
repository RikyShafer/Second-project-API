// ייבוא רכיבים וספריות נחוצים
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeletePhotos from './DeletePhotos';
import React, { useState } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Outlet, useNavigate } from 'react-router-dom';

// הצהרת רכיבים פונקציונליים עם פירוק אבזרים
const PhotosItem = ({ photo, fetchPhotos }) => {
// מצב משתנים לאישור מחיקה ולביצוע שנבחר

const navigate = useNavigate();


const [sowhHdit,setsowhHdit ]=useState(false)
const handleEdit = async (e) => {
  const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
  setsowhHdit(true)
  navigate(`/photos/${id}`)

  
}
  // console.log('Image URL:', photo.imageUrl);
  // console.log('Image URL:', `http://localhost:2134/${photo.imageUrl}.jpg`);

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
      שם התמונה - {photo.title}  
        {/* <br></br>
        {photo._id} */}
        <br></br>
        {/* תמונות:  {photo.imageUrl} */}
      </h2>
      <img src={`http://localhost:2134/${photo.imageUrl}.jpg`} alt="" className='imgPhoto' />
      </div>
{/* מיכל לחצני פעולה */}
      <div className="buttons">

{/* מיכל עבור לחצן המחיקה */}
<div className='buttonDel'> 
          {
          <DeletePhotos id={photo._id}  photo={photo} fetchPhotos={fetchPhotos}  />
          }
        
        </div>


{/* מיכל עבור כפתור העדכון */}
{/* סמל לחצן עדכון */}
<div className='buttonUpdate'> 
        {
          sowhHdit?<Outlet/> :""
        }
        <span className="pen-icon" >
        <button onClick={handleEdit} id={photo._id} className='buttonUpdate' > <FontAwesomeIcon icon={faPen} id="fa" />
        </button>
          </span>
       
        </div>
      </div>
    </div>
  );
};

// ייצוא רכיב TodosItem כייצוא ברירת המחדל
export default PhotosItem;
