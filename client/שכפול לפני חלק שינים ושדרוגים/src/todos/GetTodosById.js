import axios from "axios";
import TodosItem from './TodosItem';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

const GetTodosById = ({ id, fetchTodos, onGetId }) => {
    const Navigating = useNavigate();
    const [todo, setTodo] = useState({});
    const [confirmSend, setConfirmSend] = useState(false);

    const handleGetById = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.get(`http://localhost:2134/api/Todos/${id}`);
            console.log(data);
            setTodo(data);
            setConfirmSend(true);
            fetchTodos();
        } catch (error) {
            console.error("Error setting up the request:", error.message);
        }
    };

    const onReturn = () => {
        setTodo({});
        onGetId();
        Navigating("/todos");
    };

    return (
        <div className="search">
            <button className="button confirmSearch" onClick={onReturn}>
                <FontAwesomeIcon icon={faRotateLeft} id="fa" />
            </button>
            {(!confirmSend &&
                <button className="button butSearch" onClick={handleGetById}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} id="fa" />
                </button>) ||
                (confirmSend && <TodosItem todo={todo} fetchTodos={fetchTodos} />)
            }
        </div>
    );
};

export default GetTodosById;
