import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from './Owner-Profile.module.css';
import { UserContext } from "../UserContext";

const baseUrl = 'http://localhost:3030/data'

export default function OwnerProfile(){
  const {user} = useContext(UserContext);
  const [profile, setProfile] = useState({});
    const {ownerId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        try{
          const response = await fetch(`${baseUrl}/profiles/${ownerId}`);
          const data = await response.json();
          setProfile(data);
        } catch(err) {
          console.log(err.message);
        }
       
      })()
    }, []);
    
    const onDeleteClick = async () => {
      try{
        await fetch(`${baseUrl}/profiles/${profile._id}`, {
          method: 'DELETE'
      });
      } catch (err){
        console.log(err.message);
      }
     
      navigate('/catalog');
  };
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
            {user && user._id == profile._ownerId
            ?
             <>
             <Link to={`/edit-profile/${profile._id}`} className={styles.edit}>Edit</Link>
            <button className={styles.delete} onClick={onDeleteClick}>Delete</button></> 
            : null
            }
            
          </div>
         
        </div>
      </section>
      </>
    )
}