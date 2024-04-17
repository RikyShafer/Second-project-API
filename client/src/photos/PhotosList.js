import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotosItem from './PhotosItem';
import AddPhotos from './AddPhotos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const PhotosList = () => {
    const location = useLocation()

    const [photos, setPhotos] = useState([]);
    const [showAddPhotosForm, setShowAddPhotosForm] = useState(false);
    const [error, setError] = useState("");
    const [request, setRequest] = useState(false);


    const [filteredArr, setFilteredArr] = useState([]);




    const fetchPhotos = async () => {
        try {
            const { data } = await axios.get('http://localhost:2134/api/Photo');
    
            // Ensure that data is an array before setting photos
            if (Array.isArray(data)) {
                setPhotos(data);
                setFilteredArr(data)
                setError(""); // Reset error if successful
            } else {
                console.error('Invalid data format. Expected an array.');
                setPhotos([]); // Set photos to an empty array
                setError('Error fetching photos. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching photos:', error);
            setPhotos([]); // Set photos to an empty array on error
            setError('Error fetching photos. Please try again.');
        }
    };
    
    const onAdd = () => {
        setRequest(false);
    };

    const onReturn = () => {
        setError("");
    };

    useEffect(() => {
        fetchPhotos();
        setRequest(false);
    }, [location]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (showAddPhotosForm && e.target.closest('.add-Photos-form') === null) {
                setShowAddPhotosForm(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showAddPhotosForm]);


    const handleSort = (e) => {
        const sortBy = e.target.value;
    
        if (sortBy === 'title' ) {
            setFilteredArr([...photos].sort((a, b) => {
                const propA = a[sortBy] || '';
                const propB = b[sortBy] || '';
                return propA.localeCompare(propB);
            }));
        } else if (sortBy === 'date') {
            setFilteredArr([...photos].sort((a, b) => new Date(a.date) - new Date(b.date)));
        } 
        // else if (sortBy === 'imageUrl') {
        //     setFilteredArr([...photos].sort((a, b) => a.imageUrl - b.imageUrl));
        // }

    };
    const handleQuery = (e) => {
        setFilteredArr(photos.filter(photo => photo.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }


    if (photos.length === 0) {
        return (
            <div className='todoslist'>
                <h1>No photos available</h1>
                <button className="buttonAdd" onClick={() => setRequest(true)}>
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
                {request && <AddPhotos onAdd={onAdd} fetchPhotos={fetchPhotos} />}
            </div>
        );
    }

    // const filteredPhotos = photos.filter((item) => {
    //     if (searchBy === "id") {
    //         return item._id && item._id.toLowerCase().includes(q.toLowerCase());
    //     } else {
    //         return item.title && item.title.toLowerCase().includes(q.toLowerCase());
    //     }
    // });
    if (!Array.isArray(photos)) {
        return (
            <div className='todoslist'>
                <h1>Error fetching photos. Please try again.</h1>
            </div>
        );
    }
    return (
        <div className='todoslist'>
            <button className="buttonAdd" onClick={() => setRequest(true)}>
                <FontAwesomeIcon icon={faUserPlus} />
            </button>

            {request && <AddPhotos onAdd={onAdd} fetchPhotos={fetchPhotos} />}
            <div className='sort'>
                <label htmlFor="sort" >Sort by:</label>
                <select onChange={handleSort} className='sort-input form-input' >
                <option value="date">date</option>
                    <option value="title">title</option>
                    <option value="imageUrl">imageUrl</option>

                </select>
            </div>
            <input
                placeholder={"חיפוש משימות לפי title"}
                className="buttonGetId"
                name="id"
                onChange={handleQuery}
            />

            <div className="errors">{error}</div>
            {error && <button className="button buttonReturn" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>}

            <div className='todos-list'>
                {filteredArr.map((photo) => (
                    <div key={photo._id}>
                        <PhotosItem photo={photo} fetchPhotos={fetchPhotos} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotosList;
