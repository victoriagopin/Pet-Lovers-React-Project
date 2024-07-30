import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from './Details.module.css';
import { UserContext } from "../../../conetxts/UserContext";

const baseUrl = 'http://localhost:3030/data'

export default function Details() {
    const { user } = useContext(UserContext);
    const { petId } = useParams();
    const [animal, setAnimal] = useState({});
    const [ownerProfile, setOwnerProfile] = useState(null);
    const [hasProfile, sethasProifle] = useState(false);
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getAnimal = async () => {
            const response = await fetch(`${baseUrl}/pets/${petId}`);
            const data = await response.json();
            setAnimal(data);
            setLikes(data.likes || 0);
            const likedAnimals = JSON.parse(localStorage.getItem('likedAnimals')) || {};
            if (likedAnimals[petId]) {
                setHasLiked(true);
            }
        };
        getAnimal();
    }, [petId]);

    useEffect(() => {
        if (animal._ownerId) {
            const fetchOwnerProfile = async () => {
                const response = await fetch(`${baseUrl}/profiles`);
                const data = await response.json();
                const profiles = Object.values(data);
                const profile = profiles.find(profile => profile._ownerId === animal._ownerId);
                setOwnerProfile(profile);
            };
            fetchOwnerProfile();
        }
    }, [animal._ownerId]);

        if(ownerProfile){
        const getOwner = async () => {
            try{
                const response = await fetch(`${baseUrl}/profiles/${ownerProfile._id}`);
        
                if (response.status == 200) {
                    const data = await response.json();
                    sethasProifle(true);
                } 
            } catch (err){
                console.log(err.message);
            }
          
        };
        getOwner();
    }
 

    const onDeleteClick = async () => {
        try {
            await fetch(`${baseUrl}/pets/${animal._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization' : user.accessToken
                }
            });
        } catch (err){
            console.log(err.message);
        }
       
        navigate('/catalog');
    };

    const handleLike = async () => {
        const updatedAnimal = { ...animal, likes: likes + 1 };
        setLikes(likes + 1);
        setHasLiked(true);

        try{
            await fetch(`${baseUrl}/pets/${animal._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAnimal)
            });
        } catch (err){
            console.log(err.message);
        }
   

        setAnimal(updatedAnimal);
        const likedAnimals = JSON.parse(localStorage.getItem('likedAnimals')) || {};
        likedAnimals[petId] = true;
        localStorage.setItem('likedAnimals', JSON.stringify(likedAnimals));
    };

    return (
        <section className={styles['catalog-details']}>
            <div className={styles['pet-card-details']}>
                <img className={styles['details-img']} src={animal.imageUrl} alt="Animal Picture" />
                <div className={styles['pet-info-details']}>
                    <h2><span className={styles['make-yellow']}>Name:</span> {animal.name}</h2>
                    <p><span className={styles['make-yellow']}>Breed:</span> {animal.breed}</p>
                    <p><span className={styles['make-yellow']}>Origin:</span> {animal.origin}</p>
                    <p><span className={styles['make-yellow']}>Age:</span> {animal.age}</p>
                    <p><span className={styles['make-yellow']}>Eye Color:</span> {animal.eyeColor}</p>
                    <p><span className={styles['make-yellow']}>Fun Story with your Furry Friend:</span> {animal.funStory}</p>
                </div>

                {user && user._id === animal._ownerId ? (
                    <>
                        <p className={styles.likes}>Likes: {likes}</p>
                        {ownerProfile ? (
                            <Link className={styles['owner-btn']} to={`/profile/${ownerProfile._id}`}>See Your Profile</Link>
                        ) : (
                            <Link className={styles['owner-btn']} to={`/setup-owner-profile`}>Set Up Owner's Profile</Link>
                        )}
                        <Link type="submit" to={`/edit/${animal._id}`} className={`${styles['edit-delete']} ${styles['submit']}`}>Edit</Link>
                        <button type="submit" className={`${styles['edit-delete']} ${styles['submit']}`} onClick={onDeleteClick}>Delete</button>
                    </>
                ) : (
                    <>
                        <p className={styles.likes}>Likes: {likes}</p>
                        <button 
                          className={`${styles.like} ${hasLiked ? styles.disabled : ''}`} 
                          onClick={!hasLiked ? handleLike : null}
                        >
                          Like
                        </button>
                        {hasProfile ? (
                            <Link className={styles['owner-btn']} to={`/profile/${ownerProfile._id}`}>See Owner's Profile</Link>
                        ) : (
                            <p className={styles['no-owner']}>No owner profile set up yet</p>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
