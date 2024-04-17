// מיובאות הספריות והרכיבים הנדרשים
import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

// הגדרת הרכיב UpdateTodosComplete
const UpdateTodosComplete = ({ todo, fetchTodos }) => {
    // פונקציה המטפלת בשינוי במצב ההשלמה של המשימה
    const handleToggleCompletion = async () => {
        try {
            // שליחת בקשת PUT לשרת על מנת לשנות את מצב ההשלמה של המשימה
            await axios.put(`http://localhost:2134/api/Todo/`, {
                _id: todo._id,
                title: todo.title,
                tags: todo.tags,
                completed: !todo.completed, // החלפת מצב ההשלמה
            });

            // שליפת משימות עדכניות לאחר עדכון מוצלח
            fetchTodos();
        } catch (error) {
            console.error(error);
        }
    };

    // הצגת הרכיב ב-HTML
    return (
        <>
            {/* כפתור לשינוי במצב ההשלמה */}
            <button onClick={handleToggleCompletion} className='completed'>
                {/* הצגת אייקון בהתאם למצב ההשלמה */}
                {  todo.completed ? <FontAwesomeIcon icon={faCheck} id='faCheck' />  :  <FontAwesomeIcon icon={faXmark}  id='faXmark' />}  
                completed 
            </button>
        </>
    );
};

// ייצוא הרכיב UpdateTodosComplete כיבוש ברירת המחדל
export default UpdateTodosComplete;
