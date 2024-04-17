import axios from "axios";
import PhotosItem from './PhotosItem';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

const GetPhotoById = ({ id, fetchPhotos, onGetId }) => {
    const Navigating = useNavigate();
    const [posts, setPosts] = useState({});
    const [confirmSend, setConfirmSend] = useState(false);

    const handleGetById = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.get(`http://localhost:2134/api/Photo/${id}`);
            console.log(data);
            setPosts(data);
            setConfirmSend(true);
            fetchPhotos();
        } catch (error) {
            console.error("Error setting up the request:", error.message);
        }
    };

    const onReturn = () => {
        setPosts({});
        onGetId();
        Navigating("/photos");
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
                (confirmSend && <PhotosItem posts={posts} fetchPhotos={fetchPhotos} />)
            }
        </div>
    );
};

export default GetPhotoById;
