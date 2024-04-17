import axios from "axios"; // יבוא של מודול axios מהספרייה 'axios'
import { useState } from "react"; // יבוא של פונקציה useState מהספרייה 'react'
import { useNavigate } from "react-router-dom"; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // יבוא של רכיב FontAwesomeIcon מהספרייה '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faRotateLeft } from '@fortawesome/free-solid-svg-icons'; // יבוא של סמלים faMagnifyingGlass ו-faRotateLeft מהספרייה '@fortawesome/free-solid-svg-icons'
import PostsItem from "./PostsItem"; // יבוא של קומפוננטה PostsItem מהקובץ './PostsItem'

// הגדרת קומפוננטת GetPostsById כקומפוננטה פונקציונלית עם פרמטרים id, fetchPosts, onGetId
const GetPostsById = ({ id, fetchPosts, onGetId }) => {
    const Navigating = useNavigate(); // השמה של פונקצית הניווט useNavigate למשתנה Navigating
    const [post, setPosts] = useState({}); // הגדרת משתנה סטייט post עם ערך התחלתי של אובייקט ריק
    const [confirmSend, setConfirmSend] = useState(false); // הגדרת משתנה סטייט confirmSend עם ערך התחלתי של false

    // הגדרת פונקציה handleGetById באופן אסינכרוני
    const handleGetById = async (e) => {
        e.preventDefault(); // מניעת התנהגות הטופס הדיפולטית לאחר לחיצה על כפתור

        try {
            // ביצוע בקשת GET לשרת לפי המזהה הספציפי
            const { data } = await axios.get(`http://localhost:2134/api/Posts/${id}`);
            console.log(data); // הדפסת המידע בקונסול
            setPosts(data); // עדכון המשתנה סטייט post עם המידע שנקבל
            setConfirmSend(true); // עדכון המשתנה סטייט confirmSend לערך true
            fetchPosts(); // קריאה לפונקציה fetchPosts לרענון הפוסטים
        } catch (error) {
            console.error("Error setting up the request:", error.message); // טיפול בשגיאה במקרה של כל שגיאה אחרת
        }
    };

    // הגדרת פונקציה onReturn המפעילה כמה פעולות בלחיצה
    const onReturn = () => {
        setPosts({}); // החזרת המשתנה סטייט post לערך התחלתי של אובייקט ריק
        onGetId(); // קריאה לפונקציה onGetId
        Navigating("/posts"); // ניווט לנתיב "/posts"
    };

    // החזרת תגית div המכילה כמה אלמנטים UI, כגון כפתורים וקומפוננטה PostsItem
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
                (confirmSend && <PostsItem post={post} fetchPosts={fetchPosts} />)
            }
        </div>
    );
};

export default GetPostsById; // ייצוא הקומפוננטה GetPostsById לשימוש במקומות אחרים באפליקציה
