
// מיובאות הספריות והרכיבים הנדרשים
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersItem from './UsersItem';
import AddUsers from './AddUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Outlet, useLocation } from 'react-router-dom';

// הגדרת הרכיב TodosList
const UsersList = () => {
    // הגדרת משתנים מקומיים באמצעות useState

    const location = useLocation()

    const [users, setUsers] = useState([]);
    const [showAddUsersForm, setShowAddUsersForm] = useState(false);
    const [err, setErr] = useState("");
    const [request, setRequest] = useState(false);

    const [filteredArr, setFilteredArr] = useState([]);

     // פונקציה לשליפת המשימות מהשרת
     const fetchUsers = async () => {
        try {
            const { data } = await axios.get(`http://localhost:2134/api/Usere/`);
    
            // Ensure that data is an array before setting posts
            if (Array.isArray(data)) {
                setUsers(data);
                setFilteredArr(data)
                setErr(""); // Reset error if successful
            } else {
                console.error('Invalid data format. Expected an array.');
                setUsers([]); // Set posts to an empty array
                setErr('Error fetching Usere. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching Usere:', error);
            setUsers([]); // Set posts to an empty array on error
            setErr('Error fetching Usere. Please try again.');
        }
    };
    
    // פונקציה שמתבצעת לאחר הוספת משימה
    const onAdd = () => {
        setRequest(false);
    };

    // פונקציה שמתבצעת לאחר לחיצה על כפתור החזרה
    const onReturn = () => {
        setErr("");
    };

    // useEffect הראשון שמביא את המשימות מהשרת ברגע שהרכיב נטען
    useEffect(() => {
        fetchUsers();
        setRequest(false);
    }, [location]);

    // useEffect השני שמטפל בלחיצה מחוץ לתיק AddTodoForm
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (showAddUsersForm && e.target.closest('.add-user-form') === null) {
                setShowAddUsersForm(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showAddUsersForm]);


    if (users.length === 0) {
        return (
            <div className='todoslist'>
                <h1>No users available</h1>
                <button className="buttonAdd" onClick={() => setRequest(true)}>
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
                {request && <AddUsers onAdd={onAdd} fetchUsers={fetchUsers} />}
            </div>
        );
    }  
    // יצירת מערך מסונן על פי החיפוש והקריטריונים
    const handleSort = (e) => {
        const sortBy = e.target.value;
    
        if (sortBy === 'name'  || sortBy === 'username' ||
         sortBy === 'phone'  || sortBy === 'address' ||
          sortBy === 'email'    ) {
            setFilteredArr([...users].sort((a, b) => {
                const propA = a[sortBy] || '';
                const propB = b[sortBy] || '';
                return propA.localeCompare(propB);
            }));
        } else if (sortBy === 'date') {
            setFilteredArr([...users].sort((a, b) => new Date(a.date) - new Date(b.date)));
        } 

    };
    
    const handleQuery = (e) => {
        setFilteredArr(users.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }


    if (!Array.isArray(users)) {
        return (
            <div className='todoslist'>
                <h1>Error fetching users. Please try again.</h1>

            </div>
        );
    }
    // הצגת הרכיב ב-HTML
    return (
        <div className='todoslist'>
                <Outlet/>

            {/* כפתור הוספת משימה */}
            <button className="buttonAdd" onClick={() => setRequest(true)}>
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
            
            {/* הצגת טופס הוספת משימה בהתאם לבקשה */}
            {request && <AddUsers  onAdd={onAdd} fetchUsers={fetchUsers}   />}

            {/* בחירת קריטריון סינון */}
            <div className='sort'>
                <label htmlFor="sort" >Sort by:
                <select onChange={handleSort} className='sort-input form-input' >
                <option value="date">date</option>
                    <option value="name">name</option>
                    <option value="username">username</option>
                    <option value="phone">phone</option>
                    <option value="address">address</option>
                    <option value="email">email</option>

                </select>
                </label>
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
                {filteredArr.map((user) => (
                    <div key={user._id}>
                        <UsersItem user={user} fetchUsers={fetchUsers} />
                    </div>
                ))}
            </div>
        </div>
    );
};
 export default UsersList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UsersItem from './UsersItem';
// import AddUsers from './AddUsers';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRotateLeft, faUserPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import { Outlet, useLocation } from 'react-router-dom';

// const UsersList = () => {
//     const location = useLocation();

//     const [users, setUsers] = useState([]);
//     const [showAddUsersForm, setShowAddUsersForm] = useState(false);
//     const [err, setErr] = useState("");
//     const [request, setRequest] = useState(false);
//     const [filteredArr, setFilteredArr] = useState([]);

//     // Search state
//     const [searchInput, setSearchInput] = useState("");
//     const [requestName, setRequestName] = useState("name"); // Default to searching by name
//     const [filteredUsers, setFilteredUsers] = useState([]);

//     const fetchUsers = async () => {
//         try {
//             const { data } = await axios.get(`http://localhost:2134/api/Usere/`);
//             if (Array.isArray(data)) {
//                 setUsers(data);
//                 setFilteredArr(data);
//                 setErr("");
//             } else {
//                 console.error('Invalid data format. Expected an array.');
//                 setUsers([]);
//                 setErr('Error fetching Usere. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error fetching Usere:', error);
//             setUsers([]);
//             setErr('Error fetching Usere. Please try again.');
//         }
//     };

//     const onAdd = () => {
//         setRequest(false);
//     };

//     const onReturn = () => {
//         setErr("");
//     };

//     useEffect(() => {
//         fetchUsers();
//         setRequest(false);
//     }, [location]);

//     useEffect(() => {
//         const handleOutsideClick = (e) => {
//             if (showAddUsersForm && e.target.closest('.add-user-form') === null) {
//                 setShowAddUsersForm(false);
//             }
//         };

//         document.addEventListener('click', handleOutsideClick);

//         return () => {
//             document.removeEventListener('click', handleOutsideClick);
//         };
//     }, [showAddUsersForm]);

//     const handleSort = (e) => {
//         const sortBy = e.target.value;

//         if (sortBy === 'name' || sortBy === 'username' || sortBy === 'phone' || sortBy === 'address' || sortBy === 'email') {
//             setFilteredArr([...users].sort((a, b) => {
//                 const propA = a[sortBy] || '';
//                 const propB = b[sortBy] || '';
//                 return propA.localeCompare(propB);
//             }));
//         } else if (sortBy === 'date') {
//             setFilteredArr([...users].sort((a, b) => new Date(a.date) - new Date(b.date)));
//         }
//     };

//     const handleQuery = (e) => {
//         const query = e.target.value.toLowerCase();
//         setFilteredArr(users.filter(user =>
//             user.name.toLowerCase().includes(query) ||
//             user.username.toLowerCase().includes(query) ||
//             user.phone.toLowerCase().includes(query) ||
//             user.email.toLowerCase().includes(query)
//         ));
//     };

//     const onSearch = (e) => {
//         e.preventDefault();
//         setFilteredUsers([]);
//         const query = searchInput.toLowerCase();
//         setFilteredArr(users.filter(user =>
//             user[requestName].toLowerCase().includes(query)
//         ));
//         setSearchInput("");
//     };

//     const changeNameRequest = (event) => {
//         setRequestName(event.target.value);
//     };

//     return (
//         <div className='todoslist'>
//             <Outlet />

//             <button className="buttonAdd" onClick={() => setRequest(true)}>
//                 <FontAwesomeIcon icon={faUserPlus} />
//             </button>

//             {request && <AddUsers onAdd={onAdd} fetchUsers={fetchUsers} />}

//             <div className='sort'>
//                 <label htmlFor="sort">Sort by:
//                     <select onChange={handleSort} className='sort-input form-input' >
//                         <option value="date">date</option>
//                         <option value="name">name</option>
//                         <option value="username">username</option>
//                         <option value="phone">phone</option>
//                         <option value="address">address</option>
//                         <option value="email">email</option>
//                     </select>
//                 </label>
//             </div>

//             <div className='search-options'>
//                 <label htmlFor="searchField">Search by:
//                     <select onChange={changeNameRequest} className='search-field form-input'>
//                         <option value="name">Name</option>
//                         <option value="username">Username</option>
//                         <option value="phone">Phone</option>
//                         <option value="email">Email</option>
//                     </select>
//                 </label>
//             </div>

//             <div className='search-input'>
//                 <input
//                     placeholder={"Search users by " + requestName}
//                     className="buttonGetId"
//                     name="id"
//                     value={searchInput}
//                     onChange={handleQuery}
//                 />
//                 <button onClick={onSearch} className="button butSearch">
//                     <FontAwesomeIcon icon={faMagnifyingGlass} id="fa" />
//                 </button>
//             </div>

//             <div className="errors">{err}</div> {err && <button className="button buttonReturn" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>}

//             <div className='todos-list'>
//                 {filteredUsers.length > 0 ? (
//                     filteredUsers.map((user) => (
//                         <div key={user._id}>
//                             <UsersItem user={user} fetchUsers={fetchUsers} />
//                         </div>
//                     ))
//                 ) : (
//                     filteredArr.map((user) => (
//                         <div key={user._id}>
//                             <UsersItem user={user} fetchUsers={fetchUsers} />
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UsersList;
