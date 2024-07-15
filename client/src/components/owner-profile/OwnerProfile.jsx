import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from './Owner-Profile.module.css';
import { UserContext } from "../UserContext";

const baseUrl = 'http://localhost:3030/jsonstore'

export default function OwnerProfile(){
  const {user} = useContext(UserContext);
  const [profile, setProfile] = useState({});
    const {ownerId} = useParams();

    useEffect(() => {
      (async () => {
        const response = await fetch(`${baseUrl}/profiles`);
        const data = await response.json();
        const profiles = Object.values(data);

        const user = profiles.find(profile => profile.identity == ownerId);

        setProfile(user);
      })()
    })
    console.log();
    return (
      <>
        <h2 className={styles.heading}>Welcome to {`${profile.firstName}'s profile`}</h2>
        <section className={styles['owner-details']}>
        <div className={styles['owner-card-details']}>
          <div className={styles['owner-photo']}>
            <img className={styles['owner-img']} src={profile.imageUrl} alt="Animal Picture" />
          </div>
          <div className={styles['owner-info-details']}>
            <h2><span className={styles['owner-make-yellow']}>Name:</span> {profile.firstName}</h2>
            <p><span className={styles['owner-make-yellow']}>Last Name:</span> {profile.lastName}</p>
            <p><span className={styles['owner-make-yellow']}>Age:</span> {profile.age}</p>
            <p><span className={styles['owner-make-yellow']}>Occupation:</span> {profile.occupation}</p>
            <p><span className={styles['owner-make-yellow']}>About Me:</span> {profile.aboutYou}</p>
            {user && user._id == profile._id 
            ?
             <>
             <Link to={`/edit-profile/${profile._id}`} className={styles.edit}>Edit</Link>
            <button className={styles.delete}>Delete</button></> 
            : null
            }
            
          </div>
         
        </div>
      </section>
      </>
    )
}