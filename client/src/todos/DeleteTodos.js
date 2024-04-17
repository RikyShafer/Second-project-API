// מיובא האייקונים הנדרשים מהספרייה
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// מיובאת הספריה הנדרשת לשליחת בקשות HTTP
import axios from "axios";

// הגדרת הרכיב DeleteTodos
const DeleteTodos = ({   todo, fetchTodos }) => {


    // הגדרת משתנה המכיל את המזהה של המשימה
    const todoId = todo._id;

    // הגדרת אובייקט עם המידע שיש לשלוח בבקשה לשרת
    const data = { id: todoId };
    // console.log(data);

    // פונקציה המטפלת במחיקת המשימה מהשרת
    const handleDelete = async (e) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this item?");
    if(userConfirmed){
        try {
            // שליחת בקשת DELETE לשרת
            await axios.delete('http://localhost:2134/api/Todo/', {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                },
                data: data
            });
       

         
            // הודעה לשליחת בקשה לשרת לשדרוג המשימות
            fetchTodos();
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
}
        // הפעלת פונקצית המחיקה מהפורנט
    };



    
    // החזרת כפתור מחיקה עם אייקון
    return (
        
        <button className="delConfirm" onClick={handleDelete} ><FontAwesomeIcon icon={faTrash} id="garbage" />
        </button>



    );
};

// ייצוא הרכיב DeleteTodos כיבוש ברירת המחדל
export default DeleteTodos;












// // מיובא האייקונים הנדרשים מהספרייה
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  faUserXmark } from '@fortawesome/free-solid-svg-icons';

// // מיובאת הספריה הנדרשת לשליחת בקשות HTTP
// import axios from "axios";

// // // הגדרת הרכיב DeleteTodos
// // const DeleteTodos = ({ id, onDelete, todo, fetchTodos }) => {
// //     // console.log("DWfweqafr");
// //     // הגדרת משתנה המכיל את המזהה של המשימה
// //     const todoId = todo._id;

// //     // הגדרת אובייקט עם המידע שיש לשלוח בבקשה לשרת
// //     const data = { id: todoId };
// //     // console.log(data);

// //     // פונקציה המטפלת במחיקת המשימה מהשרת
// //     const handleDelete = async (e) => {
// //         e.preventDefault();
// //         const isConfirmed = window.confirm("Are you sure you want to delete this item?");

// //         if (isConfirmed) {
// //         try {
// //             // שליחת בקשת DELETE לשרת
// //             await axios.delete('http://localhost:2134/api/Todo/', {
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                     "Accept": "application/json",
// //                 },
// //                 data: data
// //             });

// //             // הודעה לשליחת בקשה לשרת לשדרוג המשימות

// //             onDelete(id);
// //             fetchTodos();
// //         } catch (error) {
// //             // טיפול בשגיאות אם הן מתרחשות
// //             if (error.response) {
// //                 console.error("תגובה שגויה מהשרת:", error.response.data);
// //                 console.error("קוד סטטוס:", error.response.status);
// //             } else if (error.request) {
// //                 // הבקשה נשלחה אך לא התקבלה תגובה
// //                 console.error("לא התקבלה תגובה מהשרת");
// //             } else {
// //                 // ייתכן שישנה בעיה בהגדרת הבקשה שגרמה לשגיאה
// //                 console.error("שגיאה בהגדרת הבקשה:", error.message);
// //             }
// //         }
        
// //         // הפעלת פונקצית המחיקה מהפורנט
// //     };
// //     }
// //     // החזרת כפתור מחיקה עם אייקון
// //     return (
// //         // <button className="delConfirm" onClick={handleDelete} ><FontAwesomeIcon icon={faTrash} id="garbage" />
// //         // </button>
// //         // <button className="delConfirm"onClick={handleDelete}><FontAwesomeIcon icon={faUserXmark} id="fa"/></button>
// //         <button className="delConfirm" onClick={handleDelete}>
// //         <FontAwesomeIcon icon={faUserXmark} id="fa" />
// //     </button>
// //         );
// // };

// // // ייצוא הרכיב DeleteTodos כיבוש ברירת המחדל
// // export default DeleteTodos;


// const DeleteTodos = ({ id, onDelete, todo, fetchTodos }) => {
//     const handleDelete = async (e) => {
//         e.preventDefault();
//         // Display a confirmation dialog
//         const isConfirmed = window.confirm("Are you sure you want to delete this item?");

//         if (isConfirmed) {
//             try {
//                 // Send DELETE request to the server
//                 await axios.delete('http://localhost:2134/api/Todo/', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         "Accept": "application/json",
//                     },
//                     data: { id: todo._id }
//                 });

//                 // Update state or perform any necessary actions after successful deletion
//             } catch (error) {
//                 // Handle errors
//                 console.error("Error deleting item:", error);
//             } finally {
//                 // Call onDelete and fetchTodos outside of the try-catch block
//                 onDelete(id);
//                 fetchTodos();
//             }
//         }
//     };

//     return (
//         <button className="delConfirm" onClick={handleDelete}>
//             <FontAwesomeIcon icon={faUserXmark} id="fa" />
//         </button>
//     );
// };

// export default DeleteTodos;
