
// UsereItem.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import DeleteUsere from './DeleteUsers';
import {  useNavigate } from 'react-router-dom';

const UsereItem = ({ user, fetchUsers }) => {
  const navigate = useNavigate();

  const handleEdit = async (e) => {
    const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
    navigate(`/users/${id}`) 
}
  return (
    <div className='todositem'>
      <div className="detailsGeneral">
        <div className="firstLet">{user.name && user.name.charAt(0)}</div>
        {new Date(user.createdAt).toLocaleDateString()}

      </div>
<div className='details'> 
      <h2 >
        {user.name} {user.username}
      </h2>
  
      <h3>phone: {user.phone}
        <br/> address:{user.address} <br/> email:{user.email} </h3>
      </div>


      {/* Action buttons */}
      <div className="buttons">

{/* מיכל עבור לחצן המחיקה */}
<div className='buttonDel'> 
          {
          <DeleteUsere id={user._id}  user={user} fetchUsers={fetchUsers}  />
          }
        
        </div>
{/* מיכל עבור כפתור העדכון */}
{/* סמל לחצן עדכון */}

      
        <span className="pen-icon" >
        <button onClick={handleEdit} id={user._id} className='buttonUpdate' > <FontAwesomeIcon icon={faPen} id="fa" />
        </button>
          </span>
       
    
      </div>
    </div>
  );
};

export default UsereItem;