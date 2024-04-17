import { faHouse, faImage, faList, faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

const Naviage = () => {
    return <div className="nav">
        <NavLink to="/"> <FontAwesomeIcon icon={faHouse} /> Home</NavLink>
        <NavLink to="/users"> <FontAwesomeIcon icon={faUser} />  Users </NavLink>
        <NavLink to="/posts"> <FontAwesomeIcon icon={faPenToSquare} /> Posts </NavLink>
        <NavLink to="/todos">  <FontAwesomeIcon icon={faList} />  Todos  </NavLink>
        <NavLink to="/photos">  <FontAwesomeIcon icon={faImage} /> photos </NavLink>


        {/* <NavLink to="/todos/add"> Add new Todos </NavLink> */}


    </div>
}
export default Naviage