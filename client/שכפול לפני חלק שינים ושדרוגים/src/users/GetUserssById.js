import axios from "axios"; // יבוא של מודול axios מהספרייה 'axios'
import { useState } from "react"; // יבוא של פונקציה useState מהספרייה 'react'
import { useNavigate } from "react-router-dom"; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // יבוא של רכיב FontAwesomeIcon מהספרייה '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faRotateLeft } from '@fortawesome/free-solid-svg-icons'; // יבוא של סמלים faMagnifyingGlass ו-faRotateLeft מהספרייה '@fortawesome/free-solid-svg-icons'
import UsersItem from "./UsersItem"; // יבוא של קומפוננטה UsereItem מהקובץ './UsereItem'

// הגדרת קומפוננטת GetUseresById כקומפוננטה פונקציונלית עם פרמטרים id, fetchUsere, onGetId
const GetUsereById = ({ id, fetchUsere, onGetId }) => {
    const Navigating = useNavigate(); // השמה של פונקצית הניווט useNavigate למשתנה Navigating
    const [user, setUsere] = useState({}); // הגדרת משתנה סטייט post עם ערך התחלתי של אובייקט ריק
    const [confirmSend, setConfirmSend] = useState(false); // הגדרת משתנה סטייט confirmSend עם ערך התחלתי של false

    // הגדרת פונקציה handleGetById באופן אסינכרוני
    const handleGetById = async (e) => {
        e.preventDefault(); // מניעת התנהגות הטופס הדיפולטית לאחר לחיצה על כפתור

        try {
            // ביצוע בקשת GET לשרת לפי המזהה הספציפי
            const { data } = await axios.get(`http://localhost:2134/api/Usere/${id}`);
            console.log(data); // הדפסת המידע בקונסול
            setUsere(data); // עדכון המשתנה סטייט user עם המידע שנקבל
            setConfirmSend(true); // עדכון המשתנה סטייט confirmSend לערך true
            fetchUsere(); // קריאה לפונקציה fetchUsere לרענון הפוסטים
        } catch (error) {
            console.error("Error setting up the request:", error.message); // טיפול בשגיאה במקרה של כל שגיאה אחרת
        }
    };

    // הגדרת פונקציה onReturn המפעילה כמה פעולות בלחיצה
    const onReturn = () => {
        setUsere({}); // החזרת המשתנה סטייט Usere לערך התחלתי של אובייקט ריק
        onGetId(); // קריאה לפונקציה onGetId
        Navigating("/posts"); // ניווט לנתיב "/Usere"
    };

    // החזרת תגית div המכילה כמה אלמנטים UI, כגון כפתורים וקומפוננטה UsereItem
    return (
        <div className="search">
            {/* כפתור החזרה שמפעיל את הפונקציה onReturn */}
            <button className="button confirmSearch" onClick={onReturn}>
                <FontAwesomeIcon icon={faRotateLeft} id="fa" />
            </button>
            {/* כפתור החיפוש המפעיל את הפונקציה handleGetById בלחיצה */}
            {(!confirmSend &&
                <button className="button butSearch" onClick={handleGetById}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} id="fa" />
                </button>) ||
                // תנאי להצגת הקומפוננטה PostsItem כאשר המשתנה confirmSend מכיל ערך true
                (confirmSend && <UsersItem user={user} fetchUsere={fetchUsere} />)
            }
        </div>
    );
};

export default GetUsereById; // ייצוא הקומפוננטה GetUsereById לשימוש במקומות אחרים באפליקציה
