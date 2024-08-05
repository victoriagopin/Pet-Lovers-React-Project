import { useState, useEffect } from "react";
import { getAllPets } from "../api/petsAPI";

export function useGetPets(){
    const [pets, setPets] = useState([]);

       useEffect(() => {
      (async function getPets(){
        try{
        const response = await getAllPets(); 
        setPets(response);
        } catch (err){
          console.log(err.message);
        }
      })();
    },[]);

    return [
        pets
    ]
}