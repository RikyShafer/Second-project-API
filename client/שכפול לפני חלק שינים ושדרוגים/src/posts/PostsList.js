import React, { useState, useEffect } from 'react'; // יבוא של מודולים מהספריות 'react'
import axios from 'axios'; // יבוא של מודול axios מהספרייה 'axios'
import PostsItem from './PostsItem'; // יבוא של קומפוננטה PostsItem מהקובץ './PostsItem'
import AddPosts from './AddPosts'; // יבוא של קומפוננטה AddPosts מהקובץ './AddPosts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // יבוא של רכיב FontAwesomeIcon מהספרייה '@fortawesome/react-fontawesome'
import { faRotateLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons'; // יבוא של סמלים faRotateLeft ו-faUserPlus מהספרייה '@fortawesome/free-solid-svg-icons'

// הגדרת קומפוננטת PostsList כקומפוננטה פונקציונלית
const PostsList = () => {
    const [q, setQ] = useState(""); // הגדרת משתנה סטייט q עם ערך התחלתי ריק
    const [posts, setPosts] = useState([]); // הגדרת משתנה סטייט posts עם ערך התחלתי של מערך ריק
    const [showAddPostsForm, setShowAddPostsForm] = useState(false); // הגדרת משתנה סטייט showAddPostsForm עם ערך התחלתי של false
    const [searchBy, setSearchBy] = useState("id"); // הגדרת משתנה סטייט searchBy עם ערך התחלתי של "id"
    const [id, setId] = useState(""); // הגדרת משתנה סטייט id עם ערך התחלתי ריק
    const [err, setErr] = useState(""); // הגדרת משתנה סטייט err עם ערך התחלתי ריק

    const [request, setRequest] = useState(false); // הגדרת משתנה סטייט request עם ערך התחלתי של false

    // פונקציה המבצעת בקשת GET לשרת לקבלת רשימת הפוסטים
    const fetchPosts = async () => {
        try {
            const { data } = await axios.get('http://localhost:2134/api/Posts');
    
            // Ensure that data is an array before setting posts
            if (Array.isArray(data)) {
                setPosts(data);
                setErr(""); // Reset error if successful
            } else {
                console.error('Invalid data format. Expected an array.');
                setPosts([]); // Set posts to an empty array
                setErr('Error fetching posts. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]); // Set posts to an empty array on error
            setErr('Error fetching posts. Please try again.');
        }
    };
    // פונקציה המתבצעת כאשר מתבצעת חיפוש
    const onSearch = (e) => {
        const value = e.target.value; // השמה של ערך התיבה של החיפוש
        const validId = posts.find((post) => post._id.toLowerCase() === value.toLowerCase()); // בדיקה אם הערך של ה-ID קיים ברשימת הפוסטים

        if (validId && searchBy === "id") {
            setId(value);
            setErr("");
        } else if (searchBy === "name") {
            setQ(value);
            setErr("");
        } else {
            setErr("Invalid input or ID doesn't exist, please try again."); // הגדרת שגיאה במקרה של קלט לא חוקי או ש-ID לא קיים
        }
    };

    // פונקציה המתבצעת בלחיצה על כפתור ההוספה
    const onAdd = () => {
        setRequest(false); // עדכון המשתנה סטייט request לערך false
    };

    // פונקציה המתבצעת בלחיצה על כפתור החזרה
    const onReturn = () => {
        setErr(""); // החזרת המשתנה סטייט err לערך התחלתי של ריק
    };

    // ביצוע פעולות כאשר הקומפוננטה נטענת
    useEffect(() => {
        fetchPosts(); // קריאה לפונקציה fetchPosts לקבלת הפוסטים מהשרת
        setRequest(false); // עדכון המשתנה סטייט request לערך false
    }, []);

    // ביצוע פעולות כאשר משתנים מסוימים משתנים
    useEffect(() => {
        // הגדרת פונקציה handleOutsideClick המסתירה את טופס ההוספה בלחיצה מחוץ לו
        const handleOutsideClick = (e) => {
            if (showAddPostsForm && e.target.closest('.add-posts-form') === null) {
                setShowAddPostsForm(false);
            }
        };

        document.addEventListener('click', handleOutsideClick); // הוספת אירוע ללחיצה בכל המסמך

        // פונקציה המוסיפה אירוע של הסרת האירוע לאחר יציאת הקומפוננטה
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showAddPostsForm]);
    if (posts.length === 0) {
        return (
            <div className='todoslist'>
                <h1>No posts available</h1>
                <button className="buttonAdd" onClick={() => setRequest(true)}>
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
                {request && <AddPosts onAdd={onAdd} fetchPosts={fetchPosts} />}
            </div>
        );
    } 
    // יצירת מערך מסונן על פי סוג החיפוש
    const filteredArr = posts.filter((item) => {
        if (searchBy === "id") {
            return item._id && item._id.toLowerCase().includes(q.toLowerCase());
        } else {
            return item.title && item.title.toLowerCase().includes(q.toLowerCase());
        }
    });
    if (!Array.isArray(posts)) {
        return (
            <div className='todoslist'>
                <h1>Error fetching posts. Please try again.</h1>


            </div>
        );
    }
    // הצגת האלמנטים של הקומפוננטה
    return (
        <div className='todoslist'>
            {/* כפתור הוספת פוסט שמפעיל את פונקציית ההוספה */}
            <button className="buttonAdd" onClick={() => setRequest(true)}>
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
            {/* תנאי להצגת טופס ההוספה בהתאם למשתנה request */}
            {request && <AddPosts onAdd={onAdd} fetchPosts={fetchPosts} />}
            {/* בחירת סוג החיפוש (ID או כותרת) */}
            <select className="searchFor" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                <option value="id">ID</option>
                <option value="name">Title</option>
            </select>
            {/* תיבת החיפוש */}
            <input
                placeholder={`Search for a Posts by ${searchBy === 'id' ? 'ID' : 'Title'}`}
                className="buttonGetId"
                value={searchBy === 'id' ? id : q}
                name="id"
                onChange={onSearch}
            />

            {/* הצגת הודעת שגיאה וכפתור החזרה */}
            <div className="errors">{err}</div> {err && <button className="button buttonReturn" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>}
            {/* רשימת הפוסטים המסוננת */}
            <div className='todos-list'>
                {filteredArr.map((post) => (
                    <div key={post._id}>
                        <PostsItem post={post} fetchPosts={fetchPosts} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostsList; // ייצוא הקומפוננטה PostsList לשימוש במקומות אחרים באפליקציה
