import { useEffect, useState } from "react";
import CatalogItem from "./catalog-item/CatalogItem";
import styles from './Catalog.module.css';

const baseUrl = 'http://localhost:3030/jsonstore'

export default function Catalog({}){
    const [pets, setPets] = useState([]);

    useEffect(() => {
      (async function getPets(){
        const response = await fetch(`${baseUrl}/pets`);
        const data = await response.json();
        const petsResult =  Object.values(data);
        
        setPets(petsResult);
      })();
    },[]);
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