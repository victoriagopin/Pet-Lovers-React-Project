import { Link } from "react-router-dom";
import styles from './Catalog-Item.module.css';
import { useContext } from "react";
import { UserContext } from "../../UserContext";

export default function CatalogItem({
    pet
}){
    const {user} = useContext(UserContext);
    return (
        <div className={styles['pet-card']}>
          <img className={styles['pet-card-img']} src={pet.imageUrl} alt="Animal Picture" />
          <div className={styles['pet-info']}>
              <h2><span className={styles['make-yellow']}>Name:</span> {pet.name}</h2>
              <p><span className={styles['make-yellow']}>Breed:</span> {pet.breed}</p>
              <p><span className={styles['make-yellow']}>Origin:</span> {pet.origin}</p>
              {user ?  <Link className={styles['details-btn']} to={`/catalog/${pet._id}`} >More about <strong>{pet.name}</strong></Link>
              :  <Link className={styles['details-btn']} to={`/login`} >More about <strong>{pet.name}</strong></Link>}
             
          </div>
      </div>
    )
}