import { useEffect, useState } from "react";
import CatalogItem from "./catalog-item/CatalogItem";
import styles from './Catalog.module.css';
import { useGetPets } from "../../hooks/useGetPets";

export default function Catalog({}){
  const [pets] = useGetPets();
 
     return (
        <>
         <h2 className={styles['catalog-heading']}>All Of Your Furry Friends</h2>
        {pets.length > 0 
        ? 
           <section className={styles.catalog}>
           {pets.map(pet => 
           <CatalogItem 
               key={pet._id}
               pet={pet}
           />
           )}
            </section> 
        : <p className={styles['no-pets']}>No pets added yet</p>
       
      }
       
       
        </>
     )
}