import React, { useState, useEffect } from 'react'; // יבוא של מודולים מהספרייה 'react'
import axios from 'axios'; // יבוא של מודול axios מהספרייה 'axios'
import { useNavigate } from 'react-router-dom'; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'

// הגדרת קומפוננטת UpdateUsere כקומפוננטה פונקציונלית עם פרמטרים id, post, fetchUsere, setSelectedUsere
const UpdateUsere= ({ id, fetchUsers, setSelectedUsere }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");


  const navigate = useNavigate(); // השמה של פונקצית הניווט useNavigate למשתנה navigate

  // ביצוע פעולות בעת טעינת הקומפוננטה
  useEffect(() => {
    // פונקציה המביאה את פרטי הפוסט מהשרת על פי ה-ID
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`http://localhost:2134/api/Usere/${id}`);
        setName(data.name || ""); // השמה של שדה הכותרת מהשרת או ריק אם אין ערך
        setUsername(data.username || ""); // השמה של שדה הגוף מהשרת או ריק אם אין ערך
        setEmail(data.email || ""); // השמה של שדה הכותרת מהשרת או ריק אם אין ערך
        setAddress(data.address || ""); // השמה של שדה הגוף מהשרת או ריק אם אין ערך
        setPhone(data.phone || ""); // השמה של שדה הגוף מהשרת או ריק אם אין ערך



      } catch (error) {
        
        console.error('Error fetching todo:', error);
      }
    };

    fetchUsers(); // קריאה לפונקציה fetchUsere בעת טעינת הקומפוננטה

  }, [id]);

 // פונקציה שמטפלת בשינויים בטופס
 const handleChange = (event) => {
  const { name, value } = event.target;
  switch (name) {
    case "name":
      setName(value);
      break;
    case "username":
      setUsername(value);
      break;
    case "email":
      setEmail(value);
      break;
    case "address":
      setAddress(value);
      break;
    case "phone":
      setPhone(value);
      break;

    default:
      break;
  }
};
  // פונקציה המתבצעת בעת שליחת הטופס
  const submitForm = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:2134/api/Usere`, {
        _id: id,
        name,
        username,
        email,
        address,
        phone,
      });

      // האפסת הפוסט הנבחר כדי לסגור את החלון
      // setSelectedUsere(null);

      fetchUsers(); // קריאה לפונקציה fetchUsere לרענון הפוסטים\
     setSelectedUsere(null);

    } catch (error) {
      console.error(error);
    }
  };

  // ביצוע פעולות בעת שינוי בערך של הניווט
  useEffect(() => {
    navigate("/users");
  }, [navigate]);

  // הצגת הקומפוננטה
  return (
    <>
      <form onSubmit={submitForm} className="form">
        <div className="tytyty">
          <div className="form-input">
          <input
          value={name}
          placeholder="Please add name"
          required
          name="name"
          onChange={handleChange}
        />
        <input
          value={username}
          placeholder="Please add username"
          name="username"
          onChange={handleChange}
          type="text"
        />
        <input
          value={email}
          placeholder="Please add email"
          name="email"
          onChange={handleChange}
          type="text"
        />
        <input
          value={address}
          placeholder="Please add address"
          name="address"
          onChange={handleChange}
          type="text"
        />
        <input
          value={phone}
          placeholder="Please add phone"
          name="phone"
          onChange={handleChange}
          type="text"
        />
            {/* כפתור שליחת הטופס */}
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateUsere; // ייצוא הקומפוננטה UpdateUsere לשימוש במקומות אחרים באפליקציה
