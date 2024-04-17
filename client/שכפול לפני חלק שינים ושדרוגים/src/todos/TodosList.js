// מיובאות הספריות והרכיבים הנדרשים
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodosItem from './TodosItem';
import AddTodos from './AddTodos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons';




// הגדרת הרכיב TodosList
const TodosList = () => {
    // הגדרת משתנים מקומיים באמצעות useState
    const [todos, setTodos] = useState([]);
    const [showAddTodoForm, setShowAddTodoForm] = useState(false);

    const [err, setErr] = useState("");
    const [request, setRequest] = useState(false);


///עבור סינון 
    const [filteredArr, setFilteredArr] = useState([]);


    // פונקציה לשליפת המשימות מהשרת
    const fetchTodos = async () => {
        try {
            const { data } = await axios.get('http://localhost:2134/api/Todo/');
    
            // Ensure that data is an array before setting posts
            if (Array.isArray(data)) {
                setTodos(data);
                setFilteredArr(data)
                setErr(""); // Reset error if successful
            } else {
                console.error('Invalid data format. Expected an array.');
                setTodos([]); // Set posts to an empty array
                setErr('Error fetching Todo. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching Todo:', error);
            setTodos([]); // Set posts to an empty array on error
            setErr('Error fetching Todo. Please try again.');
        }
    };



    // פונקציה שמתבצעת לאחר הוספת משימה
    const onAdd =async () => {
        setRequest(false);
        await fetchTodos();

    };

    // פונקציה שמתבצעת לאחר לחיצה על כפתור החזרה
    const onReturn = () => {
        setErr("");
    };

    // useEffect הראשון שמביא את המשימות מהשרת ברגע שהרכיב נטען
    useEffect(() => {
        fetchTodos();
    }, []);

    // useEffect השני שמטפל בלחיצה מחוץ לתיק AddTodoForm
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (showAddTodoForm && e.target.closest('.add-todo-form') === null) {
                setShowAddTodoForm(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showAddTodoForm]);
    if (todos.length === 0) {
        return (
            <div className='todoslist'>
                <h1>No Todos available</h1>
                <button className="buttonAdd" onClick={() => setRequest(true)}>
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
                {request && <AddTodos onAdd={onAdd} fetchTodos={fetchTodos} />}
            </div>
        );
    }  


    
    const handleSort = (e) => {
        const sortBy = e.target.value;
    
        if (sortBy === 'title' ) {
            setFilteredArr([...todos].sort((a, b) => {
                const propA = a[sortBy] || '';
                const propB = b[sortBy] || '';
                return propA.localeCompare(propB);
            }));
        } else if (sortBy === 'date') {
            setFilteredArr([...todos].sort((a, b) => new Date(a.date) - new Date(b.date)));
        } else if (sortBy === 'completed') {
            setFilteredArr([...todos].sort((a, b) => a.completed - b.completed));
        }

    };
    


    const handleQuery = (e) => {
        setFilteredArr(todos.filter(todo => todo.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }


    if (!Array.isArray(todos)) {
        return (
            <div className='todoslist'>
                <h1>Error fetching todos. Please try again.</h1>

            </div>
        );
    }
    // הצגת הרכיב ב-HTML
    return (
        <div className='todoslist'>
            {/* כפתור הוספת משימה */}
            <button className="buttonAdd" onClick={() => setRequest(true)}>
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
            
            {/* הצגת טופס הוספת משימה בהתאם לבקשה */}
            {request && <AddTodos  onAdd={onAdd} fetchTodos={fetchTodos}   />}

            {/* בחירת קריטריון חיפוש */}
            <div className='sort'>
                <label htmlFor="sort" >Sort by:</label>
                <select onChange={handleSort} className='sort-input form-input' >
                <option value="date">date</option>
                    <option value="title">title</option>
                    <option value="completed">completed</option>

                </select>
            </div>

            {/* קלט החיפוש */}
            <input
                placeholder={"חיפוש משימות לפי title"}

                className="buttonGetId"

                name="id"
                onChange={handleQuery}
            />

            {/* הצגת שגיאות אם קיימות */}
            <div className="errors">{err}</div> {err&&<button className="button buttonReturn" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>}

            {/* הצגת רשימת המשימות */}
            <div className='todos-list'>
                {filteredArr.map((todo) => (
                    <div key={todo._id}>
                        <TodosItem todo={todo} fetchTodos={fetchTodos}   />
                    </div>
                ))}
            </div>
        </div>
    );
};

// ייצוא הרכיב TodosList כיבוש ברירת המחדל
export default TodosList;




// // הדף שלי לפי כל השנים עכשיו בשביל ישעובד הצגה לפי מיון....

// // מיובאות הספריות והרכיבים הנדרשים
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TodosItem from './TodosItem';
// import AddTodos from './AddTodos';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRotateLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons';

// // הגדרת הרכיב TodosList
// const TodosList = () => {
//     // הגדרת משתנים מקומיים באמצעות useState
//     const [q, setQ] = useState("");
//     const [todos, setTodos] = useState([]);
//     const [showAddTodoForm, setShowAddTodoForm] = useState(false);
//     const [searchBy, setSearchBy] = useState("id");
//     const [id, setId] = useState("");
//     const [err, setErr] = useState("");
//     const [request, setRequest] = useState(false);

//     // פונקציה לשליפת המשימות מהשרת
//     const fetchTodos = async () => {
//         try {
//             const { data } = await axios.get('http://localhost:2134/api/Todo/');
    
//             // Ensure that data is an array before setting posts
//             if (Array.isArray(data)) {
//                 setTodos(data);
//                 setErr(""); // Reset error if successful
//             } else {
//                 console.error('Invalid data format. Expected an array.');
//                 setTodos([]); // Set posts to an empty array
//                 setErr('Error fetching Todo. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error fetching Todo:', error);
//             setTodos([]); // Set posts to an empty array on error
//             setErr('Error fetching Todo. Please try again.');
//         }
//     };

//     // פונקציה המתמקדת בחיפוש ובהצגת שגיאות
//     const onSearch = (e) => {
//         const value = e.target.value;
//         const validId = todos.find((todo) => todo._id.toLowerCase() === value.toLowerCase());

//         if (validId && searchBy === "id") {
//             setId(value);
//             setErr("");
//         } else if (searchBy === "name") {
//             setQ(value);
//             setErr("");
//         } else {
//             setErr("קלט לא תקין או המזהה אינו קיים, נא לנסות שוב.");
//         }
//     };

//     // פונקציה שמתבצעת לאחר הוספת משימה
//     const onAdd = () => {
//         setRequest(false);
//     };

//     // פונקציה שמתבצעת לאחר לחיצה על כפתור החזרה
//     const onReturn = () => {
//         setErr("");
//     };

//     // useEffect הראשון שמביא את המשימות מהשרת ברגע שהרכיב נטען
//     useEffect(() => {
//         fetchTodos();
//         setRequest(false);
//     }, []);

//     // useEffect השני שמטפל בלחיצה מחוץ לתיק AddTodoForm
//     useEffect(() => {
//         const handleOutsideClick = (e) => {
//             if (showAddTodoForm && e.target.closest('.add-todo-form') === null) {
//                 setShowAddTodoForm(false);
//             }
//         };

//         document.addEventListener('click', handleOutsideClick);

//         return () => {
//             document.removeEventListener('click', handleOutsideClick);
//         };
//     }, [showAddTodoForm]);
//     if (todos.length === 0) {
//         return (
//             <div className='todoslist'>
//                 <h1>No Todos available</h1>
//                 <button className="buttonAdd" onClick={() => setRequest(true)}>
//                     <FontAwesomeIcon icon={faUserPlus} />
//                 </button>
//                 {request && <AddTodos onAdd={onAdd} fetchTodos={fetchTodos} />}
//             </div>
//         );
//     }  
//     // יצירת מערך מסונן על פי החיפוש והקריטריונים
//     const filteredArr = todos.filter((item) => {
//         if (searchBy === "id") {
//             return item._id && item._id.toLowerCase().includes(q.toLowerCase());
//         } else {
//             return item.title && item.title.toLowerCase().includes(q.toLowerCase());
//         }
//     });

//     if (!Array.isArray(todos)) {
//         return (
//             <div className='todoslist'>
//                 <h1>Error fetching todos. Please try again.</h1>

//             </div>
//         );
//     }
//     // הצגת הרכיב ב-HTML
//     return (
//         <div className='todoslist'>
//             {/* כפתור הוספת משימה */}
//             <button className="buttonAdd" onClick={() => setRequest(true)}>
//                 <FontAwesomeIcon icon={faUserPlus} />
//             </button>
            
//             {/* הצגת טופס הוספת משימה בהתאם לבקשה */}
//             {request && <AddTodos  onAdd={onAdd} fetchTodos={fetchTodos}   />}

//             {/* בחירת קריטריון חיפוש */}
//             <select className="searchFor" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
//                 <option value="id">מזהה</option>
//                 <option value="name">כותרת</option>
//             </select>

//             {/* קלט החיפוש */}
//             <input
//                 placeholder={`חיפוש משימות לפי ${searchBy === 'id' ? 'מזהה' : 'כותרת'}`}
//                 className="buttonGetId"
//                 value={searchBy === 'id' ? id : q}
//                 name="id"
//                 onChange={onSearch}
//             />

//             {/* הצגת שגיאות אם קיימות */}
//             <div className="errors">{err}</div> {err&&<button className="button buttonReturn" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>}

//             {/* הצגת רשימת המשימות */}
//             <div className='todos-list'>
//                 {filteredArr.map((todo) => (
//                     <div key={todo._id}>
//                         <TodosItem todo={todo} fetchTodos={fetchTodos} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // ייצוא הרכיב TodosList כיבוש ברירת המחדל
// export default TodosList;


