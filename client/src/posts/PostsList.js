import React, { useState, useEffect } from 'react'; // יבוא של מודולים מהספריות 'react'
import axios from 'axios'; // יבוא של מודול axios מהספרייה 'axios'
import PostsItem from './PostsItem'; // יבוא של קומפוננטה PostsItem מהקובץ './PostsItem'
import AddPosts from './AddPosts'; // יבוא של קומפוננטה AddPosts מהקובץ './AddPosts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // יבוא של רכיב FontAwesomeIcon מהספרייה '@fortawesome/react-fontawesome'
import { faRotateLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons'; // יבוא של סמלים faRotateLeft ו-faUserPlus מהספרייה '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';

// הגדרת קומפוננטת PostsList כקומפוננטה פונקציונלית
const PostsList = () => {
    const location = useLocation()

    const [posts, setPosts] = useState([]); // הגדרת משתנה סטייט posts עם ערך התחלתי של מערך ריק
    const [showAddPostsForm, setShowAddPostsForm] = useState(false); // הגדרת משתנה סטייט showAddPostsForm עם ערך התחלתי של false
    const [err, setErr] = useState(""); // הגדרת משתנה סטייט err עם ערך התחלתי ריק

    const [request, setRequest] = useState(false); // הגדרת משתנה סטייט request עם ערך התחלתי של false


    const [filteredArr, setFilteredArr] = useState([]);
 
    // פונקציה המבצעת בקשת GET לשרת לקבלת רשימת הפוסטים
    const fetchPosts = async () => {
        try {
            const { data } = await axios.get('http://localhost:2134/api/Posts');
    
            // Ensure that data is an array before setting posts
            if (Array.isArray(data)) {
                setPosts(data);
                setFilteredArr(data)
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
    }, [location]);

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
    const handleSort = (e) => {
        const sortBy = e.target.value;
    
        if (sortBy === 'title'|| sortBy === 'body'  ) {
            setFilteredArr([...posts].sort((a, b) => {
                const propA = a[sortBy] || '';
                const propB = b[sortBy] || '';
                return propA.localeCompare(propB);
            }));
        } else if (sortBy === 'date') {
            setFilteredArr([...posts].sort((a, b) => new Date(a.date) - new Date(b.date)));
        } 
    };
    


    const handleQuery = (e) => {
        setFilteredArr(posts.filter(post => post.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }


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
            {/* בחירת קריטריון סינון */}
            <div className='sort'>
                <label htmlFor="sort" >Sort by:</label>
                <select onChange={handleSort} className='sort-input form-input' >
                <option value="date">date</option>
                    <option value="title">title</option>
                    <option value="body">body</option>

                </select>
            </div>

            {/* קלט החיפוש */}
            <input
                placeholder={"חיפוש משימות לפי title"}

                className="buttonGetId"

                name="id"
                onChange={handleQuery}
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
