// מיובא האייקונים הנדרשים מהספרייה
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// מיובאת הספריה הנדרשת לשליחת בקשות HTTP
import axios from "axios";

// הגדרת הרכיב DeleteTodos
const DeleteUsere = ({ id, onDelete, user, fetchUsers }) => {
    console.log("DWfweqafr");
    // הגדרת משתנה המכיל את המזהה של המשימה
    const userId = user._id;

    // הגדרת אובייקט עם המידע שיש לשלוח בבקשה לשרת
    const data = { id: userId };
    console.log(data);

    // פונקציה המטפלת במחיקת המשימה מהשרת
    const handleDelete = async (e) => {
        try {
            // שליחת בקשת DELETE לשרת
            await axios.delete(`http://localhost:2134/api/Usere/`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                },
                data: data
            });

            // הודעה לשליחת בקשה לשרת לשדרוג המשימות
            fetchUsers();
        } catch (error) {
            // טיפול בשגיאות אם הן מתרחשות
            if (error.response) {
                console.error("תגובה שגויה מהשרת:", error.response.data);
                console.error("קוד סטטוס:", error.response.status);
            } else if (error.request) {
                // הבקשה נשלחה אך לא התקבלה תגובה
                console.error("לא התקבלה תגובה מהשרת");
            } else {
                // ייתכן שישנה בעיה בהגדרת הבקשה שגרמה לשגיאה
                console.error("שגיאה בהגדרת הבקשה:", error.message);
            }
        }
        
        // הפעלת פונקצית המחיקה מהפורנט
        onDelete(id);
    };

    // החזרת כפתור מחיקה עם אייקון
    return (
        <button className="delConfirm" onClick={handleDelete} ><FontAwesomeIcon icon={faTrash} id="garbage" />
        </button>
    );
};

// ייצוא הרכיב DeleteTodos כיבוש ברירת המחדל
export default DeleteUsere;
