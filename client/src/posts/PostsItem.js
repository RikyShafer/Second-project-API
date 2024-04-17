// ייבוא רכיבים וספריות נחוצים
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeletePosts from './DeletePosts';
import React, { useState } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Outlet, useNavigate } from 'react-router-dom';

// הצהרת רכיבים פונקציונליים עם פירוק אבזרים
const PostsItem = ({ post, fetchPosts }) => {
  // מצב משתנים לאישור מחיקה ולביצוע שנבחר
  const navigate = useNavigate();



  const [sowhHdit,setsowhHdit ]=useState(false)
  const handleEdit = async (e) => {
    const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
    setsowhHdit(true)
    navigate(`/posts/${id}`)

    
}

  return (
    // Container div עבור כל רכיב TodosItem
    <div className='todositem'>
      <div className="detailsGeneral">
        <div className="firstLet">{post.title && post.title.charAt(0)}</div>
        {/* {post.createdAt} */}
        {new Date(post.createdAt).toLocaleDateString()}

      </div>
      {/* מציג פרטים ספציפיים */}
      <div className="details" >
      <h1 className="details">
        {post.title} 
      </h1> 
      {/* <h6>  id = {post._id } </h6> */}
      <h3>  {post.body }  </h3>
    
      </div>
      
      {/* מיכל לחצני פעולה */}
      <div className="buttons">
   {/* מיכל עבור לחצן המחיקה */}
   <div className='buttonDel'> 
          {
          <DeletePosts id={post._id}  post={post} fetchPosts={fetchPosts}  />
          }
        
        </div>
{/* מיכל עבור כפתור העדכון */}
{/* סמל לחצן עדכון */}
<div className='buttonUpdate'> 
        {
          sowhHdit?<Outlet/> :""
        }
        <span className="pen-icon" >
        <button onClick={handleEdit} id={post._id} className='buttonUpdate' > <FontAwesomeIcon icon={faPen} id="fa" />
        </button>
          </span>
       
        </div>
      </div>
    </div>
  );
};
// ייצוא רכיב PostsItem כייצוא ברירת המחדל
export default PostsItem;
