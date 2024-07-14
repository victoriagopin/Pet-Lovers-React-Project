import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import styles from './Details.module.css';

const baseUrl = 'http://localhost:3030/jsonstore'

export default function Details({
}){
    const {user} = useContext(UserContext);
    const {petId} = useParams();
    const [animal, setAnimal] = useState({});
    const [ownerProfile, setOwnerProfile] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        (async function getAnimal () {
            const response = await fetch(`${baseUrl}/pets/${petId}`);
            const data = await response.json();
            if (JSON.stringify(data) !== JSON.stringify(animal)) {
                setAnimal(data); 
            }

        })()
    },[petId]);

    useEffect(() => {
        if (animal._ownerId) {
          const fetchOwnerProfile = async () => {
            const response = await fetch(`${baseUrl}/profiles`);
            const data = await response.json();
            const profiles = Object.values(data);

            const profile = profiles.find(profile => profile.identity == animal._ownerId);
      
            setOwnerProfile(profile);
          };
    
          fetchOwnerProfile();
        }
      }, [animal._ownerId]);
    
    const onDeleteClick = async () => {
      const response = await fetch(`${baseUrl}/pets/${animal._id}`,{
        method: 'DELETE'
      });

      navigate('/catalog');
   }

   useEffect(() => {
   ( async function getOwner(){
      const response = await fetch(`${baseUrl}/profiles`);
      const data = await response.json();
      const profiles = Object.values(data);
      const owner = profiles.find(profile => profile.identity == animal._ownerId);

      if(owner != undefined){
        setIsOwner(true);
      }
    })()
   
   })

    return (
        <section className={styles['catalog-details']}>
        <div className={styles['pet-card-details']}>
            <img className={styles['details-img']} src={animal.imageUrl} alt="Animal Picture"/>
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
            {ownerProfile ? (
              <Link className={styles['owner-btn']} to={`/profile/${animal._ownerId}`}>See Your Profile</Link>
            ) : (
              <Link className={styles['owner-btn']} to={`/setup-owner-profile/${animal._ownerId}`}>Set Up Owner's Profile</Link>
            )}
            <Link type="submit" to={`/edit/${animal._id}`} className={`${styles['edit-delete']} ${styles['submit']}`}>Edit</Link>
            <button type="submit" className={`${styles['edit-delete']} ${styles['submit']}`} onClick={onDeleteClick}>Delete</button>
          </>
        ) : (
          <>
            {isOwner ? (
              <Link className={styles['owner-btn']} to={`/profile/${animal._ownerId}`}>See Owner's Profile</Link>
            ) : (
              <p className={styles['no-owner']}>No owner profile set up yet</p>
            )}
          </>
        )}
      </div>
    </section>
    )
}