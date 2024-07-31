import { useState, useEffect } from "react";
import { getAllPets } from "../api/petsAPI";

export function useGetPets(){
    const [pets, setPets] = useState([]);

       useEffect(() => {
      (async function getPets(){
        const response = await getAllPets(); 
        setPets(response);
      })();
    },[]);

    return [
        pets
    ]
}