// מיובאות הספריות והרכיבים הנדרשים
import { useState } from "react";
import axios from "axios";

// הגדרת הרכיב AddPosts
const AddUsers = ({ fetchUsers, onAdd }) => {
  // הגדרת משתנים מקומיים באמצעות useState
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");




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

  // פונקציה המטפלת בשליחת הטופס
  const submitForm = async (event) => {
    event.preventDefault();
    if (!name) return;
  
    try {
      // Sending a POST request to the server
      await axios.post("http://localhost:2134/api/Usere", {
        name,
        username,
        email,
        address,
        phone,
      });
  
      // Resetting form data
      setName("");
      setUsername("");
      setEmail("");
      setAddress("");
      setPhone("");
  
      // Fetching the users again to update the list
      fetchUsers();
      onAdd();
  
      // Reloading the entire page
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // הצגת הרכיב ב-HTML
  return (
    <form onSubmit={submitForm} className="form">
      <div className="tytyty-toAddUsers">
        <div className="form-input"></div>
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
        <button disabled={!name} type="submit">
          Send
        </button>
      </div>
    </form>
  );
};

// ייצוא הרכיב AddPosts כיבוש ברירת המחדל
export default AddUsers;
