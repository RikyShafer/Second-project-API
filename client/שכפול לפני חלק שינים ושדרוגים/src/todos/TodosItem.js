// ייבוא רכיבים וספריות נחוצים
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteTodos from './DeleteTodos';
import React, { useState } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import UpdateTodos from './UpdateTodos';
import UpdateTodosComplete from './UpdateTodosComplete';

// הצהרת רכיבים פונקציונליים עם פירוק אבזרים
const TodosItem = ({ todo, fetchTodos }) => {
// מצב משתנים לאישור מחיקה ולביצוע שנבחר
  const [, setDeleteConfirmation] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

// פונקציה לטיפול בפעולת המחיקה
  const handleDelete = (id) => {
    console.log(`Deleting user with id: ${id}`);
    setDeleteConfirmation(false);
  };

// פונקציה לטיפול בלחיצת כפתור העדכון
  const handleUpdateClick = (todo) => {
    setSelectedTodo(todo);
  };
  return (
// Container div עבור כל רכיב TodosItem
    <div className='todositem'>
{/* מציג פרטים כלליים */}
      <div className="detailsGeneral">
        <div className="firstLet">{todo.title && todo.title.charAt(0)}</div>
        {/* {todo.createdAt} */}
       {new Date(todo.createdAt).toLocaleDateString()}

      </div>

{/* מציג פרטים ספציפיים */}
      <h2 className="details">
        {todo.title} 
        <br></br>
        {todo._id}
        <br></br>
        משימות:  {todo.tags && todo.tags.join(', ')}
      </h2>

{/* מיכל לחצני פעולה */}
      <div className="buttons">
{/* רכיב לעדכון סטטוס השלמת מטלות */}
        <UpdateTodosComplete todo={todo} fetchTodos={fetchTodos} />

{/* מיכל עבור לחצן המחיקה */}
        <div className='buttonDel'> 
          <DeleteTodos id={todo._id} onDelete={handleDelete} todo={todo} fetchTodos={fetchTodos} />
        </div>

{/* מיכל עבור כפתור העדכון */}
        <div className='buttonUpdate'> 
{/* סמל לחצן עדכון */}
          <span className="pen-icon" onClick={() => handleUpdateClick(todo)}>
            <FontAwesomeIcon icon={faPen} id="fa"/>
          </span>
        </div>

{/* עיבוד מותנה של רכיב העדכון כאשר נבחר מטלה */}
        {selectedTodo && selectedTodo._id === todo._id && (
          <UpdateTodos id={selectedTodo._id} todo={todo} fetchTodos={fetchTodos}   setSelectedTodo={setSelectedTodo} />
        )}
      </div>
    </div>
  );
};

// ייצוא רכיב TodosItem כייצוא ברירת המחדל
export default TodosItem;
