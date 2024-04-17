import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // יבוא של רכיב FontAwesomeIcon מהספרייה '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // יבוא של סמל faTrash מהספרייה '@fortawesome/free-solid-svg-icons'
import axios from "axios"; // יבוא של מודול axios מהספרייה 'axios'

// הגדרת רכיב DeletePosts כקומפוננטה פונקציונלית עם פרמטרים id, onDelete, post, fetchPosts
const DeletePosts = ({  post, fetchPosts }) => {
    const postId = post._id; // השמה של המזהה של הפוסט מתוך אובייקט הפוסט
    const data = { id: postId }; // הגדרת אובייקט data עם מזהה הפוסט
    console.log(data); // הדפסת המידע בקונסול

    // הגדרת פונקציה handleDelete באופן אסינכרוני
    const handleDelete = async (e) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this item?");
        if(userConfirmed){
        try {
            // ביצוע בקשת DELETE לשרת בכתובת 'http://localhost:2134/api/Posts/'
            await axios.delete('http://localhost:2134/api/Posts/', {
                headers: {
                    'Content-Type': 'application/json', // סוג נתוני הבקשה המתקבלים מהלקוח
                    "Accept": "application/json", // סוג נתוני התגובה הרצוים מהשרת
                },
                data: data // מידע המשולח עם בקשת המחיקה
            });
            console.log(data); // הדפסת המידע בקונסול
            fetchPosts(); // קריאה לפונקציה fetchPosts לרענון הפוסטים
        } catch (error) {
            if (error.response) {
                // טיפול בשגיאה מהשרת עם קוד תגובה
                console.error("Error response from server:", error.response.data);
                console.error("Status code:", error.response.status);
            } else if (error.request) {
                // התקבלה בקשה אך לא התקבלה תגובה מהשרת
                console.error("No response received from server");
            } else {
                // שגיאה בזמן יצירת הבקשה או הגדרתה
                console.error("Error setting up the request:", error.message);
            }
        }
    }
    };

    // החזרת תגית button עם אייקון של סל מחיקה, והגדרת פונקציה המתבצעת בלחיצה
    return (
        <button className="delConfirm" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} id="garbage" />
        </button>
    );
};

export default DeletePosts; // ייצוא הקומפוננטה DeletePosts לשימוש במקומות אחרים באפליקציה
