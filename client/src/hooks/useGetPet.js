import { useEffect, useState } from "react";
import { getPetById } from "../api/petsAPI";
import { getAllLikesPerPet } from "../api/likesAPI";

export function useGetPet(id){
    const [animal, setAnimal] = useState({});
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const getAnimal = async () => {
            try{
            const response = await getPetById(id);
            setAnimal(response);
            const likesPerPet = await getAllLikesPerPet(id);
            setLikes(likesPerPet.length);
            } catch(err){
                console.log(err.message);
            }
        }; 
        getAnimal();
    }, [id, likes]);

    const incrementLikes = (newLikeCount) => {
        setLikes(newLikeCount);
    }

    return {
        animal,
        likes,
        incrementLikes
    }
}