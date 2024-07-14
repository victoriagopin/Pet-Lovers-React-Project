import CatalogItem from "./catalog-item/CatalogItem";
import styles from './Catalog.module.css';

export default function Catalog({
    pets,
    
}){
    
     return (
        <>
        <h2 className={styles['catalog-heading']}>All Of Your Furry Friends</h2>
        <section className={styles.catalog}>
            {pets.map(pet => 
            <CatalogItem 
                key={pet._id}
                pet={pet}
                // onDetailsClick={onDetailsClick}
              
            />
            )}
        </section>
        </>
     )
}