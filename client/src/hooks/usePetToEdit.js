import { useEffect, useState } from "react";
import { getPetById } from "../api/petsAPI";

export function usePetToEdit(id){
    const [petToEdit, setPetToEdit] = useState(null);

    useEffect(() => {
        (async function getPet (){
            const pet = await getPetById(id);
            setPetToEdit(pet);
        })()
    },[])

    return {
        petToEdit,
        setPetToEdit
    }
}