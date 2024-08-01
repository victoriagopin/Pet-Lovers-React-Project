import { useContext} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from './Owner-Profile.module.css';
import { UserContext } from "../../conetxts/UserContext";
import { deleteProfile } from "../../api/profilesAPI";
import { useGetProfile } from "../../hooks/useGetProfile";

export default function OwnerProfile(){
  const {user} = useContext(UserContext);
  const {ownerId} = useParams();
  const {profile}= useGetProfile(ownerId);
  const navigate = useNavigate();
    
    const onDeleteClick = async () => {
      try{
        const hasConfirmed = confirm('Are you sure you want to delete your profile?');
        if(hasConfirmed){
        await deleteProfile(profile._id);
        } else{
          return;
        }
      } catch (err){
        console.log(err.message);
      }
     
      navigate('/catalog');
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

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