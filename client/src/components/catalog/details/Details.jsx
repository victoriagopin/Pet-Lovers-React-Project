import { useContext} from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from './Details.module.css';
import { UserContext } from "../../../conetxts/UserContext";
import { useGetPet } from "../../../hooks/useGetPet";
import { useSetOwner } from "../../../hooks/useSetOwnerProfile";
import { deletePetById } from "../../../api/petsAPI";
import { createLike, getAllLikesPerPet } from "../../../api/likesAPI";
import { useHasLiked } from "../../../hooks/useHasLiked";

export default function Details() {
    const { user } = useContext(UserContext);
    const { petId } = useParams();
    const {animal, likes, incrementLikes} = useGetPet(petId);
    const {ownerProfile, hasProfile}= useSetOwner(animal);
    const {hasLiked, changeLikeState} = useHasLiked(petId, user?._id);

    const navigate = useNavigate();

    const onDeleteClick = async () => {

        try{
            await deletePetById(petId);
        } catch (err){
            console.log(err.message)
        }
       
        navigate('/catalog');
    };

    const handleLike = async () => {
        try{
            await createLike({_ownerId : user?._id , petId });
            changeLikeState(true);
            const newLikesCount = await getAllLikesPerPet(petId);
            incrementLikes(newLikesCount.length);
        } catch (err){
            console.log(err.message);
        }
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
                          disabled={hasLiked}
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
