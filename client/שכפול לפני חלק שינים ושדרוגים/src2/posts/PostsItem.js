// ייבוא רכיבים וספריות נחוצים
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeletePosts from './DeletePosts';
import React, { useState } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import UpdatePosts from './UpdatePosts';

// הצהרת רכיבים פונקציונליים עם פירוק אבזרים
const PostsItem = ({ post, fetchPosts }) => {
  // מצב משתנים לאישור מחיקה ולביצוע שנבחר
  const [, setDeleteConfirmation] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState(null);
  
// פונקציה לטיפול בפעולת המחיקה
  const handleDelete = (id) => {
    console.log(`Deleting Posts with id: ${id}`);
    setDeleteConfirmation(false);
  };

  // פונקציה לטיפול בלחיצת כפתור העדכון
  const handleUpdateClick = (post) => {
    setSelectedPosts(post);
  };

  return (
    // Container div עבור כל רכיב TodosItem
    <div className='todositem'>
      <div className="detailsGeneral">
        <div className="firstLet">{post.title && post.title.charAt(0)}</div>
        {/* {post.createdAt} */}
        {new Date(post.createdAt).toLocaleDateString()}

      </div>
      {/* מציג פרטים ספציפיים */}
      <h2 className="details">
        {post.title} 
        <br></br>
        {post._id}
        <br></br>
        כותרת:  {post.body }  לבדוק למה זה יוצר מהמסך אם זה יותר מידי גדול
      </h2>
      {/* מיכל לחצני פעולה */}
      <div className="buttons">
        <div className='buttonDel'> 
        {/* מיכל עבור לחצן המחיקה */}
          <DeletePosts id={post._id} onDelete={handleDelete} post={post} fetchPosts={fetchPosts} />
        </div>
        {/* מיכל עבור כפתור העדכון */}
        <div className='buttonUpdate'> 
        {/* סמל לחצן עדכון */}
          <span className="pen-icon" onClick={() => handleUpdateClick(post)}>
            <FontAwesomeIcon icon={faPen} id="fa"/>
          </span>
        </div>
        {/* עיבוד מותנה של רכיב העדכון כאשר נבחר מטלה */}
        {selectedPosts && selectedPosts._id === post._id && (
          <UpdatePosts id={selectedPosts._id} post={post} fetchPosts={fetchPosts} setSelectedPosts={setSelectedPosts} />
        )}
      </div>
    </div>
  );
};
// ייצוא רכיב PostsItem כייצוא ברירת המחדל
export default PostsItem;
