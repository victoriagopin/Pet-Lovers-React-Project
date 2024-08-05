import { useEffect, useState } from "react";
import { getPetById } from "../api/petsAPI";

export function usePetToEdit(id){
    const [petToEdit, setPetToEdit] = useState(null);

    useEffect(() => {
        (async function getPet (){
            try{
            const pet = await getPetById(id);
            setPetToEdit(pet);
            } catch (err){
                console.log(err.message);
            }
        })()
    },[])

    return {
        petToEdit,
        setPetToEdit
    }
}