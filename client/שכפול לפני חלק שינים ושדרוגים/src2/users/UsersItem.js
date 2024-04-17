
// UsereItem.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import DeleteUsere from './DeleteUsers';
import UpdateUsere from './UpdateUsers';

const UsereItem = ({ user, fetchUsers }) => {
  const [selectedUsere, setSelectedUsere] = useState(null);

  const handleDelete = (id) => {
    console.log(`Deleting Usere with id: ${id}`);
    // Add logic for deleting user
  };

  const handleUpdateClick = (user) => {
    setSelectedUsere(user);
  };

  return (
    <div className='todositem'>
      {/* Details section */}
      <div className="detailsGeneral">
        <div className="firstLet">{user.name && user.name.charAt(0)}</div>
        {/* {user.createdAt} */}
        {new Date(user.createdAt).toLocaleDateString()}

      </div>

      <h2 className="details">
        {user.name} {user.username}
        <br />
        {user._id}
        <br />
        phone: {user.phone}
        <br /> address:{user.address} <br /> email:{user.email}
      </h2>

      {/* Action buttons */}
      <div className="buttons">
        <div className='buttonDel'>
          <DeleteUsere id={user._id} onDelete={() => handleDelete(user._id)} fetchUsers={fetchUsers} user={user} />
          
        </div>

        <div className='buttonUpdate'>
          <span className="pen-icon" onClick={() => handleUpdateClick(user)}>
            <FontAwesomeIcon icon={faPen} id="fa" />
          </span>
        </div>

        {selectedUsere && selectedUsere._id === user._id && (
          <UpdateUsere id={selectedUsere._id} setSelectedUsere={setSelectedUsere} fetchUsers={fetchUsers} />
        )}
      </div>
    </div>
  );
};

export default UsereItem;
